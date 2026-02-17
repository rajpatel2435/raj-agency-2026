import { client } from "../../sanity/lib/client";
import WorkInteractive from "../../components/WorkInteractive";

export default async function WorkPage() {
  
  // 1. Ask Sanity for the case studies
  const query = `*[_type == "work"] | order(_createdAt desc) {
    _id,
    client,
    "slug": slug.current,
    metric,
    category,
    "image": mainImage.asset->url
  }`;

  let caseStudies = await client.fetch(query);

  // 2. THE FIX: If Sanity is empty, provide fallback data instead of a blank screen!
  if (!caseStudies || caseStudies.length === 0) {
    caseStudies = [
      {
        _id: "dummy-1",
        client: "Awaiting Data",
        slug: "awaiting-data",
        metric: "+000%",
        category: "System Ready",
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200&auto=format&fit=crop" // Cool neon abstract image
      }
    ];
  }

  // 3. Pass the data (whether real or fallback) into the interactive layout
  return <WorkInteractive caseStudies={caseStudies} />;
}