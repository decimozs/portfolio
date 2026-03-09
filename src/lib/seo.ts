import type { Metadata } from "next";

const url = "https://marlonmartin.binspire.space";
const name = "Marlon Martin";
const title = "Marlon Martin - Software Engineer";
const description =
  "Based in Manila. I love building things that actually make a difference from scalable backend systems to creative side projects.";

export const seo: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | ${name}`,
  },
  description: description,
  keywords: [
    "Backend Engineer",
    "Software Engineer",
    "Full Stack Developer",
    "Philippines",
    "Manila",
    "Systems Architect",
    "Portfolio",
    "TypeScript",
    "Node.js",
    "AI Engineer",
  ],
  authors: [{ name: "Marlon Martin", url: url }],
  creator: "Marlon Martin",
  publisher: "Marlon Martin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    creator: "@decimomartin",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "9SYHKpPQfaT8zG_JIAPA90F2QukziaOog2Ni9q7UmDU",
  },
  alternates: {
    canonical: url,
    languages: {
      en: url,
    },
  },
  category: "technology",
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: name,
  url: url,
  jobTitle: "Software Engineer",
  sameAs: [
    "https://github.com/decimozs",
    "https://www.linkedin.com/in/decimomartin/",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Binspire",
  },
};
