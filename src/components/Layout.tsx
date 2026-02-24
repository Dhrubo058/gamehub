import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Search, Info, ShieldAlert } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-black border-b-4 border-neogeo-red sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-neogeo-red flex items-center justify-center rounded-sm rotate-3 shadow-[4px_4px_0px_#fff100]">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-pixel text-lg leading-none text-white">NEO•GEO</span>
              <span className="font-pixel text-[8px] text-neogeo-yellow tracking-[0.2em]">ARCADE VAULT</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/" active={location.pathname === '/'}>HOME</NavLink>
            <NavLink to="/browse" active={location.pathname === '/browse'}>LIBRARY</NavLink>
            <NavLink to="/disclaimer" active={location.pathname === '/disclaimer'}>LEGAL</NavLink>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-white hover:text-neogeo-yellow transition-colors">
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, active }: { to: string, children: React.ReactNode, active: boolean }) => (
  <Link 
    to={to} 
    className={`font-pixel text-[10px] tracking-widest transition-colors ${
      active ? 'text-neogeo-yellow' : 'text-gray-400 hover:text-white'
    }`}
  >
    {children}
  </Link>
);

export const Footer = () => (
  <footer className="bg-black border-t-4 border-neogeo-blue py-16 mt-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <div className="flex flex-col items-center md:items-start gap-4">
           <div className="font-pixel text-xl text-white">SNK <span className="text-neogeo-red">PLAYMORE</span></div>
           <p className="text-[10px] text-gray-500 font-pixel">THE FUTURE IS NOW</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-xs mb-4">
            &copy; 2026 RetroArcade Vault. All rights reserved.
          </p>
          <div className="flex justify-center gap-4">
            <ShieldAlert className="w-4 h-4 text-neogeo-red" />
            <span className="text-[10px] text-gray-600 font-pixel">PERSONAL ARCHIVAL USE ONLY</span>
          </div>
        </div>
        <div className="flex justify-center md:justify-end gap-6">
          <Link to="/disclaimer" className="text-[10px] font-pixel text-gray-400 hover:text-white underline">DISCLAIMER</Link>
        </div>
      </div>
    </div>
  </footer>
);
