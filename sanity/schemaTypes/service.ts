import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
    }),
    // --- WE ADDED THIS SLUG FIELD ---
    defineField({
      name: 'slug',
      title: 'URL Path (Slug)',
      type: 'slug',
      options: {
        source: 'title', // This tells Sanity to auto-generate the URL from the Title!
        maxLength: 96,
      },
    }),
    // --------------------------------
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Hover Background Image',
      type: 'image',
      options: {
        hotspot: true, 
      },
    }),
  ],
})