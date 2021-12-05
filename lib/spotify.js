import SpotifyWebApi from "spotify-web-api-node";

// Search parameters:
const scopes = [
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-private",
    "user-read-email",
    "user-read-recently-played",
    "user-modify-playback-state",
    "user-library-read",
    "user-top-read",
    "user-follow-read",
    "playlist-read-collaborative",
    "playlist-read-private",
    "streaming" 
].join(','); // In order to get them with commas

const params = {
    scope:scopes
};

// Adding search parameters to the login url
const queryParamString = new URLSearchParams(params);
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

// Generating api
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
});

export default spotifyApi;
export {LOGIN_URL}; // used in [...nextauth].js as a value of 'authorization'