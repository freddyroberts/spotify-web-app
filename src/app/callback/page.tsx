'use client'

import useSpotifyAuthStore from "@/stores/spotify-auth-store";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function CallbackPage() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const callbackUrl = process.env.NEXT_PUBLIC_SPOTIFY_CALLBACK_URL;
  const verifier = useSpotifyAuthStore.getState().verifier;
  const setAuth = useSpotifyAuthStore.getState().setAuth;
  const refreshToken = useSpotifyAuthStore.getState().refreshToken;
  const router = useRouter();
  
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    
    if (!code || !verifier) { return; }

    const params = new URLSearchParams();
    params.append("client_id", clientId);

    if (refreshToken) {
      params.append("grant_type", "refresh_token");
      params.append("refresh_token", refreshToken);
    } else {
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", callbackUrl);
      params.append("code_verifier", verifier!);
    }

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded" 
      },
        body: params
    })
      .then((response) => response.json())
      .then((data) => {
        setAuth(data.access_token, data.refresh_token, Date.now() + data.expires_in * 1000);

        router.push('/dashboard');
      }).catch((err => console.error(err)));
  }, [callbackUrl, clientId, refreshToken, router, setAuth, verifier]);

  return (
     <Box backgroundColor='#000'>
      <VStack
        alignItems="center"
        backgroundColor="#000"
        color='#000'
        gap='10'
        justifyContent="center"
        minHeight="100vh"
      >
        <Spinner color='lime' size='xl' />
        <Text color='lime'>Loading...</Text>
      </VStack>
    </Box>
  )
}
