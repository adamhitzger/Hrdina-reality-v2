'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {locate} from './sanity/presentation/locate'
import {pagePhotoTypes} from './sanity/schemaTypes/pagePhotos'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  // Fotky stránek jsou singletony: nejdou založit znovu, smazat ani duplikovat
  document: {
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global' ? prev.filter((t) => !pagePhotoTypes.includes(t.templateId)) : prev,
    actions: (prev, {schemaType}) =>
      pagePhotoTypes.includes(schemaType)
        ? prev.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : prev,
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    presentationTool({
      resolve: {locations: locate},
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
})
