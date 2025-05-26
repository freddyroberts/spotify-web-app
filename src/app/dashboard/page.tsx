'use client';

import Header from '@/components/header';
import { Profile } from '@/components/profile'
import RecentlyPlayed from '@/components/recentlyPlayed';
import { Stats } from '@/components/stats';
import { Flex, } from '@chakra-ui/react'
import React from 'react'

export default function DashboardPage() {
  return (
    <>
    <Header />
    <Flex gap="4" direction="column" marginTop='2rem' padding='0 3rem'>
      <Profile />
      <Stats />
      <RecentlyPlayed />
    </Flex>
    </>
  )
}
