import type {StructureResolver} from 'sanity/structure'

import {pagePhotoDocs, pagePhotoTypes} from './schemaTypes/pagePhotos'

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
      ...S.documentTypeListItems().filter((item) => !pagePhotoTypes.includes(item.getId() ?? '')),
    ])
