import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

const formatTime = (time) => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const PlayerControls = () => {
  const {
    isPlaying,
    progress,
    duration,
    isShuffle,
    repeatMode,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    toggleShuffle,
    toggleRepeat
  } = usePlayer();

  const handleSeek = (e) => {
    const value = parseFloat(e.target.value);
    seek(value);
  };

  const repeatIconColor = repeatMode !== 'none' ? 'text-spotify-green' : 'text-spotify-text hover:text-spotify-white';
  const shuffleIconColor = isShuffle ? 'text-spotify-green' : 'text-spotify-text hover:text-spotify-white';

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center gap-6 mb-2">
        <button 
          onClick={toggleShuffle}
          className={`${shuffleIconColor} transition-colors`}
        >
          <Shuffle className="w-4 h-4" />
        </button>
        <button 
          onClick={playPrevious}
          className="text-spotify-text hover:text-spotify-white transition-colors"
        >
          <SkipBack className="w-5 h-5 fill-current" />
        </button>
        <button 
          onClick={togglePlay}
          className="bg-spotify-white text-black rounded-full p-2 hover:scale-105 transition-transform"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>
        <button 
          onClick={playNext}
          className="text-spotify-text hover:text-spotify-white transition-colors"
        >
          <SkipForward className="w-5 h-5 fill-current" />
        </button>
        <button 
          onClick={toggleRepeat}
          className={`${repeatIconColor} transition-colors relative`}
        >
          <Repeat className="w-4 h-4" />
          {repeatMode === 'one' && (
            <span className="absolute -top-1 -right-1 text-[8px] font-bold">1</span>
          )}
        </button>
      </div>

      <div className="w-full flex items-center gap-2 text-xs text-spotify-text">
        <span className="w-10 text-right">{formatTime(progress)}</span>
        
        <div className="flex-1 group h-1 bg-spotify-white/30 rounded-full relative flex items-center hover:bg-spotify-white/50 cursor-pointer">
          <input 
            type="range" 
            min="0" 
            max={duration || 100} 
            value={progress}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div 
            className="h-full bg-spotify-white group-hover:bg-spotify-green rounded-full pointer-events-none relative"
            style={{ width: `${(progress / duration) * 100 || 0}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-spotify-white rounded-full opacity-0 group-hover:opacity-100 shadow"></div>
          </div>
        </div>

        <span className="w-10 text-left">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default PlayerControls;
