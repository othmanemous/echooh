import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  name?: string;
  email: string;
  prenom?: string;
  phone?: string;
  profilePicture?: string;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

interface AuthState {
  user: User | null;
  tokenPair: TokenPair | null;
  setAuth: (user: User, tokenPair: TokenPair) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokenPair: null,

      setAuth: (user: User, tokenPair: TokenPair) =>
        set({ user, tokenPair }),

      clearAuth: () =>
        set({ user: null, tokenPair: null }),
    }),
    {
      name: "auth-storage", 
      getStorage: () => localStorage, 
    }
  )
);
