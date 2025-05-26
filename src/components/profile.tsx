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
  Skeleton
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
    <>
      {!isLoading ?
        <Card.Root
          backgroundColor='#fff'
          color='#000' 
          borderColor='lime'
          size='sm'
          width='100%'
        >
          <CardHeader>
            <HStack>
              <Avatar.Root>
                <Avatar.Fallback name={profile.display_name} />
                <Avatar.Image src={profile.images[0]?.url} />
              </Avatar.Root>
              <Heading as={'h3'}>{profile.display_name}</Heading>
              <Stack>
                <Text textStyle='sm'>{profile.country}</Text>
              </Stack>
            </HStack>
          </CardHeader>
          <CardBody>
            <HStack>
              <DataList.Root>
                {profileFields?.map((item) => (
                  <DataList.Item key={item.label} pt="4">
                    <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                    <DataList.ItemValue>{item.value}</DataList.ItemValue>
                  </DataList.Item>
                ))}
              </DataList.Root>
            </HStack>
          </CardBody>
        </Card.Root>
        : (
        <HStack gap="5">
          <SkeletonCircle size="12" />
          <Stack flex="1">
            <Skeleton height="5" />
            <Skeleton height="5" width="80%" />
          </Stack>
    </HStack>
        )
      }
    </>
  )
}