const url = "https://marlonmartin.binspire.space";
const description = "Developer based in the Philippines.";
const title = "Marlon Martin - Backend Engineer";
const name = "Marlon Martin";

export const seo = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: title,
  },
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: name,
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
    title: name,
    card: "summary_large_image",
    description: description,
  },
  verification: {
    google: "9SYHKpPQfaT8zG_JIAPA90F2QukziaOog2Ni9q7UmDU",
  },
};
