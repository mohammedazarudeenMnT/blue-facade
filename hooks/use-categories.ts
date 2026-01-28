import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCategories(activeOnly = false) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/categories${activeOnly ? "?activeOnly=true" : ""}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    categories: data?.categories || [],
    isLoading,
    isError: error,
    mutate,
  };
}
