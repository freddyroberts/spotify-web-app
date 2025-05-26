"use client"

import { Text, VStack } from "@chakra-ui/react";
import SpotifyAuthButton from "./spotifyAuthButton";

export const Hero = () => {
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
    </VStack>
  );
}