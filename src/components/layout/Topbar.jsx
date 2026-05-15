import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const isHome = location.pathname === '/';

  return (
    <header className="h-16 flex items-center justify-between px-6 sticky top-0 bg-spotify-base/90 backdrop-blur-md z-40 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-1 rounded-full bg-spotify-black/50 hover:bg-spotify-black/80 text-spotify-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => navigate(1)}
          className="p-1 rounded-full bg-spotify-black/50 hover:bg-spotify-black/80 text-spotify-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {isHome && (
        <h2 className="text-2xl font-bold text-spotify-white absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          {getGreeting()}
        </h2>
      )}

      <div className="flex items-center gap-4 relative">
        {!isAuthenticated ? (
          <>
            <button 
              onClick={() => navigate('/auth?mode=signup')}
              className="text-spotify-text hover:text-spotify-white font-semibold transition-colors"
            >
              Sign up
            </button>
            <button 
              onClick={() => navigate('/auth?mode=login')}
              className="bg-spotify-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            >
              Log in
            </button>
          </>
        ) : (
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-spotify-black hover:bg-spotify-highlight p-[2px] pr-3 rounded-full text-spotify-white transition-colors"
            >
              <img 
                src={user.avatar} 
                alt="Avatar" 
                className="w-7 h-7 rounded-full"
              />
              <span className="font-semibold text-sm">{user.name}</span>
              <User className="w-4 h-4 ml-1" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-spotify-highlight rounded-md shadow-lg py-1 z-50 border border-spotify-white/10">
                <button 
                  className="block px-4 py-2 text-sm text-spotify-white/90 hover:bg-spotify-white/10 w-full text-left"
                  onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                >
                  Profile
                </button>
                <button 
                  className="block px-4 py-2 text-sm text-spotify-white/90 hover:bg-spotify-white/10 w-full text-left"
                  onClick={() => { setDropdownOpen(false); navigate('/settings'); }}
                >
                  Settings
                </button>
                <hr className="border-spotify-white/10 my-1" />
                <button 
                  className="block px-4 py-2 text-sm text-spotify-white/90 hover:bg-spotify-white/10 w-full text-left"
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                    navigate('/');
                  }}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
