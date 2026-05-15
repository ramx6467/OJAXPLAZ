import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { motion, AnimatePresence } from 'framer-motion';

const AddToPlaylistModal = ({ isOpen, onClose, song }) => {
  const { customPlaylists, createPlaylist, addSongToPlaylist } = useLibrary();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  if (!isOpen || !song) return null;

  const handleCreateAndAdd = () => {
    if (!newPlaylistName.trim()) return;
    const newPlaylist = createPlaylist(newPlaylistName.trim());
    addSongToPlaylist(song, newPlaylist.id);
    setNewPlaylistName('');
    setIsCreating(false);
    onClose();
  };

  const handleAddToExisting = (playlistId) => {
    addSongToPlaylist(song, playlistId);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-spotify-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-spotify-elevated w-full max-w-md rounded-xl shadow-2xl border border-spotify-white/10 overflow-hidden"
        >
          <div className="p-4 border-b border-spotify-white/10 flex items-center justify-between">
            <h2 className="text-xl font-bold text-spotify-white">Add to Playlist</h2>
            <button onClick={onClose} className="text-spotify-text hover:text-spotify-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {isCreating ? (
              <div className="flex items-center gap-2 mb-4">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="New Playlist Name" 
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="flex-1 bg-spotify-white/10 border border-transparent focus:border-spotify-green rounded px-3 py-2 text-spotify-white outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateAndAdd()}
                />
                <button 
                  onClick={handleCreateAndAdd}
                  className="bg-spotify-green text-black px-4 py-2 rounded font-bold hover:scale-105 transition-transform"
                >
                  Save
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-4 w-full p-3 hover:bg-spotify-white/10 rounded-md transition-colors text-spotify-white font-semibold mb-2"
              >
                <div className="bg-spotify-white/20 p-2 rounded-md">
                  <Plus className="w-6 h-6" />
                </div>
                Create New Playlist
              </button>
            )}

            <div className="space-y-1">
              {customPlaylists.map(playlist => {
                const hasSong = playlist.songs.some(s => s.id === song.id);
                return (
                  <button 
                    key={playlist.id}
                    onClick={() => !hasSong && handleAddToExisting(playlist.id)}
                    disabled={hasSong}
                    className={`flex items-center gap-4 w-full p-3 rounded-md transition-colors text-left ${hasSong ? 'opacity-50 cursor-not-allowed' : 'hover:bg-spotify-white/10'}`}
                  >
                    <img src={playlist.coverUrl} alt="" className="w-10 h-10 rounded shadow object-cover" />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-spotify-white font-semibold truncate">{playlist.title}</p>
                      <p className="text-xs text-spotify-text truncate">{playlist.songs.length} songs</p>
                    </div>
                    {hasSong && <span className="text-xs text-spotify-green font-bold">Added</span>}
                  </button>
                );
              })}
              {customPlaylists.length === 0 && !isCreating && (
                <p className="text-center text-spotify-text py-4 text-sm">You haven't created any playlists yet.</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddToPlaylistModal;
