import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Loader } from 'lucide-react';
import { searchSpotify } from '../services/spotifyApi';
import SongCard from '../components/ui/SongCard';
import PlaylistCard from '../components/ui/PlaylistCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ tracks: [], playlists: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults({ tracks: [], playlists: [] });
        return;
      }
      setLoading(true);
      try {
        const data = await searchSpotify(query);
        setResults(data);
      } catch (error) {
        console.error("Error searching:", error);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="pb-8">
      {/* Search Input */}
      <div className="relative mb-8 max-w-md">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
        <input 
          type="text" 
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-spotify-white text-black rounded-full py-3 px-12 focus:outline-none focus:ring-2 focus:ring-white border-none shadow-md"
        />
        {loading && <Loader className="absolute right-4 top-1/2 -translate-y-1/2 text-black w-5 h-5 animate-spin" />}
      </div>

      {query ? (
        <div className="space-y-8">
          {results.tracks.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-spotify-white mb-4">Songs</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.tracks.map((song, idx) => (
                  <SongCard key={song.id} song={song} index={idx} songsContext={results.tracks} />
                ))}
              </div>
            </section>
          )}
          
          {results.playlists.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-spotify-white mb-4">Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.playlists.map((playlist, idx) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} index={idx} />
                ))}
              </div>
            </section>
          )}

          {!loading && results.tracks.length === 0 && results.playlists.length === 0 && (
            <div className="text-center text-spotify-text py-20">
              <h3 className="text-xl font-bold text-spotify-white mb-2">No results found for "{query}"</h3>
              <p>Please make sure your words are spelled correctly or use less or different keywords.</p>
            </div>
          )}
        </div>
      ) : (
        <section>
          <h2 className="text-2xl font-bold text-spotify-white mb-6">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Dummy categories */}
            {['Podcasts', 'Live Events', 'Made For You', 'New Releases', 'Pop', 'Hip-Hop', 'Dance', 'Rock'].map((category, i) => (
              <div 
                key={i}
                onClick={() => setQuery(category)}
                className="bg-spotify-elevated rounded-xl p-4 aspect-square relative overflow-hidden group cursor-pointer border border-spotify-white/5 shadow-md hover:scale-[1.02] transition-transform"
                style={{ backgroundColor: `hsl(${i * 45}, 70%, 40%)` }}
              >
                <h3 className="font-bold text-spotify-white text-xl z-10 relative">{category}</h3>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-spotify-black/20 rounded-full group-hover:scale-110 transition-transform"></div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Search;
