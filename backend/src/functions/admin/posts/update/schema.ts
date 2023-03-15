export default {
  type: 'object',
  required: [
    'title',
    'content',
    'description',
  ],
  properties: {
    title: {
      type: 'string'
    },
    content: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    featured: {
      type: 'string',
      enum: [
        'false',
        'true'
      ],
      default: 'false'
    },
    tags: {
      type: 'array',
      items: {
        type: 'string'
      },
      minItems: 0,
      maxItems: 5,
      uniqueItems: true,
      default: []
    },
    slug: {
      type: 'string'
    },
    seo: {
      type: 'object',
      required: [
        'title',
        'description',
        'tags',
      ],
      properties: {
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        tags: {
          type: 'array',
          items: {
            type: 'string'
          },
          minItems: 0,
          maxItems: 5,
          uniqueItems: true
        },
      }
    },
    state: {
      type: 'string',
      enum: [
        'PRIVATE',
        'PUBLIC'
      ],
    }
  },
  additionalProperties: false
} as const;
