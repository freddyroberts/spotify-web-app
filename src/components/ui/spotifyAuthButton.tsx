import { Button } from "@chakra-ui/react"

function SpotifyAuthButton() {
  
  return (
    <Button
      backgroundColor='#000'
      color='lime'
      padding='1rem'
      size="md"
      asChild
    >
      <a href="/authenticate">Authenticate Spotify</a>
    </Button>
  )
}

export default SpotifyAuthButton