import React, { useState, useEffect } from 'react';
import { fetchSongsByTerm, getMyPlaylists } from '../services/spotifyApi';
import SongCard from '../components/ui/SongCard';
import PlaylistCard from '../components/ui/PlaylistCard';
import { SkeletonGrid } from '../components/ui/Skeleton';

const Home = () => {
  const [sections, setSections] = useState({
    recent: [],
    global: [],
    telugu: [],
    hindi: [],
    spanish: []
  });
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch 18 songs per category (15 for the main row + 3 for the Recent mix)
        const currentYear = new Date().getFullYear(); // 2026
        const [global, telugu, hindi, spanish, tamil, pLists] = await Promise.all([
          fetchSongsByTerm(`Top Hits ${currentYear}`, 18),
          fetchSongsByTerm(`Latest Telugu ${currentYear}`, 18),
          fetchSongsByTerm(`Bollywood ${currentYear}`, 18),
          fetchSongsByTerm(`Latin Hits ${currentYear}`, 18),
          fetchSongsByTerm(`Tamil ${currentYear}`, 3), // We only need 3 for the recent mix
          getMyPlaylists()
        ]);
        
        // Build a mixed language array for "Recent Songs" (15 songs total)
        const recentMix = [
          ...global.slice(15, 18),
          ...telugu.slice(15, 18),
          ...hindi.slice(15, 18),
          ...spanish.slice(15, 18),
          ...tamil.slice(0, 3)
        ].filter(Boolean); // Filter out any nulls

        setSections({ 
          recent: recentMix,
          global: global.slice(0, 15), 
          telugu: telugu.slice(0, 15), 
          hindi: hindi.slice(0, 15), 
          spanish: spanish.slice(0, 15) 
        });
        setPlaylists(pLists);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (title) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const renderSongSection = (title, songs, hideShowAll = false) => {
    if (!songs || songs.length === 0) return null;
    
    const isExpanded = expandedSections[title];
    const displayedSongs = isExpanded ? songs : songs.slice(0, 5);

    return (
      <section className="mb-8">
        <div className="flex items-end justify-between mb-4">
          <h2 
            className={`text-2xl font-bold text-spotify-white ${!hideShowAll && songs.length > 5 ? 'hover:underline cursor-pointer' : ''}`}
            onClick={() => !hideShowAll && songs.length > 5 && toggleExpand(title)}
          >
            {title}
          </h2>
          {!hideShowAll && songs.length > 5 && (
            <span 
              onClick={() => toggleExpand(title)}
              className="text-sm text-spotify-text hover:underline cursor-pointer font-bold transition-colors hover:text-spotify-white"
            >
              {isExpanded ? 'Show less' : 'Show all'}
            </span>
          )}
        </div>
        {loading ? <SkeletonGrid count={5} /> : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayedSongs.map((song, idx) => (
              <SongCard key={song.id} song={song} index={idx} songsContext={displayedSongs} />
            ))}
          </div>
        )}
      </section>
    );
  };

  const isPlaylistsExpanded = expandedSections['Your Playlists'];
  const displayedPlaylists = isPlaylistsExpanded ? playlists : playlists.slice(0, 5);

  return (
    <div className="pb-8">
      {renderSongSection("Recent Songs", sections.recent, false)}
      {renderSongSection("Trending Global Hits", sections.global)}
      {renderSongSection("Telugu Top Charts", sections.telugu)}
      
      {/* Featured Playlists Section */}
      {playlists.length > 0 && (
        <section className="mb-8">
          <div className="flex items-end justify-between mb-4">
            <h2 
              className={`text-2xl font-bold text-spotify-white ${playlists.length > 5 ? 'hover:underline cursor-pointer' : ''}`}
              onClick={() => playlists.length > 5 && toggleExpand('Your Playlists')}
            >
              Your Playlists
            </h2>
            {playlists.length > 5 && (
              <span 
                onClick={() => toggleExpand('Your Playlists')}
                className="text-sm text-spotify-text hover:underline cursor-pointer font-bold transition-colors hover:text-spotify-white"
              >
                {isPlaylistsExpanded ? 'Show less' : 'Show all'}
              </span>
            )}
          </div>
          {loading ? <SkeletonGrid count={5} /> : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {displayedPlaylists.map((playlist, idx) => (
                <PlaylistCard key={playlist.id} playlist={playlist} index={idx} />
              ))}
            </div>
          )}
        </section>
      )}

      {renderSongSection("Bollywood Essentials", sections.hindi)}
      {renderSongSection("Latin & Spanish Vibes", sections.spanish)}
    </div>
  );
};

export default Home;
