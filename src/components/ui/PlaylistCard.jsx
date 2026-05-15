import React from 'react';
import { motion } from 'framer-motion';

const PlaylistCard = ({ playlist, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-spotify-elevated/40 hover:bg-spotify-highlight transition-colors duration-300 p-4 rounded-md group cursor-pointer flex flex-col"
    >
      <div className="relative mb-4 pb-[100%] rounded-md overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
        <img 
          src={playlist.coverUrl} 
          alt={playlist.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <h3 className="font-bold text-spotify-white text-base truncate mb-1">{playlist.title}</h3>
      <p className="text-sm text-spotify-text line-clamp-2 leading-tight">{playlist.description}</p>
    </motion.div>
  );
};

export default PlaylistCard;
