import { useEffect, useState } from "react";
import useSpotifyAuthStore from "@/stores/spotify-auth-store";

function useFetchSpotifyData<T>(url: string): T | null {
    const [data, setData] = useState<T | null>(null);
    const accessToken = useSpotifyAuthStore(state => state.accessToken);
  
    useEffect(() => {
      const getData = async () => {
    
        if (!accessToken) return;
  
        try {
          const request = await fetch(url, {
            method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
          });
          
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
    },[accessToken, url]);

  return data;
}

export default useFetchSpotifyData;