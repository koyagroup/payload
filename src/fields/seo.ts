import type { Field } from 'payload'

export const seoFieldGroup = (): Field => ({
  name: 'seo',
  type: 'group',
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      maxLength: 70,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 200,
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'robots',
      type: 'select',
      defaultValue: 'index,follow',
      options: [
        {
          label: 'Index, Follow',
          value: 'index,follow',
        },
        {
          label: 'Noindex, Follow',
          value: 'noindex,follow',
        },
        {
          label: 'Noindex, Nofollow',
          value: 'noindex,nofollow',
        },
      ],
    },
  ],
})
