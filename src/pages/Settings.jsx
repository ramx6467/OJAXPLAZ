import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../context/PreferencesContext';
import { 
  User, 
  Monitor, 
  Settings2, 
  LogOut,
  ChevronRight,
  Music,
} from 'lucide-react';

const SettingsSection = ({ title, icon: Icon, children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8"
  >
    <div className="flex items-center gap-3 mb-4 text-spotify-light">
      <Icon size={20} />
      <h2 className="text-xl font-bold text-spotify-white">{title}</h2>
    </div>
    <div className="bg-spotify-surface/30 border border-spotify-white/5 rounded-xl overflow-hidden">
      {children}
    </div>
  </motion.div>
);

const SettingItem = ({ title, description, action, border = true }) => (
  <div className={`p-4 flex items-center justify-between ${border ? 'border-b border-spotify-white/5' : ''}`}>
    <div className="flex-1 pr-4">
      <h3 className="text-spotify-white font-medium">{title}</h3>
      {description && <p className="text-sm text-spotify-light mt-1">{description}</p>}
    </div>
    <div className="flex-shrink-0">
      {action}
    </div>
  </div>
);

const Toggle = ({ isOn, onToggle }) => (
  <button 
    onClick={onToggle}
    className={`w-12 h-6 rounded-full transition-colors relative ${isOn ? 'bg-spotify-green' : 'bg-spotify-black/20 dark:bg-spotify-white/20'}`}
  >
    <motion.div 
      className="w-5 h-5 bg-spotify-white rounded-full absolute top-0.5 left-0.5"
      animate={{ x: isOn ? 24 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  </button>
);

const Settings = () => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');

  const handleEditClick = () => {
    setEditName(user?.name || '');
    setEditAvatar(user?.avatar || '');
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    updateProfile(editName, editAvatar);
    setIsEditing(false);
  };
  const { 
    theme, setTheme, 
    language, setLanguage,
    dataSaver, setDataSaver,
    normalizeVolume, setNormalizeVolume,
    gaplessPlayback, setGaplessPlayback,
    crossfade, setCrossfade,
    quality, setQuality
  } = usePreferences();

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <h1 className="text-3xl font-bold text-spotify-white mb-8">Settings</h1>

      <SettingsSection title="Account" icon={User}>
        <div className="p-6 border-b border-spotify-white/5">
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-3">
                  <img 
                    src={editAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'} 
                    alt="Profile Preview" 
                    className="w-20 h-20 rounded-full object-cover border border-spotify-white/10" 
                  />
                  <button 
                    onClick={() => document.getElementById('avatar-upload').click()}
                    className="px-3 py-1 bg-spotify-elevated rounded-full border border-spotify-white/10 text-xs font-bold text-spotify-white hover:bg-spotify-highlight transition-colors"
                  >
                    Choose from files
                  </button>
                  <input 
                    type="file" 
                    id="avatar-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setEditAvatar(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-spotify-light mb-1">Display Name</label>
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-spotify-black/20 border border-spotify-white/10 rounded px-3 py-2 text-sm text-spotify-white focus:border-spotify-green outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 text-spotify-white hover:text-spotify-light text-sm font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="px-4 py-1.5 bg-spotify-green text-black rounded-full text-sm font-bold hover:scale-105 transition-transform"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-spotify-surface flex items-center justify-center text-2xl font-bold text-spotify-white">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                )}
                <div>
                  <h3 className="text-spotify-white font-bold text-lg">{user?.name || 'Guest User'}</h3>
                  <p className="text-spotify-light">{user?.email || 'Not logged in'}</p>
                </div>
              </div>
              {user && (
                <button 
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-spotify-black/10 dark:bg-spotify-white/10 hover:bg-spotify-black/20 dark:hover:bg-spotify-white/20 text-spotify-white rounded-full font-bold transition-colors text-sm"
                >
                  Edit Profile
                </button>
              )}
            </div>
          )}
        </div>
        <SettingItem 
          title="Subscription" 
          description="You are currently on the Free plan."
          action={<button className="text-spotify-green font-bold hover:underline">UPGRADE</button>}
        />
        {user && (
          <SettingItem 
            title="Log Out" 
            action={
              <button onClick={logout} className="p-2 text-spotify-light hover:text-spotify-white transition-colors">
                <LogOut size={20} />
              </button>
            }
            border={false}
          />
        )}
      </SettingsSection>

      <SettingsSection title="Playback" icon={Settings2}>
        <SettingItem 
          title="Gapless Playback" 
          description="Allows seamless transitions between songs."
          action={<Toggle isOn={gaplessPlayback} onToggle={() => setGaplessPlayback(!gaplessPlayback)} />}
        />
        <SettingItem 
          title="Normalize Volume" 
          description="Set the same volume level for all songs."
          action={<Toggle isOn={normalizeVolume} onToggle={() => setNormalizeVolume(!normalizeVolume)} />}
        />
        <div className="p-4 border-b border-spotify-white/5">
          <div className="flex justify-between mb-2">
            <h3 className="text-spotify-white font-medium">Crossfade ({crossfade}s)</h3>
          </div>
          <input 
            type="range" 
            min="0" 
            max="12" 
            value={crossfade} 
            onChange={(e) => setCrossfade(parseInt(e.target.value))}
            className="w-full accent-spotify-green"
          />
        </div>
      </SettingsSection>

      <SettingsSection title="Audio Quality" icon={Music}>
        <SettingItem 
          title="Streaming Quality" 
          description="Higher quality uses more data."
          action={
            <select 
              value={quality} 
              onChange={(e) => setQuality(e.target.value)}
              className="bg-spotify-base border border-black/10 dark:border-spotify-white/10 text-spotify-white rounded-md px-3 py-1.5 outline-none focus:border-spotify-light"
            >
              <option value="low">Low (24kbps)</option>
              <option value="normal">Normal (96kbps)</option>
              <option value="high">High (160kbps)</option>
              <option value="very_high">Very High (320kbps)</option>
            </select>
          }
        />
        <SettingItem 
          title="Data Saver" 
          description="Sets your audio quality to low and disables canvases."
          action={<Toggle isOn={dataSaver} onToggle={() => setDataSaver(!dataSaver)} />}
          border={false}
        />
      </SettingsSection>

      <SettingsSection title="Appearance & Content" icon={Monitor}>
        <SettingItem 
          title="Theme" 
          action={
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
              className="bg-spotify-base border border-black/10 dark:border-spotify-white/10 text-spotify-white rounded-md px-3 py-1.5 outline-none focus:border-spotify-light"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System Default</option>
            </select>
          }
        />
        <SettingItem 
          title="Content Language" 
          description="Used to fetch trending songs in Suggestions."
          action={
             <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-spotify-base border border-black/10 dark:border-spotify-white/10 text-spotify-white rounded-md px-3 py-1.5 outline-none focus:border-spotify-light"
            >
              <option value="telugu">Telugu</option>
              <option value="english">English</option>
              <option value="tamil">Tamil</option>
              <option value="kannada">Kannada</option>
              <option value="malayalam">Malayalam</option>
              <option value="punjabi">Punjabi</option>
              <option value="bengali">Bengali</option>
            </select>
          }
          border={false}
        />
      </SettingsSection>
    </div>
  );
};

export default Settings;
