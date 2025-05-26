'use client'

import useSpotifyAuthStore from "@/stores/spotify-auth-store";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function CallbackPage() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const callbackUrl = 'http://localhost:3000/callback';
  const verifier = useSpotifyAuthStore.getState().verifier;
  const setAuth = useSpotifyAuthStore.getState().setAuth;
  const router = useRouter();
  
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (!code) { return; }

    const params = new URLSearchParams();

    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", callbackUrl);
    params.append("code_verifier", verifier!);

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded" 
      },
        body: params
    })
      .then((response) => response.json())
      .then((data) => {
        setAuth(data.access_token, data.refresh_token, data.expires_in);
        console.log(data);
        router.push('/dashboard');
      });
  }, [clientId, router, setAuth, verifier]);

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
