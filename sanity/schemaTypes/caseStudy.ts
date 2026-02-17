import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'The name of the campaign or project.',
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Click "Generate" to automatically create a URL from the title.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop the image right inside the Sanity Studio!
      },
    }),
    defineField({
      name: 'summary',
      title: 'Project Summary',
      type: 'text',
      description: 'A brief overview of what you achieved for the client.',
    }),
  ],
})