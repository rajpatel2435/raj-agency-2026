// schemas/insight.ts
export default {
    name: 'insight',
    title: 'Intelligence Index',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'title', maxLength: 96 },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'category',
        title: 'Category Tag',
        type: 'string',
        description: 'e.g., TECHNICAL, STRATEGY, DATA',
        initialValue: 'TECHNICAL',
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
      },
      {
        name: 'mainImage',
        title: 'Preview Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        rows: 3,
      },
    ],
  }