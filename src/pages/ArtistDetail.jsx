import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { fetchTopSongsByArtist } from '../services/spotifyApi';
import SongCard from '../components/ui/SongCard';
import { SkeletonGrid } from '../components/ui/Skeleton';
import { usePlayer } from '../context/PlayerContext';
import { heroCategories } from '../data/heroes';

const ArtistDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { playSong } = usePlayer();
  
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroInfo, setHeroInfo] = useState(null);

  useEffect(() => {
    // Find the hero image from our database if it exists
    let foundImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=512`;
    let foundPosition = 'center';
    let foundSearchQuery = name;
    
    for (const cat of heroCategories) {
      const hero = cat.heroes.find(h => h.name.toLowerCase() === name.toLowerCase());
      if (hero) {
        foundImage = hero.imageUrl.replace('size=256', 'size=512');
        foundPosition = hero.imagePosition || 'center';
        foundSearchQuery = hero.searchQuery || name;
        break;
      }
    }
    
    setHeroInfo({ name, imageUrl: foundImage, imagePosition: foundPosition });

    const loadSongs = async () => {
      setLoading(true);
      try {
        // Fetch top 50 songs associated with this hero's search query
        const tracks = await fetchTopSongsByArtist(foundSearchQuery, 50);
        setSongs(tracks);
      } catch (error) {
        console.error("Error fetching artist songs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, [name]);

  const handlePlayAll = () => {
    if (songs.length > 0) {
      playSong(songs[0], songs);
    }
  };

  return (
    <div className="pb-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-spotify-text hover:text-spotify-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {heroInfo && (
        <div className="flex items-end gap-6 mb-8 mt-4">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl flex-shrink-0">
            <img 
              src={heroInfo.imageUrl} 
              alt={heroInfo.name} 
              className="w-full h-full object-cover"
              style={{ objectPosition: heroInfo.imagePosition }}
            />
          </div>
          <div className="flex-1 pb-4">
            <p className="text-sm font-bold uppercase mb-2">Artist / Actor</p>
            <h1 className="text-5xl md:text-7xl font-bold text-spotify-white mb-6 tracking-tighter">
              {heroInfo.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-spotify-text">
              <span className="font-bold text-spotify-white">Popular Tracks</span>
              <span>•</span>
              <span>{songs.length} songs</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-6 mb-8">
        <button 
          onClick={handlePlayAll}
          disabled={songs.length === 0}
          className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-xl disabled:opacity-50 disabled:hover:scale-100"
        >
          <Play className="w-6 h-6 fill-current ml-1" />
        </button>
      </div>

      {loading ? (
        <SkeletonGrid count={10} />
      ) : songs.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {songs.map((song, idx) => (
            <SongCard key={song.id} song={song} index={idx} songsContext={songs} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-spotify-text">
          <div className="text-4xl mb-4">🎤</div>
          <h3 className="text-xl text-spotify-white font-bold mb-2">No songs found</h3>
          <p>We couldn't find any tracks associated with {name}.</p>
        </div>
      )}
    </div>
  );
};

export default ArtistDetail;
