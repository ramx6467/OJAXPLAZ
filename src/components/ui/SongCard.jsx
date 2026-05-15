import React, { useState } from 'react';
import { Play, Pause, Heart, Plus } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useLibrary } from '../../context/LibraryContext';
import { motion } from 'framer-motion';
import AddToPlaylistModal from './AddToPlaylistModal';

const SongCard = ({ song, index, songsContext }) => {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const { isLiked, toggleLike } = useLibrary();
  const [showModal, setShowModal] = useState(false);

  const isCurrentSong = currentSong?.id === song.id;
  const liked = isLiked(song.id);

  const handlePlay = (e) => {
    e.stopPropagation();
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(song, songsContext);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    toggleLike(song);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="bg-spotify-elevated/40 hover:bg-spotify-highlight transition-colors duration-300 p-4 rounded-md group relative cursor-pointer"
        onClick={handlePlay}
      >
        <div className="relative mb-4 pb-[100%] rounded-md overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
          <img 
            src={song.coverUrl} 
            alt={song.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleLike}
              className="bg-spotify-black/50 hover:bg-spotify-black/80 text-spotify-white rounded-full p-2 backdrop-blur-sm transition-all"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-spotify-green text-spotify-green' : ''}`} />
            </button>
            <button 
              onClick={handleAdd}
              className="bg-spotify-black/50 hover:bg-spotify-black/80 text-spotify-white rounded-full p-2 backdrop-blur-sm transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={handlePlay}
            className={`absolute bottom-2 right-2 bg-spotify-green text-black rounded-full p-3 shadow-xl transition-all duration-300 transform 
              ${isCurrentSong ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-105'}
            `}
          >
            {isCurrentSong && isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>
        </div>
        <h3 className="font-bold text-spotify-white text-base truncate mb-1">{song.title}</h3>
        <p className="text-sm text-spotify-text truncate">{song.artist}</p>
      </motion.div>
      <AddToPlaylistModal isOpen={showModal} onClose={() => setShowModal(false)} song={song} />
    </>
  );
};

export default SongCard;
