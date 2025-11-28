import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    useAsTitle: 'title',
    description: 'Manage events for your platform',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Event title',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        description: 'URL-friendly identifier',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Detailed event description',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Event start date',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'Event end date',
      },
    },
    {
      name: 'startTime',
      type: 'text',
      admin: {
        description: 'Start time (HH:MM format)',
      },
    },
    {
      name: 'endTime',
      type: 'text',
      admin: {
        description: 'End time (HH:MM format)',
      },
    },
    {
      name: 'venue',
      type: 'relationship',
      relationTo: 'venues',
      admin: {
        description: 'Select event venue',
      },
    },
    {
      name: 'speakers',
      type: 'relationship',
      relationTo: 'speakers',
      hasMany: true,
      admin: {
        description: 'Add speakers for this event',
      },
    },
    {
      name: 'capacity',
      type: 'number',
      admin: {
        description: 'Maximum attendees',
      },
    },
    {
      name: 'registeredCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Auto-tracked registration count',
      },
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Featured image for event',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
}
