// Heroicons Icons
import { ChevronDownIcon } from "@heroicons/react/outline";
// Session provider
import { signOut, useSession } from "next-auth/react"
// Hooks
import { useEffect, useState } from "react";
// Lodash lib
import { shuffle } from "lodash";
// Atoms (Recoil)
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
// Api
import useSpotify from "../hooks/useSpotify";
// Components
import Songs from "./Songs";

// Gradient colors from...to-black
const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500"
];

function Center() {
    // Session
    const { data: session } = useSession();
    // Custom Hook 'useSpotify' enables to create spotifyApi inside this component
    const spotifyApi = useSpotify();

    // States
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPLaylist] = useRecoilState(playlistState);

    console.log(playlist)

    // Hooks
    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId]);

    useEffect(() => {
        spotifyApi
            .getPlaylist(playlistId)
            .then((data) => {
                setPLaylist(data.body);
            })
            .catch((err) => console.log("Something went wrong!", err));
    }, [spotifyApi, playlistId])

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div 
                    className="flex items-center bg-gray-800 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white" 
                    onClick={signOut} >
                    <img className="rounded-full w-10 h-10" src={session?.user.image} alt="" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img
                    className="h-44 w-44 shadow-2xl"
                    src={playlist?.images?.[0]?.url}
                    alt="" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                </div>
            </section>
            <div>
                <Songs />
            </div>
        </div>
    )
}

export default Center
