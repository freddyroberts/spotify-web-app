'use client';

import Header from '@/components/header';
import { Profile } from '@/components/profile'
import RecentlyPlayed from '@/components/recentlyPlayed';
import { MostPlayedArtists } from '@/components/mostPlayedArtists';
import { Flex, } from '@chakra-ui/react'
import React from 'react'

export default function DashboardPage() {
  return (
    <>
    <Header />
    <Flex gap="4" direction="column" backgroundColor='whitesmoke'>
      <Profile />
      <MostPlayedArtists />
      <RecentlyPlayed />
    </Flex>
    </>
  )
}
