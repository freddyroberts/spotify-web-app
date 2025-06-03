'use client'

import useFetchSpotifyData from "@/hooks/useFetchSpotifyData";
import useSpotifyProfileStore from "@/stores/spotify-profile-store";
import { SpotifyProfile } from "@/types/spotify";
import {
  HStack,
  Text,
  Stack,
  SkeletonCircle,
  Skeleton,
  Image,
  Container,
  SkeletonText
} from "@chakra-ui/react";
import { useEffect } from "react";

export const Profile = () => {
  const profile = useFetchSpotifyData<SpotifyProfile>('https://api.spotify.com/v1/me');
  const username = useSpotifyProfileStore(state => state.username);
  const profileImage = useSpotifyProfileStore(state => state.profileImage);
  const setProfile = useSpotifyProfileStore(state => state.setProfile);

  const isLoading = !profile;

  useEffect(() => {
    setProfile(profile?.images[0]?.url, profile?.display_name);
  }, [profile, setProfile]);

  return (
    <Container margin='1rem auto 0' maxWidth='68rem'>
      {!isLoading ?
        <HStack gap='1rem'>
          <Image
            src={
              profileImage ? profileImage
              : 'https://upload.wikimedia.org/wikipedia/en/3/3f/Richard_d_james_album_cover.jpg'
            }
            alt={username}
            borderRadius='full'
            boxSize='100%'
            fit='cover'
            position='relative'
            maxW='100%'
            width='5rem'
            lg={{ width: '12rem' }}
          />
          <Text textStyle='2xl' fontWeight='semibold'>Hello, {username}!</Text>
        </HStack>
        : (
        <Stack gap="6">
          <Skeleton height="200px" />
          <HStack width="full">
            <SkeletonCircle size="10" />
            <SkeletonText noOfLines={1} />
          </HStack>
        </Stack>
        )
      }
    </Container>
  )
}