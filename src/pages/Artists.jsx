import React from 'react';
import { useNavigate } from 'react-router-dom';
import { heroCategories } from '../data/heroes';

const Artists = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-8">
      <h1 className="text-3xl font-bold text-spotify-white mb-8">Artists & Actors</h1>
      
      {heroCategories.map((category) => (
        <section key={category.id} className="mb-10">
          <h2 className="text-2xl font-bold text-spotify-white mb-6">{category.title}</h2>
          
          <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
            {category.heroes.map((hero) => (
              <div 
                key={hero.id} 
                className="flex flex-col items-center gap-3 cursor-pointer group flex-shrink-0 w-36"
                onClick={() => navigate(`/artist/${encodeURIComponent(hero.name)}`)}
              >
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300">
                  <img 
                    src={hero.imageUrl} 
                    alt={hero.name} 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: hero.imagePosition || 'center' }}
                  />
                </div>
                <h3 className="text-spotify-white font-semibold text-center text-sm group-hover:underline">
                  {hero.name}
                </h3>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Artists;
