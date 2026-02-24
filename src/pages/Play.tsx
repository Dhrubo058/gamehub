import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Maximize2, Info, ShieldAlert, Play as PlayIcon } from 'lucide-react';

export const Play = () => {
  const { gamename } = useParams();
  const [started, setStarted] = useState(false);
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/games.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((g: any) => g.slug === gamename);
        setGame(found);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch games', err);
        setLoading(false);
      });
  }, [gamename]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-pixel text-gray-500">
        LOADING VAULT...
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center font-pixel text-neogeo-red">
        GAME NOT FOUND IN VAULT
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/browse" className="flex items-center gap-3 text-gray-400 hover:text-white font-pixel text-[10px] transition-colors">
            <ArrowLeft className="w-4 h-4" /> BACK TO LIBRARY
          </Link>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-neogeo-red text-white font-pixel text-[8px] animate-pulse">
              LIVE EMULATION
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 space-y-8">
            {/* Emulator Container */}
            <div className="arcade-panel p-2 rounded-sm aspect-video relative bg-black overflow-hidden">
               {!started ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/80">
                   <img 
                     src={game.cover} 
                     alt={game.name} 
                     className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
                     referrerPolicy="no-referrer"
                   />
                   <button 
                     onClick={() => setStarted(true)}
                     className="neon-btn neon-btn-red flex items-center gap-4 z-20"
                   >
                     <PlayIcon className="w-6 h-6 fill-current" />
                     START SYSTEM
                   </button>
                   <p className="mt-6 font-pixel text-[8px] text-gray-500 tracking-widest">
                     INITIALIZING 24-BIT ARCHITECTURE
                   </p>
                 </div>
               ) : (
                 <iframe 
                   src={`/emulator/index.html?game=${game.slug}`}
                   className="w-full h-full border-none"
                   allowFullScreen
                   title={game.name}
                 />
               )}
            </div>

            <div className="flex items-center justify-between bg-retro-card p-6 border-l-4 border-neogeo-yellow">
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-[8px] font-pixel text-gray-500 mb-1">SYSTEM</span>
                  <span className="text-[10px] font-pixel text-white">{game.system.toUpperCase()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-pixel text-gray-500 mb-1">CORE</span>
                  <span className="text-[10px] font-pixel text-white">ARCADE / FBNEO</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    const iframe = document.querySelector('iframe');
                    if (iframe) iframe.requestFullscreen();
                  }}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Maximize2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-retro-card border-t-4 border-neogeo-blue p-8">
              <h3 className="font-pixel text-[10px] text-neogeo-blue mb-6">GAME PROFILE</h3>
              <div className="aspect-[3/4] mb-6 border-2 border-white/10">
                <img src={game.cover} className="w-full h-full object-cover" alt={game.name} />
              </div>
              <h2 className="font-pixel text-sm mb-4 leading-relaxed">{game.name}</h2>
              <p className="text-[8px] font-pixel text-gray-500 uppercase tracking-widest leading-loose">
                {game.category}
              </p>
            </div>

            <div className="bg-retro-card border-t-4 border-neogeo-yellow p-8">
              <h3 className="font-pixel text-[10px] text-neogeo-yellow mb-6">TROUBLESHOOTING</h3>
              <div className="space-y-4 text-[8px] font-pixel text-gray-400 leading-loose">
                <p className="text-white">BLACK SCREEN?</p>
                <p>1. Ensure ROM exists at: <br/><code className="text-neogeo-cyan break-all">{game.rom}</code></p>
                <p>2. Ensure BIOS exists at: <br/><code className="text-neogeo-cyan break-all">/bios/neogeo.zip</code></p>
                <p>3. Check browser console (F12) for 404 errors.</p>
                <p className="text-neogeo-red">NOTE: You must manually place your legal ROM backups in the server's public folder.</p>
              </div>
            </div>

            <div className="bg-retro-card border-t-4 border-gray-700 p-8">
              <h3 className="font-pixel text-[10px] text-gray-500 mb-6">CONTROLS</h3>
              <div className="space-y-4 font-pixel text-[8px] text-gray-400">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>MOVE</span>
                  <span className="text-white">ARROWS</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>BUTTON A</span>
                  <span className="text-white">Z</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>BUTTON B</span>
                  <span className="text-white">X</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>START</span>
                  <span className="text-white">ENTER</span>
                </div>
                <div className="flex justify-between">
                  <span>COIN</span>
                  <span className="text-white">SHIFT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
