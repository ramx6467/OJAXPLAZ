import axios from 'axios';
import { dummySongs, dummyPlaylists, dummyAlbums } from '../data/dummyMusic';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const SPOTIFY_TOKEN = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN;
const HOST = 'spotifystefan-skliarovv1.p.rapidapi.com';

const apiClient = axios.create({
  baseURL: `https://${HOST}`,
  headers: {
    'x-rapidapi-host': HOST,
    'x-rapidapi-key': RAPIDAPI_KEY || '',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

// A helper to format API data to our app's UI model
const formatTrack = (track) => {
  if (!track) return null;
  return {
    id: track.id || Math.random().toString(36).substring(7),
    title: track.name || 'Unknown Title',
    artist: track.artists ? track.artists.map(a => a.name).join(', ') : 'Unknown Artist',
    album: track.album ? track.album.name : 'Unknown Album',
    duration: track.duration_ms ? track.duration_ms / 1000 : 180,
    coverUrl: track.album?.images?.[0]?.url || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300',
    audioUrl: track.preview_url || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // fallback to dummy audio if no preview
  };
};

const formatPlaylist = (playlist) => {
  if (!playlist) return null;
  return {
    id: playlist.id,
    title: playlist.name,
    description: playlist.description || `Created by ${playlist.owner?.display_name || 'Spotify'}`,
    coverUrl: playlist.images?.[0]?.url || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=300',
    songs: [] // We would fetch these separately if needed
  };
};

// Check if keys exist, if not we fallback to dummy data gracefully
const hasKeys = () => Boolean(RAPIDAPI_KEY && RAPIDAPI_KEY !== 'your_rapidapi_key_here');

export const fetchSongsByTerm = async (term, limit = 5) => {
  try {
    // Request a large batch so we have enough items to filter
    const response = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=100`);
    
    const currentYear = new Date().getFullYear();
    
    let tracks = response.data.results.map(track => ({
      id: track.trackId?.toString() || Math.random().toString(36),
      title: track.trackName || 'Unknown Title',
      artist: track.artistName || 'Unknown Artist',
      album: track.collectionName || 'Unknown Album',
      duration: track.trackTimeMillis ? track.trackTimeMillis / 1000 : 180,
      coverUrl: track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '300x300bb') : 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300',
      audioUrl: track.previewUrl,
      releaseDate: track.releaseDate || '2000-01-01T00:00:00Z'
    })).filter(t => t.audioUrl);

    // Strictly filter for current year songs
    let currentYearTracks = tracks.filter(t => new Date(t.releaseDate).getFullYear() === currentYear);

    // Sort by newest release date first
    currentYearTracks.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

    // Fallback: If there aren't enough current year tracks for this category, just use the newest available
    if (currentYearTracks.length < limit) {
      tracks.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      currentYearTracks = tracks;
    }

    return currentYearTracks.slice(0, limit);
  } catch (error) {
    console.error(`API Error (fetchSongsByTerm - ${term}):`, error);
    return dummySongs;
  }
};

export const fetchTrendingSongsByLanguage = async (language, limit = 100) => {
  try {
    // Search for "language songs" to get more accurate results and fetch 200 to sort
    const response = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(language + ' songs')}&entity=song&country=in&limit=200`);
    
    let tracks = response.data.results.map(track => ({
      id: track.trackId?.toString() || Math.random().toString(36),
      title: track.trackName || 'Unknown Title',
      artist: track.artistName || 'Unknown Artist',
      album: track.collectionName || 'Unknown Album',
      duration: track.trackTimeMillis ? track.trackTimeMillis / 1000 : 180,
      coverUrl: track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '300x300bb') : 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300',
      audioUrl: track.previewUrl,
      releaseDate: track.releaseDate || '2000-01-01T00:00:00Z'
    })).filter(t => t.audioUrl);

    // Sort by newest release date first to get the "trending/latest" feeling
    tracks.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

    return tracks.slice(0, limit);
  } catch (error) {
    console.error(`API Error (fetchTrendingSongsByLanguage - ${language}):`, error);
    return []; 
  }
};

export const fetchTopSongsByArtist = async (artistName, limit = 50) => {
  try {
    const response = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&entity=song&limit=${limit}`);
    
    const tracks = response.data.results.map(track => ({
      id: track.trackId?.toString() || Math.random().toString(36),
      title: track.trackName || 'Unknown Title',
      artist: track.artistName || 'Unknown Artist',
      album: track.collectionName || 'Unknown Album',
      duration: track.trackTimeMillis ? track.trackTimeMillis / 1000 : 180,
      coverUrl: track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '300x300bb') : 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300',
      audioUrl: track.previewUrl
    })).filter(t => t.audioUrl);

    return tracks;
  } catch (error) {
    console.error(`API Error (fetchTopSongsByArtist - ${artistName}):`, error);
    return dummySongs;
  }
};

export const getMyPlaylists = async () => {
  if (!hasKeys() || !SPOTIFY_TOKEN) {
    return dummyPlaylists;
  }
  
  try {
    const response = await apiClient.post('/getMyPlaylists', new URLSearchParams({
      accessToken: SPOTIFY_TOKEN
    }));
    if (response.data && response.data.items) {
      return response.data.items.map(formatPlaylist).filter(Boolean);
    }
    return dummyPlaylists;
  } catch (error) {
    return dummyPlaylists;
  }
};

export const searchSpotify = async (query) => {
  if (!query) {
    return { tracks: [], playlists: [] };
  }

  try {
    // Using iTunes Search API for global, no-auth searching (supports all languages, e.g., Telugu)
    const response = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=20`);
    
    const tracks = response.data.results.map(track => ({
      id: track.trackId?.toString() || Math.random().toString(36),
      title: track.trackName || 'Unknown Title',
      artist: track.artistName || 'Unknown Artist',
      album: track.collectionName || 'Unknown Album',
      duration: track.trackTimeMillis ? track.trackTimeMillis / 1000 : 180,
      coverUrl: track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '300x300bb') : 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300',
      audioUrl: track.previewUrl
    })).filter(t => t.audioUrl); // Ensure we only show playable tracks

    // Filter dummy playlists just in case
    const filteredPlaylists = dummyPlaylists.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

    return {
      tracks: tracks,
      playlists: filteredPlaylists
    };
  } catch (error) {
    console.error("Search API Error:", error);
    const filteredSongs = dummySongs.filter(s => s.title.toLowerCase().includes(query.toLowerCase()) || s.artist.toLowerCase().includes(query.toLowerCase()));
    const filteredPlaylists = dummyPlaylists.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    return { tracks: filteredSongs, playlists: filteredPlaylists };
  }
};
