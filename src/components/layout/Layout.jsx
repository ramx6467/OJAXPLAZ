import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MusicPlayer from '../player/MusicPlayer';
import { usePlayer } from '../../context/PlayerContext';
import { usePreferences } from '../../context/PreferencesContext';

const Layout = () => {
  const { currentSong } = usePlayer();
  const { dataSaver } = usePreferences();

  return (
    <div className="flex flex-col h-screen bg-spotify-black">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <div className={`flex-1 flex flex-col bg-spotify-base rounded-lg mt-2 mr-2 overflow-hidden ${!dataSaver ? 'bg-gradient-to-b from-spotify-elevated/40 to-spotify-base' : ''}`}>
          <Topbar />
          
          <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <Outlet />
          </main>
        </div>
      </div>
      
      {/* Player spacer - height depends on whether song is playing */}
      <div className={`${currentSong ? 'h-24' : 'h-0'} transition-all duration-300 flex-shrink-0 bg-spotify-black`} />
      
      <MusicPlayer />
    </div>
  );
};

export default Layout;
