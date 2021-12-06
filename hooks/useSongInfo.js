// Hooks
import { useState } from "react";
// Atoms (Recoil)
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
// Api
import useSpotify from "./useSpotify";

function useSongInfo() {
    // Custom Hook 'useSpotify' enables to create spotifyApi inside this component
    const spotifyApi = useSpotify();

    // States
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        (async () => {
            if (currentIdTrack) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                        }
                    }
                ).then(res => res.json());

                setSongInfo(trackInfo);
            }
        })();
    }, [currentIdTrack, spotifyApi])

    return songInfo;
}

export default useSongInfo