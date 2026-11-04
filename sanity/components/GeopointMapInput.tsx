'use client'

import 'leaflet/dist/leaflet.css'

import {Button, Card, Flex, Stack, Text} from '@sanity/ui'
import type {LeafletMouseEvent, Map as LeafletMap, Marker} from 'leaflet'
import {useCallback, useEffect, useRef, useState} from 'react'
import {set, unset, useFormValue, type ObjectInputProps} from 'sanity'

type Geopoint = {_type?: 'geopoint'; lat?: number; lng?: number; alt?: number}

// Výchozí výřez: Havlíčkův Brod a okolí
const HOME: [number, number] = [49.607, 15.579]

const isValid = (p?: Geopoint): p is Required<Pick<Geopoint, 'lat' | 'lng'>> =>
  typeof p?.lat === 'number' && typeof p?.lng === 'number' && !(p.lat === 0 && p.lng === 0)

// Výběr bodu na mapě OpenStreetMap: klik do mapy nebo přetažení špendlíku.
// Leaflet se načítá až v prohlížeči, protože při importu sahá na `window`.
export function GeopointMapInput(props: ObjectInputProps<Geopoint>) {
  const {value, onChange, readOnly} = props
  const el = useRef<HTMLDivElement>(null)
  const map = useRef<LeafletMap | null>(null)
  const marker = useRef<Marker | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const centered = useRef(false)

  const street = useFormValue(['street']) as string | undefined
  const number = useFormValue(['street_number']) as string | number | undefined
  const postcode = useFormValue(['postcode']) as string | number | undefined
  const city = useFormValue(['city']) as string | undefined
  const address = [[street, number].filter(Boolean).join(' '), postcode, city].filter(Boolean).join(', ')

  const save = useCallback(
    (lat: number, lng: number) => {
      onChange(set({_type: 'geopoint', lat: Number(lat.toFixed(7)), lng: Number(lng.toFixed(7))}))
    },
    [onChange],
  )

  // Mapa se vytvoří jednou, špendlík se pak jen přesouvá
  useEffect(() => {
    let cancelled = false
    import('leaflet').then((L) => {
      if (cancelled || !el.current || map.current) return
      const m = L.map(el.current, {scrollWheelZoom: false}).setView(HOME, 10)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        // Studio (next-sanity) nastavuje <meta name="referrer" content="same-origin">, dlaždice by šly bez Refereru
        // a OSM je podle svých pravidel blokuje („Referer is required“). Proto Referer s doménou webu výslovně.
        referrerPolicy: 'strict-origin-when-cross-origin',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(m)
      const icon = L.divIcon({
        className: '',
        html: '<div style="width:22px;height:22px;border-radius:50% 50% 50% 0;background:#8A7850;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);transform:rotate(-45deg)"></div>',
        iconSize: [22, 22],
        iconAnchor: [11, 22],
      })
      marker.current = L.marker(HOME, {icon, draggable: !readOnly})
      marker.current.on('dragend', () => {
        const p = marker.current!.getLatLng()
        save(p.lat, p.lng)
      })
      if (!readOnly) m.on('click', (e: LeafletMouseEvent) => save(e.latlng.lat, e.latlng.lng))
      map.current = m
      // Studio může mapu vykreslit ve skrytém panelu, po zobrazení je potřeba přepočítat velikost
      new ResizeObserver(() => m.invalidateSize()).observe(el.current)
      setReady(true)
    })
    return () => {
      cancelled = true
      map.current?.remove()
      map.current = null
      marker.current = null
      centered.current = false
      setReady(false)
    }
  }, [readOnly, save])

  // Promítnutí hodnoty z dokumentu do mapy (i při změně od jiného editora)
  useEffect(() => {
    const m = map.current
    const mk = marker.current
    if (!m || !mk) return
    if (isValid(value)) {
      mk.setLatLng([value.lat, value.lng])
      if (!m.hasLayer(mk)) mk.addTo(m)
      // Poprvé přiblížit na uložený bod, potom posouvat jen když z výřezu uteče
      if (!centered.current || !m.getBounds().contains([value.lat, value.lng])) m.setView([value.lat, value.lng], 15)
    } else if (m.hasLayer(mk)) {
      mk.remove()
    }
    centered.current = true
  }, [value, ready])

  const findAddress = async () => {
    if (!address) return
    setStatus('Hledám…')
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=cz&accept-language=cs&q=${encodeURIComponent(address)}`
      const [hit] = (await (await fetch(url, {referrerPolicy: 'strict-origin-when-cross-origin'})).json()) as {lat: string; lon: string; display_name: string}[]
      if (!hit) return setStatus(`Adresu „${address}“ se nepodařilo najít. Umístěte špendlík kliknutím do mapy.`)
      save(Number(hit.lat), Number(hit.lon))
      map.current?.setView([Number(hit.lat), Number(hit.lon)], 16)
      setStatus(`Nalezeno: ${hit.display_name}. Zkontrolujte polohu a případně špendlík přetáhněte.`)
    } catch {
      setStatus('Vyhledávání adresy teď nefunguje. Umístěte špendlík kliknutím do mapy.')
    }
  }

  return (
    <Stack space={3}>
      <Card radius={2} overflow="hidden" border>
        <div ref={el} style={{height: 360, zIndex: 0}} />
      </Card>
      <Flex gap={2} wrap="wrap" align="center">
        <Button
          text="Najít podle adresy"
          mode="ghost"
          disabled={readOnly || !address}
          onClick={findAddress}
          title={address || 'Nejdřív vyplňte ulici a obec'}
        />
        <Button text="Smazat polohu" mode="ghost" tone="critical" disabled={readOnly || !value} onClick={() => onChange(unset())} />
        <Text size={1} muted>
          {isValid(value) ? `${value.lat.toFixed(5)}, ${value.lng.toFixed(5)}` : 'Poloha není zadaná – klikněte do mapy.'}
        </Text>
      </Flex>
      {status && (
        <Text size={1} muted>
          {status}
        </Text>
      )}
    </Stack>
  )
}
