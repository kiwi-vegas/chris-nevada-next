export default {
  name: 'communityPage',
  title: 'Community Pages',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Community Name',
      type: 'string',
      description: 'e.g. Summerlin',
      validation: (R: any) => R.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 64 },
      description: 'Auto-generated from the name. e.g. summerlin',
      validation: (R: any) => R.required(),
    },
    {
      name: 'market',
      title: 'Market',
      type: 'string',
      options: {
        list: [
          { title: 'Las Vegas', value: 'las-vegas' },
          { title: 'Reno', value: 'reno' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'heroHeadline',
      title: 'Page Headline',
      type: 'string',
      description: 'e.g. Summerlin Homes For Sale',
    },
    {
      name: 'heroSubheadline',
      title: 'Page Subheadline',
      type: 'string',
    },
    {
      name: 'overviewTitle',
      title: 'Overview Section Title',
      type: 'string',
    },
    {
      name: 'overviewBody',
      title: 'Overview Body (Agent Perspective)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The long-form agent perspective section. Supports paragraphs.',
    },
    {
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'market' },
  },
  orderings: [
    {
      title: 'Community Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
}
