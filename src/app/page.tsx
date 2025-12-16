import type { Metadata } from "next";
import HomeClient from "@/app/components/HomeClient";

export const metadata: Metadata = {
  title: "WeBuild.lk | Automation Agency & E-commerce Optimization",
  description: "WeBuild.lk connects your disparate business apps into a single ecosystem. Experts in Make.com, AWS, Python, and E-commerce automation.",
  keywords: ["Automation Agency Sri Lanka", "Make.com experts", "E-commerce Automation", "Business Process Automation"],
  icons: {
    icon: "/assets/favicon.png",
    shortcut: "/assets/favicon.png",
  },
  openGraph: {
    title: "WeBuild.lk | Automate or Stagnate",
    description: "Manual processes are costing you growth. Let's architect your efficiency engine.",
    url: "https://webuild.lk",
    siteName: "WeBuild.lk",
    images: [
      {
        url: "/assets/images/n8n-preview.png", // Make sure to create this image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  // JSON-LD Structured Data for Local Business/Agency
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "WeBuild.lk",
    "image": "https://webuild.lk/assets/logo.png",
    "description": "Automation agency connecting business apps into a single ecosystem.",
    "telephone": "+94728103079",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "LK"
    },
    "url": "https://webuild.lk",
    "priceRange": "$$"
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}