import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";


type SpotifyAuthStoreState = {
    verifier: string | null,
    accessToken: string | null,
    refreshToken: string | null,
    expiresAt: number | null,
  };
  
  type SpotifyAuthStoreActions = {
    setVerifier: (verifier: string) => void,
    setAuth: (accessToken: string, refreshToken: string, expiresAt: number) => void;
    resetAuth: () => void;
  }

type SpotifyAuthStore = SpotifyAuthStoreState & SpotifyAuthStoreActions

const useSpotifyAuthStore = create<SpotifyAuthStore>()(
  persist(
    (set) => ({
      verifier: null,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      setVerifier: (verifier) => set({verifier}),
      setAuth: (accessToken, refreshToken, expiresAt) => {
        set({ accessToken, refreshToken, expiresAt });
      },
      resetAuth: () => set({ accessToken: null, refreshToken: null, expiresAt: null, verifier: null})
    }),
    { name: 'spotify-auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSpotifyAuthStore;
