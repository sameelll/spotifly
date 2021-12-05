import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

// Api creation
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
});

// *** Custom hook ***
function useSpotify() {
    const { data: session, status } = useSession();

    // Hooks
    useEffect(() => {
        if (session){
            // If refresh access token attempt fails, direct user to login...
            if(session.error === 'RefreshAccessTokenError'){
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);
    
    return spotifyApi;
}

export default useSpotify