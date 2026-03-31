import type { MetadataRoute } from "next";
import { STYLE_MAP } from "@/lib/constants";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const resultPages = Object.keys(STYLE_MAP).map((style) => ({ url: `${siteConfig.url}/result/${style}`, lastModified: new Date() }));
  return [{ url: siteConfig.url, lastModified: new Date() }, ...resultPages];
}
