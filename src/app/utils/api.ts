import type { Product, CartItem, User } from "@/app/App";
const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

// Retrieve saved JWT token
export const getToken = (): string | null => {
  return (
    localStorage.getItem("artisan_token") ||
    sessionStorage.getItem("artisan_token")
  );
};

// Save JWT token
export const setToken = (token: string, remember: boolean = true): void => {
  if (remember) {
    localStorage.setItem("artisan_token", token);
  } else {
    sessionStorage.setItem("artisan_token", token);
  }
};

// Clear JWT token
export const removeToken = (): void => {
  localStorage.removeItem("artisan_token");
  sessionStorage.removeItem("artisan_token");
};

// Helper for making standard API requests
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `HTTP error! Status: ${response.status}`,
    );
  }

  return response.json() as Promise<T>;
}

export const api = {
  // --- Products ---
  getProducts: async (): Promise<Product[]> => {
    return apiFetch<Product[]>("/products");
  },

  getProductById: async (id: string): Promise<Product> => {
    return apiFetch<Product>(`/products/${id}`);
  },

  searchProducts: async (
    query: string,
    options: RequestInit = {},
  ): Promise<Product[]> => {
    return apiFetch<Product[]>(
      `/products/search?query=${encodeURIComponent(query)}`,
      {
        ...options,
        method: "GET",
      },
    );
  },

  // Role protected (Artisan only)
  addProduct: async (productData: Partial<Product>): Promise<Product> => {
    return apiFetch<Product>("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  },

  // --- Auth ---
  register: async (
    name: string,
    email: string,
    password: string,
    isArtisan: boolean,
  ): Promise<{ user: User; token: string }> => {
    const data = await apiFetch<{ user: User; token: string }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify({ name, email, password, isArtisan }),
      },
    );
    setToken(data.token);
    return data;
  },

  login: async (
    email: string,
    password: string,
    remember: boolean = true,
  ): Promise<{ user: User; token: string }> => {
    const data = await apiFetch<{ user: User; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token, remember);
    return data;
  },

  getProfile: async (): Promise<User> => {
    return apiFetch<User>("/auth/me");
  },

  logout: async (): Promise<void> => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout failed on server", e);
    }
    removeToken();
  },

  forgotPassword: async (
    email: string,
  ): Promise<{ success: boolean; message: string }> => {
    return apiFetch<{ success: boolean; message: string }>(
      "/auth/forgot-password",
      {
        method: "POST",
        body: JSON.stringify({ email }),
      },
    );
  },

  resetPassword: async (
    email: string,
    newPassword: string,
  ): Promise<{ success: boolean; message: string }> => {
    return apiFetch<{ success: boolean; message: string }>(
      "/auth/reset-password",
      {
        method: "POST",
        body: JSON.stringify({ email, newPassword }),
      },
    );
  },

  googleLogin: async (
    credential: string,
    remember: boolean = true,
  ): Promise<{ user: User; token: string }> => {
    const data = await apiFetch<{ user: User; token: string }>("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    });
    setToken(data.token, remember);
    return data;
  },

  // --- Cart ---
  getCart: async (): Promise<CartItem[]> => {
    return apiFetch<CartItem[]>("/cart");
  },

  syncCart: async (
    items: CartItem[],
  ): Promise<{ success: boolean; message: string }> => {
    return apiFetch<{ success: boolean; message: string }>("/cart", {
      method: "POST",
      body: JSON.stringify({ items }),
    });
  },
};
