'use client';

import { useEffect } from 'react';

export default function AuthenticatePage() {
  useEffect(() => {
    const redirectToSpotify = async () => {
      const clientId = "1347915da2064a6f9c7a87b0ff85ae36";
      const redirectUri = 'http://localhost:3000/';

      const verifier = generateCodeVerifier(128);
      const challenge = await generateCodeChallenge(verifier);

      localStorage.setItem('verifier', verifier);

      const params = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri,
        scope: 'user-read-private user-read-email user-top-read',
        code_challenge_method: 'S256',
        code_challenge: challenge,
      });

      window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
    };

    redirectToSpotify();
  }, []);

  return <p>Redirecting to Spotify...</p>;
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
