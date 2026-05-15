import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import SongCard from '../components/ui/SongCard';

const Favorites = () => {
  const { likedSongs } = useLibrary();

  return (
    <div className="pb-8">
      <div className="flex items-center gap-6 mb-8 border-b border-spotify-white/10 pb-4">
        <h1 className="text-2xl font-bold text-spotify-white">Liked Songs</h1>
        <span className="text-sm text-spotify-text">{likedSongs.length} songs</span>
      </div>

      {likedSongs.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {likedSongs.map((song, idx) => (
            <SongCard key={song.id} song={song} index={idx} songsContext={likedSongs} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-spotify-white/5 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">🎵</span>
          </div>
          <h2 className="text-xl font-bold text-spotify-white mb-2">Songs you like will appear here</h2>
          <p className="text-spotify-text text-sm max-w-sm">
            Save songs by tapping the heart icon.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
