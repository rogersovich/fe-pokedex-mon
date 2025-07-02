import type { TRequestOptions } from "@/types/base-types";

/**
 * Base function to make API requests.
 * @param path The API endpoint path (e.g., 'pokemon', 'users/123').
 * @param options Request options like method, headers, body, and custom params.
 * @returns Parsed JSON response.
 */
export async function apiFetch<T>(path: string, options?: TRequestOptions): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Access environment variable

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined in environment variables.');
  }

  // Construct URL with query parameters if present
  const url = new URL(`${baseUrl}${path}`);
  if (options && options.params) {
    Object.keys(options.params).forEach(key => {
      url.searchParams.append(key, String(options?.params?.[key]));
    });
    // Create a shallow copy of options without 'params' to avoid mutating the original object
    options = { ...options };
    delete options.params;
  }

  // Default headers (e.g., Content-Type, Authorization)
  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Add Authorization header if you have a token (e.g., from a cookie/session)
    // 'Authorization': `Bearer ${token}`,
  };

  try {
    const res = await fetch(url.toString(), {
      ...options, // Spread any custom options provided
      headers: {
        ...defaultHeaders,
        ...options?.headers, // Custom headers override defaults
      },
      // You can also add default cache options here if needed,
      // e.g., cache: 'no-store' for always fresh data in SSR
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(`API Error ${res.status}: ${errorData.message || 'Unknown error'}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching from ${path}:`, error);
    throw error; // Re-throw to be caught by the calling component/function
  }
}