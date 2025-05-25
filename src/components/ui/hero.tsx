"use client"

import { Tabs, Text, VStack } from "@chakra-ui/react";
import { Profile } from "../profile";
import SpotifyAuthButton from "./spotifyAuthButton";
import useSpotifyAuthStore from "@/stores/spotify-auth-store";
import useSpotifyAccessToken from "@/hooks/useSpotifyAccessToken";
import { Stats } from "../stats";
import { LuChartArea, LuSettings, LuUser } from "react-icons/lu";
import { LiaUserFriendsSolid } from "react-icons/lia";
import useFetchSpotifyData from "@/hooks/useFetchSpotifyData";

export const Hero = () => {
  const verifier = useSpotifyAuthStore(state => state.verifier);
  const profileData = useFetchSpotifyData('https://api.spotify.com/v1/me')

  useSpotifyAccessToken();

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

      <Tabs.Root defaultValue="members">
        <Tabs.List bg="bg.muted" bgColor={'gray.400'}>
          <Tabs.Trigger value="members">
            <LuUser />
            Profile
          </Tabs.Trigger>
          <Tabs.Trigger value="stats">
            <LuChartArea />
            Stats
          </Tabs.Trigger>
          <Tabs.Trigger value="friends">
            <LiaUserFriendsSolid />
            Friends
          </Tabs.Trigger>
          <Tabs.Trigger value="tasks">
            <LuSettings />
            Settings
          </Tabs.Trigger>
        </Tabs.List>
         { verifier ? (
        <>
          <Tabs.Content value="members">
            { profileData && (
              <Profile data={profileData}/>  
            )}
          </Tabs.Content>
          <Tabs.Content value="stats">
            <Stats />
          </Tabs.Content>
          <Tabs.Content value="friends">
            Friends
          </Tabs.Content>
          <Tabs.Content value="tasks">
            Adjust your settings
          </Tabs.Content>
        </>
      ) : null }
      </Tabs.Root>
    </VStack>
  );
}