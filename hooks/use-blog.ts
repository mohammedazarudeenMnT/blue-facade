import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useBlog(page = 1, limit = 9, category?: string, featured?: boolean) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (category) params.append("category", category);
  if (featured !== undefined) params.append("featured", featured.toString());

  const { data, error, isLoading, mutate } = useSWR(
    `/api/blog?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    blogs: data?.blogs || [],
    pagination: data?.pagination || null,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useBlogBySlug(slug: string) {
  const { data, error, isLoading } = useSWR(
    slug ? `/api/blog/${slug}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    blog: data?.blog || null,
    relatedBlogs: data?.relatedBlogs || [],
    isLoading,
    isError: error,
  };
}
