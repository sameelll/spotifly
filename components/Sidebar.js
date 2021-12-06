// Heroicon icons
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon
} from "@heroicons/react/outline";
// Session provider
import { signOut, useSession } from "next-auth/react";
// Hooks
import { useEffect, useState } from "react";
// Atoms (Recoil)
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
// Api
import useSpotify from '../hooks/useSpotify';

function Sidebar() {
    // Custom Hook 'useSpotify' enables to create spotifyApi inside this component
    const spotifyApi = useSpotify();

    // Session
    const { data: session, status } = useSession();

    // States
    const [playlists, setPLaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState); 

    console.log("you picked playlist >>>", playlistId);

    // Hooks
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPLaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);

    return (
        <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
            <div className="space-y-4">
            <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />


                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Your Episodes</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                {
                    playlists.map((playlist) => (
                        <p  
                            onClick={() => setPlaylistId(playlist.id)}
                            key={playlist.id} 
                            className="cursor-pointer hover:text-white">
                            {playlist.name}
                        </p>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar
