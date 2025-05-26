import useFetchSpotifyData from '@/hooks/useFetchSpotifyData'
import { Container, Grid, GridItem, Heading, Image } from '@chakra-ui/react';
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
  const recent = useFetchSpotifyData<RecentlyPlayed>('https://api.spotify.com/v1/me/player/recently-played?limit=9');
  const isLoading = !recent;

  console.log(recent);
  
  return (
    <>
      {!isLoading && (
        <Container maxWidth='80rem'>
          <Heading as='h2'>Recently Played Tracks</Heading>
          <Grid templateColumns="repeat(3, 1fr)" columnGap={6}>
            {recent.items.map((item) => (
              <GridItem key={item.track.id}>
                <Image src={item.track.album.images[0].url} alt={item.track.album.name} rounded='md' maxWidth='20rem'/>
                <Heading as='h5'>{item.track.name}</Heading>
              </GridItem>
            ))}
          </Grid>
        </Container>
      )}
    </>
  )
}
