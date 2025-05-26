'use client';

import useSpotifyAuthStore from '@/stores/spotify-auth-store';
import { Spinner, VStack, Text, Box } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function AuthenticatePage() {
  const setVerifier = useSpotifyAuthStore((state) => state.setVerifier);

  useEffect(() => {
    const redirectToSpotify = async () => {
      const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
      const redirectUri = 'http://localhost:3000/callback';

      const verifier = generateCodeVerifier(128);
      const challenge = await generateCodeChallenge(verifier);

      setVerifier(verifier);

      const params = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri,
        scope: 'user-read-private user-read-email user-top-read user-read-recently-played',
        code_challenge_method: 'S256',
        code_challenge: challenge,
      });

      window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
    };

    redirectToSpotify();
  }, []);

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
  );
}

function generateCodeVerifier(length: number) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => possible.charAt(x % possible.length))
    .join('');
}

async function generateCodeChallenge(verifier: string) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
