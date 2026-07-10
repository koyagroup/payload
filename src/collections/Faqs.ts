import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { editorOrAbove } from '@/access/editorOrAbove'
import { denyEditorPublishCollection } from '@/hooks/denyEditorPublish'
import { createCollectionRevalidationHooks } from '@/hooks/revalidation/createHooks'

const revalidateHooks = createCollectionRevalidationHooks({
  draftsEnabled: true,
  slug: 'faqs',
  getPaths: () => ['/'],
  getTags: () => ['faqs'],
})

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  access: {
    create: editorOrAbove,
    delete: editorOrAbove,
    read: authenticatedOrPublished,
    update: editorOrAbove,
  },
  admin: {
    defaultColumns: ['question', 'category', 'sortOrder', '_status', 'updatedAt'],
    useAsTitle: 'question',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Payments', value: 'payments' },
        { label: 'Security', value: 'security' },
        { label: 'Legal', value: 'legal' },
      ],
      required: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  hooks: {
    beforeChange: [denyEditorPublishCollection],
    afterChange: [revalidateHooks.afterChange],
    afterDelete: [revalidateHooks.afterDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 300,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
