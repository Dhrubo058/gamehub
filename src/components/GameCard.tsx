import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, CheckCircle2 } from 'lucide-react';

interface Game {
  name: string;
  slug: string;
  system: string;
  category: string;
  rom: string;
  cover: string;
}

export const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetch('/api/roms/status')
      .then(res => res.json())
      .then(data => {
        const filename = game.rom.split('/').pop();
        setIsReady(data.availableRoms.includes(filename));
      })
      .catch(() => setIsReady(false));
  }, [game.rom]);

  return (
    <div
      className={`group relative bg-retro-card border-2 transition-all duration-300 rounded-lg overflow-hidden shadow-lg ${isReady ? 'border-green-500/20 hover:border-green-500' : 'border-white/5 hover:border-neogeo-yellow'} hover:scale-105 hover:z-20`}
    >
      <Link to={`/play/${game.slug}`}>
        <div className="aspect-square relative overflow-hidden bg-black">
          <img
            src={game.cover}
            alt={game.name}
            className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x200/121212/ffffff?text=${encodeURIComponent(game.name)}`;
            }}
          />
          
          {isReady && (
            <div className="absolute top-2 right-2 z-10">
              <div className="bg-green-500 text-black font-pixel text-[6px] px-2 py-1 rounded-sm flex items-center gap-1 shadow-lg">
                <CheckCircle2 className="w-2 h-2" /> READY
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
             <div className={`px-3 py-1 text-white font-pixel text-[8px] shadow-lg ${isReady ? 'bg-green-600' : 'bg-neogeo-red'}`}>
                {isReady ? 'START' : 'SELECT'}
             </div>
          </div>
        </div>
        
        <div className="p-3 bg-black/60 border-t border-white/5">
          <h3 className={`text-[8px] font-pixel truncate transition-colors text-center ${isReady ? 'text-green-400 group-hover:text-green-300' : 'text-white group-hover:text-neogeo-yellow'}`}>
            {game.name}
          </h3>
        </div>
      </Link>
    </div>
  );
};
