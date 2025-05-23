import useSpotifyAuthStore from "@/stores/spotify-auth-store";
import { useEffect } from "react";

const useSpotifyAccessToken = () => {
    const verifier = useSpotifyAuthStore.getState().verifier;

    useEffect(() => {
      const getAccessToken = async () => {
        const codeParams = new URLSearchParams(window.location.search);
        const code = codeParams.get("code");
    
        if (!code || !verifier) return;
        
        const params = new URLSearchParams();
        params.append("client_id", '1347915da2064a6f9c7a87b0ff85ae36');
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "http://localhost:3000/");
        params.append("code_verifier", verifier!);

        try {
          const response = await fetch("https://accounts.spotify.com/api/token", {
              method: "POST",
              headers: { 
                "Content-Type": "application/x-www-form-urlencoded" 
              },
              body: params
          });

          if (!response.ok) {
            throw new Error(`Token request failed: ${response.status}`);
          }

          const { access_token } = await response.json();

          useSpotifyAuthStore.getState().setAccessToken(access_token);
          // Optionally store refresh_token
          // localStorage.setItem("refresh_tok
        } catch (err) {
          console.error("Error getting token", err);
        }
      }

      getAccessToken();
    }, []);
};

export default useSpotifyAccessToken;