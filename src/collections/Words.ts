import type { CollectionConfig } from 'payload'

export const Words: CollectionConfig = {
  slug: 'words',
  access: {
    read: () => true,
  },
  labels: { singular: 'Word', plural: 'Words' },
  fields: [
    {
      name: 'word',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'hash',
      type: 'text',
      required: true,
    },
  ],
}
