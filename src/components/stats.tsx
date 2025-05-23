'use client'

import useSpotifyAuthStore from "@/stores/spotify-auth-store";
import { SpotifyArtist, SpotifyTopItems } from "@/types/spotify";
import {
  Avatar,
  Heading,
  Text,
  DataList,
  Stat,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Stats = () => {
  const [topArtists, setTopArtists] = useState<SpotifyArtist[] | null>();
  const accessToken = useSpotifyAuthStore(state => state.accessToken);
  
  useEffect(() => {
    const getTopArtist = async (): Promise<SpotifyTopItems<SpotifyArtist>> => {
      if (!accessToken) { return }

      try {
        const request = await fetch('https://api.spotify.com/v1/me/top/artists?offset=0&limit=10', {
          method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
        });
        
        if (!request.ok) {
          throw new Error(`Top Artist Request Failed: ${request.status}`)
        }
        const response = await request.json();

        console.log(response.items);
        setTopArtists(response.items);
      } catch (error) {
        console.error(error);
      }
    }
    getTopArtist();
  }, [accessToken]);

  return (
    <>
      <Heading as='h2'>Stats</Heading>
      <DataList.Root orientation="horizontal" divideY="1px" maxW="md">
        { topArtists?.map((artist, index) => (
          <DataList.Item key={artist.id} pt="4">
            <Stat.Root>
              <Stat.Label>{index+1}</Stat.Label>
              <Stat.ValueText>
                <Avatar.Root>
                <Avatar.Fallback name={artist.name} />
                <Avatar.Image src={artist.images[0].url} />
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