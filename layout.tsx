import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://envirocarellc.com"),
  title: {
    default: "EnviroCare Pest Control | Alabama Family-Owned Since 1958",
    template: "%s | EnviroCare Pest Control"
  },
  description:
    "Alabama's family-owned pest control company since 1958. Three offices serving Birmingham, Huntsville, Lake Martin and Auburn. Pest, termite, mosquito, and tick control. Free inspection.",
  keywords: [
    "pest control Alabama",
    "termite inspection Alabama",
    "mosquito control Birmingham",
    "Lake Martin pest control",
    "Huntsville pest control",
    "Birmingham pest control",
    "Auburn pest control",
    "tick control Alabama",
    "Sentricon termite",
    "Wedgworth family pest control",
  ],
  authors: [{ name: "EnviroCare Pest Control" }],
  openGraph: {
    siteName: "EnviroCare Pest Control",
    type: "website",
    locale: "en_US",
    url: "https://envirocarellc.com",
    title: "EnviroCare Pest Control | Alabama Family-Owned Since 1958",
    description:
      "Three generations of the Wedgworth family protecting Alabama homes since 1958. Birmingham · Lake Martin · Huntsville · Auburn.",
    images: [{ url: "/logo.png", alt: "EnviroCare Pest & Termite Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EnviroCare Pest Control",
    description: "Alabama's family-owned pest experts since 1958.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://envirocarellc.com/#organization",
      "name": "EnviroCare Pest Control",
      "url": "https://envirocarellc.com",
      "logo": "https://envirocarellc.com/logo.png",
      "foundingDate": "1958",
      "founder": { "@type": "Person", "name": "Phillip M. Wedgworth" },
      "slogan": "No One Cares Like EnviroCare",
      "telephone": "+12056495278",
      "sameAs": [
        "https://www.google.com/maps?cid=7378341068021381374"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "500"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://envirocarellc.com/#birmingham",
      "name": "EnviroCare Pest Control - Birmingham",
      "image": "https://envirocarellc.com/truck.jpg",
      "url": "https://envirocarellc.com/birmingham",
      "telephone": "+12059406360",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2025 Butler Rd",
        "addressLocality": "Alabaster",
        "addressRegion": "AL",
        "postalCode": "35007",
        "addressCountry": "US"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 33.2156, "longitude": -86.8164 },
      "areaServed": [
        "Birmingham", "Hoover", "Chelsea", "Pelham", "Alabaster",
        "Vestavia Hills", "Mountain Brook", "Homewood", "Helena", "Calera"
      ],
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "15:00" }
      ],
      "parentOrganization": { "@id": "https://envirocarellc.com/#organization" }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://envirocarellc.com/#lake-martin",
      "name": "EnviroCare Pest Control - Alexander City / Lake Martin",
      "image": "https://envirocarellc.com/truck.jpg",
      "url": "https://envirocarellc.com/lake-martin",
      "telephone": "+12562346162",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1785 Tallapoosa St",
        "addressLocality": "Alexander City",
        "addressRegion": "AL",
        "postalCode": "35010",
        "addressCountry": "US"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 32.9440, "longitude": -85.9536 },
      "areaServed": ["Lake Martin","Alexander City","Dadeville","Eclectic","Auburn","Opelika","Wetumpka"],
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "15:00" }
      ],
      "parentOrganization": { "@id": "https://envirocarellc.com/#organization" }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://envirocarellc.com/#huntsville",
      "name": "EnviroCare Pest Control - Huntsville",
      "image": "https://envirocarellc.com/truck.jpg",
      "url": "https://envirocarellc.com/huntsville",
      "telephone": "+12569377676",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "7027 Old Madison Pike, Suite 108",
        "addressLocality": "Huntsville",
        "addressRegion": "AL",
        "postalCode": "35806",
        "addressCountry": "US"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 34.7160, "longitude": -86.7530 },
      "areaServed": ["Huntsville","Madison","Athens","Decatur","Hartselle","Hampton Cove","Harvest"],
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "15:00" }
      ],
      "parentOrganization": { "@id": "https://envirocarellc.com/#organization" }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
