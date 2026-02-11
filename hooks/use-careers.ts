"use client"

import useSWR from "swr"

interface CareersInfo {
  pageTitle: string
  pageDescription: string
  sectionTitle?: string
  sectionDescription?: string
}

export function useCareers() {
  const { data, error, isLoading } = useSWR<{ success: boolean; data: CareersInfo }>(
    '/api/admin/careers',
    url => fetch(url).then(r => r.json()),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 300000, // Cache for 5 minutes
    },
  )

  return {
    careersInfo: data?.data,
    isLoading,
    isError: error,
  }
}
