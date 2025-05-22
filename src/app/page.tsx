import Header from "@/components/header";
import Hero from "@/components/ui/hero";
import { Box } from "@chakra-ui/react";

export default function Home() {
  // check if token is created then make requests
  // get profile data
  // get top artist data

  return (
    <Box>
      <main>
        <Header />
        <Hero />
      </main>
    </Box>    
  );
}
