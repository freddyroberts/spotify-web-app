import { useEffect, useState } from "react";
import useSpotifyAuthStore from "@/stores/spotify-auth-store";
import { useRouter } from "next/navigation";

function useFetchSpotifyData<T>(url: string): T | null {
  const router = useRouter();
  const [data, setData] = useState<T | null>(null);
  const accessToken = useSpotifyAuthStore.getState().accessToken;
  const expiresAt = useSpotifyAuthStore.getState().expiresAt;
  
  useEffect(() => {
    const getData = async () => {
  
      if (!accessToken) return;

      try {
        const request = await fetch(url, {
          method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
        });
        
        if ((expiresAt && Date.now() >= expiresAt) || request.status === 401) {
          router.push('/callback');
        }
        
        if (!request.ok) {
          throw new Error(`Profile data request failed: ${request.status}`);
        }

        const response: T = await request.json();
        setData(response);
      } catch (err) {
        console.error(`Error occurred: ${err}`);
      }
    }
    getData();
  },[accessToken, expiresAt, router, url]);

  return data;
}

export default useFetchSpotifyData;