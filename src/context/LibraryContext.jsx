import React, { createContext, useState, useEffect, useContext } from 'react';

const LibraryContext = createContext();

export const useLibrary = () => useContext(LibraryContext);

export const LibraryProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [customPlaylists, setCustomPlaylists] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedLikes = localStorage.getItem('musicApp_likedSongs');
    const storedPlaylists = localStorage.getItem('musicApp_customPlaylists');
    
    if (storedLikes) setLikedSongs(JSON.parse(storedLikes));
    if (storedPlaylists) setCustomPlaylists(JSON.parse(storedPlaylists));
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('musicApp_likedSongs', JSON.stringify(likedSongs));
  }, [likedSongs]);

  useEffect(() => {
    localStorage.setItem('musicApp_customPlaylists', JSON.stringify(customPlaylists));
  }, [customPlaylists]);

  const toggleLike = (song) => {
    setLikedSongs(prev => {
      const isLiked = prev.some(s => s.id === song.id);
      if (isLiked) {
        return prev.filter(s => s.id !== song.id);
      } else {
        return [...prev, song];
      }
    });
  };

  const isLiked = (songId) => likedSongs.some(s => s.id === songId);

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now().toString(),
      title: name,
      description: 'Custom Playlist',
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300', // Default cover
      songs: []
    };
    setCustomPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  };

  const addSongToPlaylist = (song, playlistId) => {
    setCustomPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        if (!p.songs.some(s => s.id === song.id)) {
          return { ...p, songs: [...p.songs, song] };
        }
      }
      return p;
    }));
  };

  const removeSongFromPlaylist = (songId, playlistId) => {
    setCustomPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        return { ...p, songs: p.songs.filter(s => s.id !== songId) };
      }
      return p;
    }));
  };

  const deletePlaylist = (playlistId) => {
    setCustomPlaylists(prev => prev.filter(p => p.id !== playlistId));
  };

  const value = {
    likedSongs,
    customPlaylists,
    toggleLike,
    isLiked,
    createPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    deletePlaylist
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};
