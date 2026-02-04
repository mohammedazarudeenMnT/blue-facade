import { useState, useEffect } from 'react';

interface ClientLogo {
  _id: string;
  name: string;
  logo: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export function useClientLogos(activeOnly: boolean = true) {
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientLogos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const endpoint = activeOnly ? '/api/client-logos' : '/api/admin/client-logos';
      
      const headers: HeadersInit = {};
      
      // Add authorization header for admin endpoint
      if (!activeOnly && typeof window !== 'undefined') {
        const token = localStorage.getItem('admin_token');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }
      
      const response = await fetch(endpoint, { headers });
      const data = await response.json();

      if (response.ok && data.success) {
        setClientLogos(data.data);
        setError(null);
      } else {
        const errorMessage = data.message || `HTTP ${response.status}: ${response.statusText}`;
        setError(errorMessage);
        console.error('API Error:', data);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Network error occurred';
      setError(errorMessage);
      console.error('Network Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClientLogos();
  }, [activeOnly]);

  return {
    clientLogos,
    isLoading,
    error,
    refetch: fetchClientLogos,
  };
}
