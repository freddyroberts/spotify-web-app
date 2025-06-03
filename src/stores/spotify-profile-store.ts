import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type SpotifyProfileState = {
  profileImage: string | null,
  username: string | null,
  setProfile: (username: string, profileImage: string | null) => void,
  resetProfile: () => void
};

const useSpotifyProfileStore = create<SpotifyProfileState>()(
  persist(
    (set) => ({
      profileImage: null,
      username: null,
      setProfile: (profileImage, username) => {
        set({profileImage, username});
      },
      resetProfile: () => { 
        set({ profileImage: null, username: null })
      }
    }),
    {
      name: 'spotify-profile-store',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useSpotifyProfileStore;