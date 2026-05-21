import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Search from './pages/Search';
import Library from './pages/Library';
import Favorites from './pages/Favorites';
import PlaylistDetail from './pages/PlaylistDetail';
import Artists from './pages/Artists';
import ArtistDetail from './pages/ArtistDetail';
import Settings from './pages/Settings';
import Suggestions from './pages/Suggestions';
import { AuthProvider } from './context/AuthContext';
import { PreferencesProvider } from './context/PreferencesContext';
import { PlayerProvider } from './context/PlayerContext';
import { LibraryProvider } from './context/LibraryContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';

const DummyPage = ({ title }) => (
  <div className="flex items-center justify-center h-full text-spotify-white text-2xl font-bold">
    {title} Page coming soon...
  </div>
);

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1234567890-placeholder.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <PreferencesProvider>
        <AuthProvider>
          <LibraryProvider>
          <PlayerProvider>
            <Router basename={import.meta.env.BASE_URL}>
              <Routes>
                {/* Auth route only accessible to non-logged in users */}
                <Route 
                  path="/auth" 
                  element={
                    <PublicRoute>
                      <Auth />
                    </PublicRoute>
                  } 
                />
                
                {/* Application routes only accessible to logged in users */}
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="search" element={<Search />} />
                  <Route path="library" element={<Library />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="artists" element={<Artists />} />
                  <Route path="artist/:name" element={<ArtistDetail />} />
                  <Route path="playlist/:id" element={<PlaylistDetail />} />
                  <Route path="profile" element={<DummyPage title="Profile" />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="suggestions" element={<Suggestions />} />
                </Route>
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </PlayerProvider>
          </LibraryProvider>
        </AuthProvider>
      </PreferencesProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

