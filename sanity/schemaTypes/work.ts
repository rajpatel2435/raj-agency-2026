import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work / Case Studies',
  type: 'document',
  fields: [
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL Path (Slug)',
      type: 'slug',
      options: {
        source: 'client',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'metric',
      title: 'Massive Metric (e.g., +240% Rev, #1 Ranking)',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Service Category (e.g., Technical SEO)',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Hover Reveal Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})