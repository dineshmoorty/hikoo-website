const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = new Headers(options.headers);

  // Always tell backend that we expect JSON
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  // Automatically set JSON content type when a request has a body
  // and the caller has not already provided a Content-Type.
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  console.log("API REQUEST:", {
    method: options.method || "GET",
    url,
    headers: Object.fromEntries(headers.entries()),
    body: options.body,
  });

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";

  let data: any = null;

  try {
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();

      if (text) {
        data = {
          message: text,
        };
      }
    }
  } catch {
    data = null;
  }

  console.log("API RESPONSE:", {
    status: response.status,
    statusText: response.statusText,
    url,
    data,
  });

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      data?.detail ||
      `Request failed with status ${response.status}`;

    throw new Error(`${message} (${response.status})`);
  }

  return data as T;
}