import type { CollectionConfig } from 'payload'

export const WordsFree: CollectionConfig = {
  slug: 'words_free',
  access: {
    read: () => true,
  },
  labels: { singular: 'WordFree', plural: 'WordsFree' },
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
