import React from 'react';
import { motion } from 'framer-motion';

export const CardSkeleton = () => {
  return (
    <div className="bg-spotify-elevated/20 p-4 rounded-md">
      <div className="relative mb-4 pb-[100%] rounded-md overflow-hidden bg-spotify-white/5 animate-pulse"></div>
      <div className="h-4 bg-spotify-white/10 rounded w-3/4 mb-2 animate-pulse"></div>
      <div className="h-3 bg-spotify-white/10 rounded w-1/2 animate-pulse"></div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 5 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};
