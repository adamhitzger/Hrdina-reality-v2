import type {StructureResolver} from 'sanity/structure'

import {apiVersion} from './env'
import {pagePhotoDocs, pagePhotoTypes} from './schemaTypes/pagePhotos'
import {realityStatuses} from './schemaTypes/reality'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Obsah')
    .items([
      S.listItem()
        .title('Fotky stránek')
        .child(
          S.list()
            .title('Fotky stránek')
            .items(
              pagePhotoDocs.map((d) =>
                S.listItem()
                  .title(d.title)
                  .id(d.type)
                  .child(S.document().schemaType(d.type).documentId(d.type).title(d.title)),
              ),
            ),
        ),
      S.divider(),
      ...S.documentTypeListItems()
        .filter((item) => !pagePhotoTypes.includes(item.getId() ?? ''))
        .map((item) => (item.getId() === 'reality' ? realityByStatus(S) : item)),
    ])

// ID ve struktuře smí obsahovat jen A-Z, 0-9, -, _ a .
const slugId = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')

// Nemovitosti rozdělené podle statusu, aby prodané nezavalily ty aktivní
const realityByStatus = (S: Parameters<StructureResolver>[0]) =>
  S.listItem()
    .title('Nové nemovitosti')
    .id('reality')
    .schemaType('reality')
    .child(
      S.list()
        .title('Nové nemovitosti')
        .items([
          ...realityStatuses.map((status) =>
            S.listItem()
              .title(status)
              .id(`reality-${slugId(status)}`)
              .schemaType('reality')
              .child(
                S.documentList()
                  .title(status)
                  .schemaType('reality')
                  .apiVersion(apiVersion)
                  .filter('_type == "reality" && status == $status')
                  .params({status})
                  .initialValueTemplates([S.initialValueTemplateItem('reality')]),
              ),
          ),
          S.listItem()
            .title('Bez statusu')
            .id('reality-bez-statusu')
            .schemaType('reality')
            .child(
              S.documentList()
                .title('Bez statusu')
                .schemaType('reality')
                .apiVersion(apiVersion)
                .filter('_type == "reality" && !defined(status)'),
            ),
          S.divider(),
          S.documentTypeListItem('reality').title('Všechny nemovitosti'),
        ]),
    )
