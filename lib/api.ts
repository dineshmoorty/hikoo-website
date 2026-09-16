const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = new Headers(options.headers);

  // ------------------------------------------------------------
  // DEFAULT HEADERS
  // ------------------------------------------------------------

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // ------------------------------------------------------------
  // JWT AUTHORIZATION
  // ------------------------------------------------------------

  if (
    typeof window !== "undefined" &&
    !headers.has("Authorization")
  ) {
    const token = localStorage.getItem("hikoo_token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  // ------------------------------------------------------------
  // REQUEST
  // ------------------------------------------------------------

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // ------------------------------------------------------------
  // RESPONSE
  // ------------------------------------------------------------

  const contentType =
    response.headers.get("content-type") || "";

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

  // ------------------------------------------------------------
  // ERROR HANDLING
  // ------------------------------------------------------------

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      data?.detail ||
      `Request failed with status ${response.status}`;

    throw new Error(
      `${message} (${response.status})`
    );
  }

  return data as T;
}