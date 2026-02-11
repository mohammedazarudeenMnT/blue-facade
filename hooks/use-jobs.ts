"use client"

import useSWR from "swr"

export interface JobPosting {
  _id: string
  title: string
  description: string
  requirements?: string
  driveLink: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export function useJobs() {
  const { data, error, isLoading, mutate } = useSWR<{ success: boolean; data: JobPosting[] }>(
    '/api/admin/careers/jobs',
    url => fetch(url).then(r => r.json()),
    {
      revalidateOnFocus: false,
    }
  )

  const createJob = async (jobData: Partial<JobPosting>) => {
    const response = await fetch('/api/admin/careers/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    })
    if (response.ok) {
      mutate()
    }
    return response.json()
  }

  const updateJob = async (id: string, jobData: Partial<JobPosting>) => {
    const response = await fetch(`/api/admin/careers/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    })
    if (response.ok) {
      mutate()
    }
    return response.json()
  }

  const deleteJob = async (id: string) => {
    const response = await fetch(`/api/admin/careers/jobs/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      mutate()
    }
    return response.json()
  }

  return {
    jobs: data?.data || [],
    isLoading,
    isError: error,
    createJob,
    updateJob,
    deleteJob,
    mutate
  }
}
