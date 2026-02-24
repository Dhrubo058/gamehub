import React, { useState, useMemo, useEffect } from "react";
import { GameCard } from "../components/GameCard";
import { Search } from "lucide-react";

export const Browse = () => {
  const [games, setGames] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch('/games.json')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error('Failed to fetch games', err));
  }, []);

  const categories = useMemo(() => {
    const cats = games.map(g => g.category);
    return ["All", ...Array.from(new Set(cats))];
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || game.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category, games]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
        <div className="flex-grow max-w-2xl">
          <h1 className="text-4xl mb-8 font-pixel">GAME LIBRARY</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6" />
            <input
              type="text"
              placeholder="SEARCH ROMS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border-2 border-white/10 rounded-none py-5 pl-14 pr-4 font-pixel text-xs focus:outline-none focus:border-neogeo-red transition-colors"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-6">
          <div className="space-y-3">
            <label className="text-[8px] font-pixel text-gray-500 ml-1">CATEGORY</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-black border-2 border-white/10 rounded-none px-6 py-4 font-pixel text-[10px] focus:outline-none focus:border-neogeo-yellow"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredGames.map(game => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center">
          <p className="font-pixel text-gray-500 text-sm">NO ROMS FOUND IN ARCHIVE</p>
        </div>
      )}
    </div>
  );
};
