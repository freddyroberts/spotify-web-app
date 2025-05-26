'use client'

import useFetchSpotifyData from "@/hooks/useFetchSpotifyData";
import { SpotifyArtist, SpotifyTopItems } from "@/types/spotify";
import {
  Heading,
  Text,
  Container,
  Grid,
  GridItem,
  Image,
  Box,
} from "@chakra-ui/react";

export const MostPlayedArtists = () => {
  const topArtists = useFetchSpotifyData<SpotifyTopItems<SpotifyArtist>>('https://api.spotify.com/v1/me/top/artists?offset=0&limit=8');
  const isLoading = !topArtists;
  return (
    <>
      {!isLoading && (
        <Container maxWidth='68rem'>
          <Box
            bg='#000'
            color='lime'
            padding='1rem'
            margin='2rem 0 1rem'
            rounded='l2'
          >
            <Heading as='h2'>Your Most Recent Top Artists</Heading>
          </Box>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            { topArtists && topArtists.items.map((artist, index) => (
              <GridItem key={artist.id}>
                <Image src={artist.images[0]?.url} alt={artist.name} rounded='md' maxWidth='100%'/>
                <Text as='h5'>{index+1}. {artist.name}</Text>
              </GridItem>
            ))}
          </Grid>
        </Container>
      )}
    </>
  )
}