"use client";

import { useSEOMeta } from "@/hooks/use-seo-meta";

export function HomeSeo() {
  // Use SEO data for home page
  useSEOMeta({
    pageId: "home",
    fallback: {
      title: "Blufacade | Premium Facade & Cladding Solutions",
      description:
        "Blufacade specializes in innovative, high-quality facade solutions including ACP, structural glazing, aluminium doors & windows, HPL, and spider glazing.",
      keywords:
        "facade solutions, ACP cladding, structural glazing, aluminium windows, architectural solutions, building facades",
    },
  });

  // This component doesn't render anything visible, it just handles SEO
  return null;
}
