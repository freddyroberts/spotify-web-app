'use client';

import Header from "@/components/header";
import { Hero } from "@/components/ui/hero";
import useSpotifyAuthStore from "@/stores/spotify-auth-store";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const accessToken = useSpotifyAuthStore(state => state.verifier);

  useEffect(() => {
    if (accessToken) {
      router.push('/dashboard')
    }
  }, [accessToken, router])

  return (
    <Box>
      <main>
        <Header />
        <Hero />
      </main>
    </Box>    
  );
}
