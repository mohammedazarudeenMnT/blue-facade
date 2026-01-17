"use client";

import useSWR from "swr";

export interface Portfolio {
  _id: string;
  projectName: string;
  client?: string;
  location?: string;
  category?: string;
  serviceType?: string;
  projectArea?: string;
  completionDate?: string;
  duration?: string;
  budget?: string;
  shortDescription?: string;
  description: string;
  image: string;
  gallery?: string[];
  features?: string[];
  slug: string;
  status: string;
  order: number;
  views?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

interface PortfolioResponse {
  success: boolean;
  data: Portfolio[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPortfolios: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export function usePortfolio(page: number = 1, limit: number = 20) {
  const { data, error, isLoading } = useSWR<PortfolioResponse>(
    `/api/portfolio?page=${page}&limit=${limit}`,
    (url) => fetch(url).then((r) => r.json()),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 60000,
    }
  );

  return {
    portfolios: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    isError: error,
  };
}
