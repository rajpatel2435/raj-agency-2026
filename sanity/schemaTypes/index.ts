import { type SchemaTypeDefinition } from 'sanity'
import service from './service'
import caseStudy from './caseStudy' // <-- 1. Import the new file
import insight from './insight'
import post from './post'
import ldWork from './ldWork'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service, caseStudy, insight, post,ldWork], // <-- 2. Add 'caseStudy' to the array
}