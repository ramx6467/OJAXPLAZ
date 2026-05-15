import React, { useState, useEffect } from 'react';
import { getMyPlaylists } from '../services/spotifyApi';
import { dummyAlbums } from '../data/dummyMusic';
import PlaylistCard from '../components/ui/PlaylistCard';
import { SkeletonGrid } from '../components/ui/Skeleton';
import { useLibrary } from '../context/LibraryContext';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const [activeTab, setActiveTab] = useState('playlists');
  const [apiPlaylists, setApiPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { customPlaylists } = useLibrary();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const pLists = await getMyPlaylists();
        setApiPlaylists(pLists);
      } catch (error) {
        console.error("Error fetching library data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  const allPlaylists = [...customPlaylists, ...apiPlaylists];

  return (
    <div className="pb-8">
      <div className="flex items-center gap-6 mb-8 border-b border-spotify-white/10 pb-4">
        <button 
          onClick={() => setActiveTab('playlists')}
          className={`text-xl font-bold transition-colors ${activeTab === 'playlists' ? 'text-spotify-white' : 'text-spotify-text hover:text-spotify-white'}`}
        >
          Playlists
        </button>
        <button 
          onClick={() => setActiveTab('albums')}
          className={`text-xl font-bold transition-colors ${activeTab === 'albums' ? 'text-spotify-white' : 'text-spotify-text hover:text-spotify-white'}`}
        >
          Albums
        </button>
      </div>

      {activeTab === 'playlists' ? (
        <section>
          {loading ? <SkeletonGrid count={5} /> : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {allPlaylists.map((playlist, idx) => (
                <div key={playlist.id} onClick={() => {
                  if(customPlaylists.find(p => p.id === playlist.id)) {
                    navigate(`/playlist/${playlist.id}`);
                  }
                }}>
                  <PlaylistCard playlist={playlist} index={idx} />
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {dummyAlbums.map((album, idx) => (
              <PlaylistCard 
                key={album.id} 
                playlist={{...album, description: album.artist}} 
                index={idx} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Library;
