'use client'

import useFetchSpotifyData from "@/hooks/useFetchSpotifyData";
import { SpotifyProfile } from "@/types/spotify";
import {
  HStack,
  Text,
  Stack,
  SkeletonCircle,
  Skeleton,
  AspectRatio,
  Image,
  Container,
  Box,
  SkeletonText
} from "@chakra-ui/react";

export const Profile = () => {
  const profile = useFetchSpotifyData<SpotifyProfile>('https://api.spotify.com/v1/me');
  const isLoading = !profile;

  return (
    <Container margin='0 auto' maxWidth='68rem'>
      {!isLoading ?
        <>
          <AspectRatio ratio={3.5 / 1}>
            <Image
              src='https://picsum.photos/3200?grayscale'
              alt="naruto"
              objectFit="cover"
              rounded='l2'
            />
          </AspectRatio>
          <Box margin='-6rem 0 0 2rem' textAlign='center' width='12rem'>
            <Image
              src={profile.images[0] ? profile.images[0]?.url : 'https://upload.wikimedia.org/wikipedia/en/3/3f/Richard_d_james_album_cover.jpg'}
              alt={profile.display_name}
              borderRadius='full'
              boxSize='100%'
              fit='cover'
              position='relative'
              maxW='100%'
            />
            <Text textStyle='2xl' fontWeight='semibold'>{profile.display_name}</Text>
          </Box>
        </>
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