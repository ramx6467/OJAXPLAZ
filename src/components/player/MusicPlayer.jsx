import React from 'react';
import { Heart, Maximize2, Mic2, MonitorSpeaker, PlaySquare, Volume2, VolumeX } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useLibrary } from '../../context/LibraryContext';
import PlayerControls from './PlayerControls';

const MusicPlayer = () => {
  const { currentSong, volume, setVolume } = usePlayer();
  const { isLiked, toggleLike } = useLibrary();

  if (!currentSong) return null;

  const liked = isLiked(currentSong.id);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-spotify-black border-t border-spotify-white/10 px-4 flex items-center justify-between z-50">
      {/* Current Song Info */}
      <div className="flex items-center gap-4 w-1/4 min-w-[180px]">
        <img 
          src={currentSong.coverUrl} 
          alt={currentSong.title} 
          className="w-14 h-14 rounded shadow-lg object-cover"
        />
        <div className="flex flex-col">
          <a href="#" className="text-spotify-white text-sm font-semibold hover:underline line-clamp-1">
            {currentSong.title}
          </a>
          <a href="#" className="text-spotify-text text-xs hover:underline hover:text-spotify-white line-clamp-1">
            {currentSong.artist}
          </a>
        </div>
        <button 
          onClick={() => toggleLike(currentSong)}
          className="text-spotify-text hover:text-spotify-white ml-2 transition-colors"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-spotify-green text-spotify-green' : ''}`} />
        </button>
      </div>

      {/* Main Player Controls */}
      <div className="flex-1 max-w-[722px] flex flex-col justify-center items-center px-4">
        <PlayerControls />
      </div>

      {/* Extra Controls (Volume, Devices) */}
      <div className="flex items-center justify-end gap-3 w-1/4 min-w-[180px] text-spotify-text">
        <button className="hover:text-spotify-white transition-colors">
          <PlaySquare className="w-4 h-4" />
        </button>
        <button className="hover:text-spotify-white transition-colors">
          <Mic2 className="w-4 h-4" />
        </button>
        <button className="hover:text-spotify-white transition-colors">
          <MonitorSpeaker className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-2 w-24 group">
          <button 
            className="hover:text-spotify-white transition-colors"
            onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <div className="h-1 bg-spotify-white/30 rounded-full w-full relative flex items-center group-hover:bg-spotify-white/50 cursor-pointer">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div 
              className="h-full bg-spotify-white group-hover:bg-spotify-green rounded-full pointer-events-none"
              style={{ width: `${volume * 100}%` }}
            ></div>
          </div>
        </div>

        <button className="hover:text-spotify-white transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
