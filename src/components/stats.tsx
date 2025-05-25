'use client'

import useFetchSpotifyData from "@/hooks/useFetchSpotifyData";
import { SpotifyArtist, SpotifyTopItems } from "@/types/spotify";
import {
  Avatar,
  Heading,
  Text,
  DataList,
  Stat,
} from "@chakra-ui/react";

export const Stats = () => {
  const topArtists = useFetchSpotifyData<SpotifyTopItems<SpotifyArtist>>('https://api.spotify.com/v1/me/top/artists?offset=0&limit=10');

  return (
    <>
      <Heading as='h2'>Most Streamed Artists in the past 6 months</Heading>
      <DataList.Root orientation="horizontal" divideY="1px" maxW="md">
        { topArtists && topArtists.items.map((artist, index) => (
          <DataList.Item key={artist.id} pt="4">
            <Stat.Root>
              <Stat.Label>{index+1}</Stat.Label>
              <Stat.ValueText>
                <Avatar.Root>
                <Avatar.Fallback name={artist.name} />
                <Avatar.Image src={artist.images[0]?.url} />
              </Avatar.Root>
                <Text>{artist.name}</Text>
              </Stat.ValueText>
            </Stat.Root>
          </DataList.Item>
        ))}
      </DataList.Root>
    </>
  )
}