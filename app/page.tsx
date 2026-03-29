import About from "@/components/About";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Work from "../components/Work";
import { client } from "../sanity/lib/client";
import Insights from "@/components/Insights";

export default async function Home() {
  // Fetch Services
// Fetch Services (Now including the image URL!)
  const servicesQuery = `*[_type == "service"] | order(_createdAt asc) {
    _id, 
    title, 
    description,
    "imageUrl": mainImage.asset->url
  }`;
  
  // Fetch Case Studies and expand the image URL directly in the query
  const workQuery = `*[_type == "workbyld"] | order(_createdAt desc) {
    _id,
    title,
    client,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    summary
  }`;

  const query = `*[_type == "insight"] | order(publishedAt desc) [0..3] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    mainImage
  }`;
  
  const data = await client.fetch(query);
  
  // Then pass it:
  <Insights data={data} />

  // Run both fetches simultaneously for better performance
  const [servicesData, workData] = await Promise.all([
    client.fetch(servicesQuery),
    client.fetch(workQuery)
  ]);

  return (
   <main className="flex min-h-screen flex-col items-center w-full">
      <Hero />
      <Services/>
      <About  />
      <Work caseStudies={workData} />
      <Insights data={data} />
    </main>
  );
}