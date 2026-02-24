import React from 'react';
import { ShieldAlert, Info, Scale } from 'lucide-react';

export const Disclaimer = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-32">
      <div className="bg-retro-card border-t-8 border-neogeo-red p-12 space-y-12">
        <div className="flex items-center gap-6">
          <ShieldAlert className="w-16 h-16 text-neogeo-red" />
          <h1 className="text-4xl font-pixel">LEGAL NOTICE</h1>
        </div>

        <div className="space-y-8 font-pixel text-xs leading-loose tracking-widest text-gray-400">
          <p className="text-white">
            "This website is for personal archival and educational use."
          </p>
          
          <p>
            RetroArcade Vault is a non-commercial project designed to preserve arcade history through browser-based emulation. 
            We do not host copyrighted ROM files on our main servers.
          </p>

          <div className="p-8 bg-black border-l-4 border-neogeo-yellow space-y-4">
            <div className="flex items-center gap-3 text-neogeo-yellow">
              <Scale className="w-5 h-5" />
              <span className="text-[10px]">DMCA COMPLIANCE</span>
            </div>
            <p className="text-[8px]">
              If you are a copyright holder and believe your content is being used without authorization, 
              please contact our archival team for immediate removal.
            </p>
          </div>

          <p>
            By using this platform, you acknowledge that you own physical copies of the games you are emulating 
            or are using them for educational research purposes.
          </p>
        </div>

        <div className="pt-12 border-t border-white/10 flex justify-between items-center">
          <div className="font-pixel text-[8px] text-gray-600">VER: 1.0.4-STABLE</div>
          <button className="neon-btn neon-btn-red px-8 py-3">I UNDERSTAND</button>
        </div>
      </div>
    </div>
  );
};
