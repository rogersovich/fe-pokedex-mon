import type { TRequestOptions } from "@/types/base";

/**
 * Base function to make API requests.
 * @param path The API endpoint path (e.g., 'pokemon', 'users/123').
 * @param options Request options like method, headers, body, and custom params.
 * @returns Parsed JSON response.
 */
export async function apiFetch<T>(
  path: string,
  options?: TRequestOptions
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Access environment variable

  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not defined in environment variables."
    );
  }

  // Construct URL with query parameters if present
  let queryString = "";
  if (options?.params) {
    const paramsArray: string[] = [];
    Object.keys(options.params).forEach((key) => {
      const value = options?.params?.[key]; // Ensure value is accessed correctly
      if (value !== undefined && value !== null) {
        // Add check for undefined/null values
        // Manually encode key, but for value, only encode if it's NOT a string with a comma
        const encodedKey = encodeURIComponent(key);

        if (typeof value === "string" && value.includes(",")) {
          // If it contains a comma, use the value as is (unencoded comma)
          paramsArray.push(`${encodedKey}=${value}`);
        } else {
          // Otherwise, use standard encoding for the value
          paramsArray.push(
            `${encodedKey}=${encodeURIComponent(String(value))}`
          );
        }
      }
    });
    if (paramsArray.length > 0) {
      queryString = `?${paramsArray.join("&")}`;
    }

    // Create a copy of options without params
    options = { ...options };
    delete options.params;
  }

  const url = `${baseUrl}${path}${queryString}`;

  // Default headers (e.g., Content-Type, Authorization)
  const defaultHeaders = {
    "Content-Type": "application/json",
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
      const errorData = await res
        .json()
        .catch(() => ({ message: res.statusText }));
      throw new Error(
        `API Error ${res.status}: ${errorData.message || "Unknown error"}`
      );
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching from ${path}:`, error);
    throw error; // Re-throw to be caught by the calling component/function
  }
}

export async function apiFetchPokeApi<T>(
  path: string,
  options?: TRequestOptions
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_POKEMON_URL;

  if (!baseUrl) {
    throw new Error("BASE URL is not defined in environment variables.");
  }

  // Construct URL with query parameters if present
  let queryString = "";
  if (options?.params) {
    const paramsArray: string[] = [];
    Object.keys(options.params).forEach((key) => {
      const value = options?.params?.[key]; // Ensure value is accessed correctly
      if (value !== undefined && value !== null) {
        // Add check for undefined/null values
        // Manually encode key, but for value, only encode if it's NOT a string with a comma
        const encodedKey = encodeURIComponent(key);

        if (typeof value === "string" && value.includes(",")) {
          // If it contains a comma, use the value as is (unencoded comma)
          paramsArray.push(`${encodedKey}=${value}`);
        } else {
          // Otherwise, use standard encoding for the value
          paramsArray.push(
            `${encodedKey}=${encodeURIComponent(String(value))}`
          );
        }
      }
    });
    if (paramsArray.length > 0) {
      queryString = `?${paramsArray.join("&")}`;
    }

    // Create a copy of options without params
    options = { ...options };
    delete options.params;
  }

  const url = `${baseUrl}${path}${queryString}`;

  // Default headers (e.g., Content-Type, Authorization)
  const defaultHeaders = {
    "Content-Type": "application/json",
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
      const errorData = await res
        .json()
        .catch(() => ({ message: res.statusText }));
      throw new Error(
        `API Error ${res.status}: ${errorData.message || "Unknown error"}`
      );
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching from ${path}:`, error);
    throw error; // Re-throw to be caught by the calling component/function
  }
}
