"use client";
import Hero from "./components/Hero";
import Challenges from "./components/Challenges";
import OurServices from "./components/OurServices";
import Metrics from "./components/Metrics";
import CtaSection from "./components/CtaSection";
import DataStrategySection from "./components/DataStrategySection";
import ApproachSection from "./components/ApproachSection"
import ContactUs from "./components/ContactUs";
import { TestimonialMy } from "./components/TestiMonialMy";
import BlogSection from "./components/BlogSection";
import FaqSection from "./components/FaqSection";
import ToolsTeaser from "./components/ToolsTeaser";
import ToolsNotification from "./components/tools/ToolsNotification";


export default function Home() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Eficsy",
    "description": "Data Engineering, AI Automation, and Development Solutions",
    "url": "https://eficsy.com",
    "logo": "https://eficsy.com/eficwhite1.png",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Data Engineering Services",
            "description": "Custom data pipelines and infrastructure solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Automation",
            "description": "Artificial intelligence and machine learning automation solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web & Mobile Development",
            "description": "Custom web and mobile application development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Data Analytics",
            "description": "Business intelligence and data analytics solutions"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <section id="home">
        <Hero />
      </section>
      <Challenges />
      <Metrics />
      <OurServices />
      <ToolsTeaser />
      <CtaSection />
      <DataStrategySection />
      <ApproachSection />
      <TestimonialMy />
      <BlogSection />
      <FaqSection />
      <ContactUs />
      <ToolsNotification />
    </>
  );
}
