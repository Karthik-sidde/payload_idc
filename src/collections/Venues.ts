import type { CollectionConfig } from 'payload'

export const Venues: CollectionConfig = {
  slug: 'venues',
  labels: {
    singular: 'Venue',
    plural: 'Venues',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Manage event venues',
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
        description: 'Venue name',
      },
    },
    {
      name: 'address',
      type: 'text',
      admin: {
        description: 'Full street address',
      },
    },
    {
      name: 'city',
      type: 'text',
      admin: {
        description: 'City',
      },
    },
    {
      name: 'state',
      type: 'text',
      admin: {
        description: 'State/Province',
      },
    },
    {
      name: 'country',
      type: 'text',
      admin: {
        description: 'Country',
      },
    },
    {
      name: 'zipCode',
      type: 'text',
      admin: {
        description: 'Postal/ZIP code',
      },
    },
    {
      name: 'capacity',
      type: 'number',
      admin: {
        description: 'Venue capacity',
      },
    },
    {
      name: 'mapLink',
      type: 'text',
      admin: {
        description: 'Google Maps or similar URL',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Venue photo',
      },
    },
    {
      name: 'amenities',
      type: 'array',
      fields: [
        {
          name: 'amenity',
          type: 'text',
        },
      ],
      admin: {
        description: 'e.g., "WiFi", "Parking", "Catering"',
      },
    },
  ],
}
