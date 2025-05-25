'use client'

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
  DataList
} from "@chakra-ui/react";

export const Profile = (profile: SpotifyProfile) => {
  const profileFields = [
    { label: "Product", value: profile.data?.product },
    { label: "Email", value: profile.data?.email },
    { label: "Followers", value: profile.data?.followers.total },
    { label: "Explicit Content Filter", value: profile.data?.explicit_content.filter_enabled ? "Enabled" : "Disabled" },
    { label: "Spotify URI", value: profile.data?.uri },
    { label: "Spotify URL", value: profile.data?.external_urls.spotify },
  ];

  return (
    <>
      {profile.data ?
        <Card.Root
          backgroundColor='#fff'
          color='#000' 
          borderColor='lime'
          size='sm'
          maxWidth='600px'
          width='100%'
        >
          <CardHeader>
            <HStack>
              <Avatar.Root>
                <Avatar.Fallback name={profile.data.display_name} />
                <Avatar.Image src={profile.data.images[0]?.url} />
              </Avatar.Root>
              <Heading as={'h3'}>{profile.data.display_name}</Heading>
              <Stack>
                <Text textStyle='sm'>{profile.data.country}</Text>
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
        : ''
      }
    </>
  )
}