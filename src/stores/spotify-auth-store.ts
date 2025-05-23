import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";


type SpotifyAuthStoreState = {
    verifier: string | null,
    accessToken: string | null
  };
  
  type SpotifyAuthStoreActions = {
    setVerifier: (verifier: string) => void,
    setAccessToken: (accessToken: string) => void
  }

type SpotifyAuthStore = SpotifyAuthStoreState & SpotifyAuthStoreActions

const useSpotifyAuthStore = create<SpotifyAuthStore>()(
  persist(
    (set) => ({
      verifier: null,
      setVerifier: (verifier) => set({verifier}),
      accessToken: null,
      setAccessToken: (accessToken) => set({accessToken})
    }),
    { name: 'spotify-auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSpotifyAuthStore;
