import { type SchemaTypeDefinition } from 'sanity'
import service from './service'
import caseStudy from './caseStudy' // <-- 1. Import the new file

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service, caseStudy], // <-- 2. Add 'caseStudy' to the array
}