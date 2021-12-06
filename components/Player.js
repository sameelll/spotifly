// HeroIcons icons outline
import {
    HeartIcon,
    VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
// HeroIcons icons solid
import {
    RewindIcon,
    VolumeUpIcon,
    SwitchHorizontalIcon,
    ReplyIcon,
    PlayIcon,
    PauseIcon,
    FastForwardIcon
} from "@heroicons/react/solid";
// Lodash lib
import { debounce } from "lodash";
// Session provider
import { useSession } from "next-auth/react";
// Hooks
import { useCallback, useEffect, useState } from "react";
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

    // Functions
    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack()
                .then(data => {
                    console.log("Now playing: >>>", data.body?.item);
                    setCurrentTrackId(data.body?.item?.id);
                });

            spotifyApi.getMyCurrentPlaybackState()
                .then(data => {
                    setIsPlaying(data.body?.is_playing);
                });
        }
    };

    const handlePLayPause = () => {
        spotifyApi.getMyCurrentPlaybackState()
            .then(data => {
                if (data.body?.is_playing) {
                    spotifyApi.pause();
                    setIsPlaying(false);
                } else {
                    spotifyApi.play();
                    setIsPlaying(true);
                }
            })
    }

    // Hooks
    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            // Fetch the song info
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackIdState, spotifyApi, session]);

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume]);

    // Debounce, in order to prevent too much api calls
    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch(err => { });
        }, 400),
        []
    );

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white  grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            {/* Left */}
            <div className="flex items-center space-x-4">
                <img
                    className="hidden md:inline h-10 w-10"
                    src={songInfo?.album?.images?.[0]?.url}
                    alt="" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            {/* Center */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon className="button" />

                {isPlaying ?
                    (<PauseIcon onClick={handlePLayPause} className="button w-10 h-10" />)
                    :
                    (<PlayIcon onClick={handlePLayPause} className="button w-10 h-10" />)
                }

                <FastForwardIcon className="button" />
                <ReplyIcon className="button" />
            </div>
            {/* Right */}
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5" >
                <VolumeDownIcon
                    onClick={() => volume > 0 && setVolume(volume - 10)}
                    className="button" />
                <input
                    className="w-14 md:w-28"
                    type="range"
                    min={0} max={100}
                    onChange={e => setVolume(Number(e.target.value))}
                    value={volume} />
                <VolumeUpIcon
                    onClick={() => volume < 100 && setVolume(volume + 10)}
                    className="button" />
            </div>
        </div>
    )
}

export default Player
