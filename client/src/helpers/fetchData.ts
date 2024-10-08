import { BASE_API_URL } from "../constants/app";

type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions {
  method?: FetchMethod;
  body?: any;
  headers?: Record<string, string>;
}

export const fetchData = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
  const { method = 'GET', body, headers } = options;
  const apiUrl = `${BASE_API_URL}${url}`;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(apiUrl, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
