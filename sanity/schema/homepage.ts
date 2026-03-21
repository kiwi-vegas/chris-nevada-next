export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main headline in the video hero section',
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'string',
      description: 'Smaller text below the main headline',
    },
    {
      name: 'ctaStripHeadline',
      title: 'CTA Section Headline',
      type: 'string',
      description: 'Headline in the "Ready to Make Your Move?" section',
    },
    {
      name: 'ctaStripBody',
      title: 'CTA Section Body Text',
      type: 'text',
      rows: 3,
    },
    {
      name: 'trustStats',
      title: 'Trust Bar Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value (e.g. #1, $3.5B+)', type: 'string' },
            { name: 'label', title: 'Label (e.g. Ranked Team in Nevada)', type: 'string' },
            { name: 'isStatic', title: 'Static (no count-up animation)', type: 'boolean' },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
      description: 'The 6 stat items in the gold trust bar',
    },
  ],
  preview: {
    prepare: () => ({ title: 'Homepage Content' }),
  },
}
