import Header from "@/components/header";
import { Hero } from "@/components/ui/hero";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box>
      <main>
        <Header />
        <Hero />
      </main>
    </Box>    
  );
}
