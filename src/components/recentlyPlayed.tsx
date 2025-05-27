import useFetchSpotifyData from '@/hooks/useFetchSpotifyData'
import { Box, Card, CardDescription, Container, Grid, GridItem, Heading, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react'

export type RecentlyPlayed = {
  items: RecentlyPlayedItem[];
  next: string;
  cursors: {
    after: string;
    before: string;
  };
  limit: number;
  href: string;
};

export type RecentlyPlayedItem = {
  track: Track;
  played_at: string; // ISO string
  context: PlaybackContext;
};

export type PlaybackContext = {
  href: string;
  external_urls: {
    spotify: string;
  };
  type: string;
  uri: string;
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
};

export type Album = {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type Artist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type Image = {
  height: number;
  url: string;
  width: number;
};

export default function RecentlyPlayed() {
  const recent = useFetchSpotifyData<RecentlyPlayed>('https://api.spotify.com/v1/me/player/recently-played?limit=8');
  const isLoading = !recent;

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
            <Heading as='h2'>Recently Played Tracks</Heading>
          </Box>
          <Grid
            gap='1rem'
            templateColumns="repeat(2, 1fr)"
            lg={{
              gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem'
            }}>
            {recent.items.map((item) => (
              <GridItem key={item.track.id} rounded='md'>
                <Card.Root>
                  <HStack>
                    <Image
                      src={item.track.album.images[0].url}
                      alt={item.track.album.name}
                      width='30%'
                      rounded='md'
                      maxWidth='100%'
                    />
                    <CardDescription>
                      <Text as='h5'>{item.track.name}</Text>
                    </CardDescription>
                  </HStack>
                </Card.Root>
              </GridItem>
            ))}
          </Grid>
        </Container>
      )}
    </>
  )
}
