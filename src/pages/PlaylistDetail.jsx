import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import { usePlayer } from '../context/PlayerContext';
import { Play, Trash2, ArrowLeft } from 'lucide-react';
import SongCard from '../components/ui/SongCard';

const PlaylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customPlaylists, deletePlaylist, removeSongFromPlaylist } = useLibrary();
  const { playSong } = usePlayer();

  const playlist = customPlaylists.find(p => p.id === id);

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-spotify-white">
        <h2 className="text-2xl font-bold mb-4">Playlist not found</h2>
        <button onClick={() => navigate('/library')} className="bg-spotify-white text-black px-6 py-2 rounded-full font-bold">
          Go back to Library
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if(window.confirm('Are you sure you want to delete this playlist?')) {
      deletePlaylist(playlist.id);
      navigate('/library');
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

      <div className="flex items-end gap-6 mb-8">
        <img 
          src={playlist.coverUrl} 
          alt={playlist.title}
          className="w-48 h-48 rounded shadow-2xl object-cover"
        />
        <div className="flex-1">
          <p className="text-sm font-bold uppercase mb-2">Playlist</p>
          <h1 className="text-5xl md:text-7xl font-bold text-spotify-white mb-4 tracking-tighter">
            {playlist.title}
          </h1>
          <p className="text-spotify-text mb-2">{playlist.description}</p>
          <div className="flex items-center gap-2 text-sm text-spotify-text">
            <span className="font-bold text-spotify-white">You</span>
            <span>•</span>
            <span>{playlist.songs.length} songs</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <button 
          onClick={() => playlist.songs.length > 0 && playSong(playlist.songs[0], playlist.songs)}
          disabled={playlist.songs.length === 0}
          className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-xl disabled:opacity-50 disabled:hover:scale-100"
        >
          <Play className="w-6 h-6 fill-current ml-1" />
        </button>
        <button 
          onClick={handleDelete}
          className="text-spotify-text hover:text-red-500 transition-colors"
          title="Delete Playlist"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>

      {playlist.songs.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {playlist.songs.map((song, idx) => (
            <div key={song.id} className="relative group">
              <SongCard song={song} index={idx} songsContext={playlist.songs} />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeSongFromPlaylist(song.id, playlist.id);
                }}
                className="absolute top-2 left-2 z-10 bg-spotify-black/50 text-spotify-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500/80 transition-all backdrop-blur-sm"
                title="Remove from playlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-spotify-text">
          <div className="text-4xl mb-4">💿</div>
          <h3 className="text-xl text-spotify-white font-bold mb-2">It's a bit empty here...</h3>
          <p>Let's find some songs for your playlist.</p>
          <button 
            onClick={() => navigate('/search')}
            className="mt-6 bg-spotify-white text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Find songs
          </button>
        </div>
      )}
    </div>
  );
};

export default PlaylistDetail;
