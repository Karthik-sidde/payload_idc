import type { CollectionConfig } from 'payload'

export const Speakers: CollectionConfig = {
  slug: 'speakers',
  labels: {
    singular: 'Speaker',
    plural: 'Speakers',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Manage event speakers',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the speaker',
      },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Contact email',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      admin: {
        description: 'Speaker biography',
      },
    },
    {
      name: 'photo',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Speaker profile photo',
      },
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Job title or role (e.g., "Principal Engineer")',
      },
    },
    {
      name: 'company',
      type: 'text',
      admin: {
        description: 'Organization name',
      },
    },
    {
      name: 'social',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Twitter', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
            { label: 'Website', value: 'website' },
          ],
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
      admin: {
        description: 'Social media links',
      },
    },
  ],
}
