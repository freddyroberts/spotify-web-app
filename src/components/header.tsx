import { Box, HStack, Link, Text } from "@chakra-ui/react";

const navigationLinks = [
  {
    href: '/why'
  },
  {
    href: '/help'
  },
  {
    href: '/login'
  }
];

function Header() {
    return (
        <header>
            <Box background='#000' color='lime' padding='5' position='fixed' top='0' left='0' right='0'>
              <HStack justifyContent='space-between' maxWidth='9/12' margin='auto'>
                <Text fontWeight="bold" textStyle='lg'>Spotify Web App</Text>
                  <nav>
                    <HStack justifyContent='flex-end'>
                      { navigationLinks.map(link => (
                        <Link 
                          href={link.href}
                          key={link.href}
                          variant='plain'
                        >
                          {link.href}
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