export default {
    name: 'workbyld', 
    title: 'LD.WORK', // This is what will show in your Studio Sidebar
    type: 'document',
    fields: [
      {
        name: 'client',
        title: 'Entity / Client',
        type: 'string',
      },
      {
        name: 'title',
        title: 'Deployment Title',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Archive Slug',
        type: 'slug',
        options: { source: 'client' },
      },
      {
        name: 'mainImage',
        title: 'Primary Asset (Hero)',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'summary',
        title: 'Output Log (Case Summary)',
        type: 'text',
      },
      {
        name: 'category',
        title: 'Service Category',
        type: 'string',
        initialValue: 'SEO / STRATEGY'
      }
    ],
  }