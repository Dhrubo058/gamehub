import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b-8 border-neogeo-red">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-neogeo-red/10 to-transparent blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-black border-2 border-neogeo-yellow text-neogeo-yellow font-pixel text-[10px] shadow-[4px_4px_0px_#e60012]">
            <Zap className="w-4 h-4 fill-current" />
            INSERT COIN TO START
          </div>
          
          <h1 className="text-4xl md:text-8xl font-pixel leading-tight text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            NEO•GEO <br />
            <span className="text-neogeo-red">MVS</span> SYSTEM
          </h1>
          
          <p className="text-gray-400 font-pixel text-[10px] md:text-xs max-w-2xl mx-auto leading-loose tracking-widest">
            THE ULTIMATE 24-BIT ARCADE EXPERIENCE. <br />
            PIXEL PERFECT EMULATION DIRECTLY IN YOUR BROWSER.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <Link to="/browse">
              <button className="neon-btn neon-btn-red px-12 py-5 text-sm">
                BROWSE GAMES
              </button>
            </Link>
            <Link to="/play/metal-slug">
              <button className="neon-btn neon-btn-cyan px-12 py-5 text-sm">
                QUICK START
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Side Cabinet Graphics */}
      <div className="absolute left-0 top-0 bottom-0 w-24 hidden xl:block cabinet-side opacity-40" />
      <div className="absolute right-0 top-0 bottom-0 w-24 hidden xl:block cabinet-side opacity-40 scale-x-[-1]" />
    </section>
  );
};
