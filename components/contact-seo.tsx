"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function ContactSeo() {
  useSEOMeta({
    pageId: 'contact',
    fallback: {
      title: 'Contact Us | Blufacade',
      description: 'Get in touch with Blufacade for premium facade solutions. Our team is ready to help you with your architectural project.',
      keywords: 'contact us, NDIS support, disability services inquiry, get in touch'
    }
  })

  return null
}
