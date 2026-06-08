import type { Metadata } from "next";
import { ABOUT } from "./portfolio-content";
import { SITE } from "./constants";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
};

export function createMetadata({
  title,
  description,
  path = "",
  ogImage,
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} · ${SITE.name}` : SITE.name;
  const pageDescription =
    description ??
    ABOUT.bio;
  const url = `${SITE.url}${path}`;
  const image = ogImage ?? `${SITE.url}/og-default.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(SITE.url),
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: SITE.name,
      type: "website",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
