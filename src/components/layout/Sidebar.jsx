import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart, Users, Sparkles } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';

const Sidebar = () => {
  const { createPlaylist, customPlaylists } = useLibrary();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Search', icon: Search, path: '/search' },
    { name: 'Your Library', icon: Library, path: '/library' },
    { name: 'Artists', icon: Users, path: '/artists' },
    { name: 'Suggestions', icon: Sparkles, path: '/suggestions' },
  ];

  const handleCreatePlaylist = () => {
    const name = window.prompt("Enter new playlist name:");
    if (name && name.trim() !== "") {
      const newPlaylist = createPlaylist(name.trim());
      navigate(`/playlist/${newPlaylist.id}`);
    }
  };

  return (
    <div className="w-64 bg-spotify-black flex-shrink-0 flex flex-col h-full text-spotify-text transition-colors duration-300">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-spotify-white flex items-center gap-2 mb-8">
          <span className="text-spotify-green text-3xl">♪</span>
          OJAXPLAZ
        </h1>
        
        <nav className="space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-4 text-sm font-semibold transition-colors duration-200 ${
                  isActive ? 'text-spotify-white' : 'hover:text-spotify-white'
                }`
              }
            >
              <link.icon className="w-6 h-6" />
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-4 px-6 space-y-4">
        <button 
          onClick={handleCreatePlaylist}
          className="flex items-center gap-4 text-sm font-semibold hover:text-spotify-white transition-colors duration-200 w-full"
        >
          <PlusSquare className="w-6 h-6" />
          Create Playlist
        </button>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex items-center gap-4 text-sm font-semibold transition-colors duration-200 ${
              isActive ? 'text-spotify-white' : 'hover:text-spotify-white'
            }`
          }
        >
          <Heart className="w-6 h-6" />
          Liked Songs
        </NavLink>
      </div>

      <div className="mt-4 px-6 flex-1 overflow-y-auto custom-scrollbar border-t border-spotify-white/10 pt-4">
        <ul className="space-y-3">
          {customPlaylists.map(playlist => (
            <li 
              key={playlist.id}
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              className="text-sm hover:text-spotify-white cursor-pointer truncate"
            >
              {playlist.title}
            </li>
          ))}
          {customPlaylists.length === 0 && (
            <li className="text-sm text-spotify-white/50 italic">No custom playlists yet</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
