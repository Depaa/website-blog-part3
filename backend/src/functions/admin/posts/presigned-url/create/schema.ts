export default {
  type: 'object',
  required: [
    'type',
  ],
  properties: {
    type: {
      type: 'string',
    }
  },
  additionalProperties: false
} as const;
