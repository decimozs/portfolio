export const seo = {
  metadataBase: new URL("https://decimomartin.vercel.app"),
  title: {
    default: "Marlon Martin — Software Developer",
    template: "Marlon Martin — Software Developer",
  },
  description: "Software Developer based in the Philippines.",
  openGraph: {
    title: "Marlon Martin",
    description: "Software Developer based in the Philippines.",
    url: "https://decimomartin.vercel.app",
    siteName: "Marlon Martin",
    locale: "en_US",
    type: "website",
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
    } as const,
  },
  twitter: {
    title: "Marlon Martin",
    card: "summary_large_image",
    description: "Software Developer based in the Philippines",
  },
};
