import React, { useState, useEffect } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { fetchTrendingSongsByLanguage } from '../services/spotifyApi';
import SongCard from '../components/ui/SongCard';
import { SkeletonGrid } from '../components/ui/Skeleton';
import { Sparkles } from 'lucide-react';

const Suggestions = () => {
  const { language } = usePreferences();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSuggestions = async () => {
      setLoading(true);
      try {
        // Fetch top songs strictly for the chosen language and current year
        const fetchedSongs = await fetchTrendingSongsByLanguage(language, 100);
        setSongs(fetchedSongs);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSuggestions();
  }, [language]); // Re-run when the language preference changes

  return (
    <div className="pb-8">
      <div className="flex items-center gap-3 mb-8 border-b border-spotify-white/10 pb-4">
        <Sparkles className="w-8 h-8 text-spotify-green" />
        <h1 className="text-3xl font-bold text-spotify-white capitalize">
          Trending in {language}
        </h1>
      </div>

      <section>
        {loading ? (
          <SkeletonGrid count={20} />
        ) : songs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {songs.map((song, idx) => (
              <SongCard key={song.id} song={song} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center text-spotify-light mt-12">
            <p className="text-xl">No trending songs found for {language} right now.</p>
            <p className="text-sm mt-2">Try checking back later or select a different language in Settings.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Suggestions;
