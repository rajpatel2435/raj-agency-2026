import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL Path (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Article Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'Tech' },
          { title: 'Case Studies', value: 'Case Studies' },
          { title: 'Medical/Dental', value: 'Medical' },
          { title: 'iGaming', value: 'iGaming' },
          { title: 'Intelligence', value: 'Opinion' },
        ],
      },
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords / Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
})