import { Box, HStack, Text } from "@chakra-ui/react";
import Link from 'next/link';

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
    return (
        <header>
            <Box background='#000' color='lime' padding='5'>
              <HStack justifyContent='space-between' maxWidth='64rem' margin='auto'>
                <Text fontWeight="bold" textStyle='lg'><Link href='/'>Planet Spotify</Link></Text>
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


                    </HStack>
                  </nav>
              </HStack>
            </Box>
        </header>
    );
}

export default Header;