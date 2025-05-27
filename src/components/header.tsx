'use client'

import { Box, HStack, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link';
import useSpotifyAuthStore from "@/stores/spotify-auth-store";

const navigationLinks = [
  {
    href: '/why',
    text: 'why'
  },
  {
    href: '/help',
    text: 'help'
  }
];

function Header() {
  const router = useRouter();
  const currentRoute = usePathname();
  const resetAuth = useSpotifyAuthStore(state => state.resetAuth);

  const handleLogout = (e) => {
    e.preventDefault();
    router.push('/')
    resetAuth();
  }

  return (
    <header>
      <Box background='#000' color='lime' padding='5'>
        <HStack justifyContent='space-between' maxWidth='64rem' margin='auto'>
          <Text fontWeight="bold" textStyle='lg'><Link href='/'>Planet S</Link></Text>
            <nav>
              <HStack justifyContent='flex-end'>
                { navigationLinks.map(link => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    color='lime'
                  >
                    {link.text}
                  </Link>
                ))}
                { currentRoute === '/dashboard' && 
                  <Link 
                    key='logout'
                    href='/'
                    color='lime'
                    onClick={e => handleLogout(e)}
                  >
                    logout
                  </Link>
                }
              </HStack>
            </nav>
        </HStack>
      </Box>
    </header>
  );
}

export default Header;