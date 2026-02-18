import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'work', // This must match the '_type' in your GROQ queries!
  title: 'Work / Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'e.g. Dojo, Nike, Asos',
    }),
    // --- 1. THE MASSIVE METRIC FIELD ---
    defineField({
      name: 'metric',
      title: 'Key Metric',
      type: 'string',
      description: 'The big number for the hero (e.g. "+240% Revenue" or "#1 Ranking")',
    }),
    // --- 2. THE CATEGORY FIELD ---
    defineField({
      name: 'category',
      title: 'Service Category',
      type: 'string',
      description: 'e.g. Technical SEO, Digital PR, Strategy',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    // --- 3. THE BODY CONTENT ---
    defineField({
      name: 'body',
      title: 'Case Study Content',
      type: 'array',
      of: [
        {
          type: 'block',
          // This allows you to add H2/H3 headers in the text editor
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
        },
        {
          type: 'image', // Allows you to drop images inside the text
          options: { hotspot: true },
        }
      ],
    }),
  ],
})