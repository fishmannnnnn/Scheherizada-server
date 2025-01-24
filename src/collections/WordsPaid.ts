import type { CollectionConfig } from 'payload'

export const WordsPaid: CollectionConfig = {
  slug: 'words_paid',
  access: {
    read: () => true,
  },
  labels: { singular: 'WordPaid', plural: 'WordsPaid' },
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
