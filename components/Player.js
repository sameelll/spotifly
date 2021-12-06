import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify"

function Player() {
    // Custom Hook 'useSpotify' enables to create spotifyApi inside this component
    const spotifyApi = useSpotify();

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
