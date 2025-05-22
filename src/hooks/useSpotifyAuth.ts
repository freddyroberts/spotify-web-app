import { useState } from "react";

const useSpotifyAuth = () => {
  const [response, setResponse] = useState<string>();
  const [data, setData ] = useState({});

  setResponse('authed')
  setData({
    message: 'this is a fake data message'
  });
  return { response, data };
}

export default useSpotifyAuth