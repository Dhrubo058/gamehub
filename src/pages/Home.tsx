import React, { useState, useEffect } from 'react';
import gamesData from '../data/games.json';
import { Hero } from '../components/Hero';
import { GameCard } from '../components/GameCard';
import { motion } from 'motion/react';
import { ChevronRight, Sword, Target, LayoutGrid, Database, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [romStatus, setRomStatus] = useState<{ availableRoms: string[], biosReady: boolean }>({ availableRoms: [], biosReady: false });

  useEffect(() => {
    fetch('/api/roms/status')
      .then(res => res.json())
      .then(data => setRomStatus(data))
      .catch(err => console.error('Failed to fetch ROM status', err));
  }, []);

  const fightingGames = gamesData.filter(g => g.category === "Fighting");
  const runAndGun = gamesData.filter(g => g.category === "Run and Gun");
  const classics = gamesData.filter(g => g.category === "Arcade Classics");

  return (
    <div className="pb-20">
      <Hero />
      
      {/* System Status Bar */}
      <div className="bg-neogeo-blue/10 border-y border-neogeo-blue/20 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-neogeo-blue" />
              <span className="font-pixel text-[8px] text-gray-400">SYSTEM STATUS:</span>
            </div>
            <div className="flex items-center gap-4">
              <StatusBadge label="BIOS" active={romStatus.biosReady} />
              <StatusBadge label="ROMS" active={romStatus.availableRoms.length > 0} count={romStatus.availableRoms.length} />
            </div>
          </div>
          <div className="hidden md:block font-pixel text-[8px] text-neogeo-blue animate-pulse">
            READY FOR 24-BIT ACTION
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-32 mt-24">
        {/* Fighting Section */}
        <section>
          <SectionHeader title="FIGHTING CHAMPS" icon={<Sword className="text-neogeo-red" />} color="neogeo-red" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {fightingGames.map((game, idx) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </section>

        {/* Run and Gun Section */}
        <section>
          <SectionHeader title="RUN & GUN" icon={<Target className="text-retro-neon-cyan" />} color="retro-neon-cyan" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {runAndGun.map((game, idx) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </section>

        {/* Sports Section */}
        <section>
          <SectionHeader title="SPORTS ARENA" icon={<LayoutGrid className="text-neogeo-blue" />} color="neogeo-blue" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {gamesData.filter(g => g.category === "Sports").map((game, idx) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </section>

        {/* Puzzle Section */}
        <section>
          <SectionHeader title="PUZZLE MANIA" icon={<LayoutGrid className="text-neogeo-yellow" />} color="neogeo-yellow" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {gamesData.filter(g => g.category === "Puzzle").map((game, idx) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </section>

        {/* Beat 'em up Section */}
        <section>
          <SectionHeader title="BEAT 'EM UP" icon={<Sword className="text-neogeo-red" />} color="neogeo-red" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {gamesData.filter(g => g.category === "Beat 'em up").map((game, idx) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </section>

        {/* Classics Section */}
        <section>
          <SectionHeader title="ARCADE CLASSICS" icon={<LayoutGrid className="text-neogeo-yellow" />} color="neogeo-yellow" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {classics.map((game, idx) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const StatusBadge = ({ label, active, count }: { label: string, active: boolean, count?: number }) => (
  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${active ? 'border-green-500/30 bg-green-500/10 text-green-500' : 'border-red-500/30 bg-red-500/10 text-red-500'} transition-all`}>
    {active ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
    <span className="font-pixel text-[8px]">{label} {count !== undefined && `(${count})`}</span>
  </div>
);

const SectionHeader = ({ title, icon, color }: { title: string, icon: React.ReactNode, color: string }) => (
  <div className="flex items-center justify-between mb-12 border-b-2 border-white/10 pb-4">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
      <h2 className="text-xl md:text-2xl font-pixel">{title}</h2>
    </div>
    <Link to="/browse" className="text-[8px] font-pixel text-gray-500 hover:text-white flex items-center gap-2 transition-colors">
      VIEW ALL <ChevronRight className="w-3 h-3" />
    </Link>
  </div>
);
