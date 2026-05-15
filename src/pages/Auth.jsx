import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get('mode') || 'login';
  
  const [isLogin, setIsLogin] = useState(modeParam === 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setIsLoading(true);
    try {
      // Decode the JWT token sent securely by Google
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email, picture } = decoded;

      // Establish session with real Google user data
      await signup(name, email, 'google_oauth_dummy', picture);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Google Authentication Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google Sign-In was unsuccessful. Try again.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-spotify-black flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-spotify-elevated rounded-xl p-8 shadow-2xl border border-spotify-white/10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-spotify-green text-4xl">♪</span>
            <h1 className="text-3xl font-bold text-spotify-white">OJAXPLAZ</h1>
          </div>
          <p className="text-spotify-text text-sm">
            {isLogin ? 'Log in to continue' : 'Sign up for free to start listening'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <div className="w-full flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            shape="pill"
            theme="filled_black"
            size="large"
            text={isLogin ? 'signin_with' : 'signup_with'}
            width="100%"
          />
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-spotify-white/10"></div>
          <span className="text-sm text-spotify-text">or</span>
          <div className="flex-1 h-px bg-spotify-white/10"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-spotify-white mb-2">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-spotify-text w-5 h-5" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-spotify-highlight border border-transparent focus:border-spotify-green focus:bg-spotify-white/10 rounded px-10 py-3 text-spotify-white outline-none transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-spotify-white mb-2">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-spotify-text w-5 h-5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-spotify-highlight border border-transparent focus:border-spotify-green focus:bg-spotify-white/10 rounded px-10 py-3 text-spotify-white outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-spotify-white mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-spotify-text w-5 h-5" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-spotify-highlight border border-transparent focus:border-spotify-green focus:bg-spotify-white/10 rounded px-10 py-3 text-spotify-white outline-none transition-colors"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-spotify-green text-black font-bold py-3 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 mt-6"
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : (isLogin ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-spotify-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-spotify-white font-bold hover:underline hover:text-spotify-green"
          >
            {isLogin ? 'Sign up for Spotify' : 'Log in here'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
