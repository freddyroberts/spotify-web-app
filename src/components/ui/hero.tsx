"use client"

import { Text, VStack } from "@chakra-ui/react";
import { Profile } from "../profile";
import SpotifyAuthButton from "./spotifyAuthButton";
import useSpotifyAuthStore from "@/stores/spotify-auth-store";
import useSpotifyAccessToken from "@/hooks/useSpotifyAccessToken";
import { useEffect, useState } from "react";
import { Stats } from "../stats";

export const Hero = () => {
  const [profileData, setProfileData] = useState();
  const verifier = useSpotifyAuthStore(state => state.verifier);
  const accessToken = useSpotifyAuthStore(state => state.accessToken);

  useSpotifyAccessToken();

  useEffect(() => {
    const getProfile = async () => {
  
      if (!accessToken) return;

      try {
        const request = await fetch("https://api.spotify.com/v1/me", {
          method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
        });
        
        if (!request.ok) {
          throw new Error(`Profile data request failed: ${request.status}`);
        }

        const response = await request.json();        
        setProfileData(response);
      } catch (err) {
        console.error(`Error occured: ${err}`);
      }
    }
    getProfile();
  },[accessToken]);
  

  return (
    <VStack
      alignItems="center"
      backgroundColor="#fff"
      color='#000'
      gap='10'
      justifyContent="center"
      minHeight="100vh"
    >
      <Text textStyle='4xl'>Let&apos;s get started</Text>
      <SpotifyAuthButton />

      { verifier ? (
        <>
          <Profile data={profileData} />
          <Stats />
        </>
      ) : null }
    </VStack>
  );
}