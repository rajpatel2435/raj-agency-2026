import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'The client\'s exact words. Only use real, permission-granted quotes.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      description: 'e.g. Marie Tremblay',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'e.g. Owner, Marketing Director',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'e.g. Altos Grill',
    }),
    defineField({
      name: 'result',
      title: 'Headline Result (optional)',
      type: 'string',
      description: 'A short measurable outcome, e.g. "+140% bookings"',
    }),
    defineField({
      name: 'avatar',
      title: 'Photo / Logo (optional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this testimonial on the homepage and key pages.',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'company', media: 'avatar' },
  },
})
