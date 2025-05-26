'use client'

import useFetchSpotifyData from "@/hooks/useFetchSpotifyData";
import { SpotifyProfile } from "@/types/spotify";
import {
  Avatar,
  Card,
  CardBody,
  Heading,
  HStack,
  Text,
  Stack,
  CardHeader,
  DataList,
  SkeletonCircle,
  Skeleton,
  AspectRatio,
  Image,
  VStack,
  Container,
  Box,
  SkeletonText
} from "@chakra-ui/react";

export const Profile = () => {
  const profile = useFetchSpotifyData<SpotifyProfile>('https://api.spotify.com/v1/me');
  const isLoading = !profile;
  
  const profileFields = !isLoading ? [
    { label: "Product", value: profile.product },
    { label: "Email", value: profile.email },
    { label: "Followers", value: profile.followers.total },
    { label: "Explicit Content Filter", value: profile.explicit_content.filter_enabled ? "Enabled" : "Disabled" },
    { label: "Spotify URI", value: profile.uri },
    { label: "Spotify URL", value: profile.external_urls.spotify },
  ] : [];
  
  return (
    <Container margin='0 auto' maxWidth='68rem'>
      {!isLoading ?
        <>
          <AspectRatio ratio={3.5 / 1}>
            <Image
              src='https://picsum.photos/3200'
              alt="naruto"
              objectFit="cover"
              rounded='l2'
            />
          </AspectRatio>
          <Box margin='-6rem 0 0 2rem' textAlign='center' width={profile.images[0]?.width/1.6}>
            <Image
              src={profile.images[0] ? profile.images[0]?.url : 'https://upload.wikimedia.org/wikipedia/en/3/3f/Richard_d_james_album_cover.jpg'}
              alt={profile.display_name}
              borderRadius='full'
              boxSize='100%'
              fit='cover'
              position='relative'
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