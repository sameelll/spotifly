// Session provider
import { useSession } from "next-auth/react";
// Hooks
import { useState } from "react";
// Atoms (Recoil)
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
// Custom Hooks
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify"

function Player() {
    // Custom Hook 'useSpotify' enables to create spotifyApi inside this component
    const spotifyApi = useSpotify();
    // Custom Hook 'useSongInfo' enables to get track info from the api
    const songInfo = useSongInfo();

    // Session
    const { data: session, status } = useSession();

    // States
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    return (
        <div>
            <div>
                <img src="" alt="" />
            </div>
        </div>
    )
}

export default Player
