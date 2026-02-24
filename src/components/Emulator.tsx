import React from 'react';

interface EmulatorProps {
  romUrl: string;
  biosUrl?: string;
  core?: string;
}

declare global {
  interface Window {
    EJS_player: string;
    EJS_core: string;
    EJS_gameUrl: string;
    EJS_biosUrl?: string;
    EJS_pathtodata: string;
    EJS_startOnLoaded: boolean;
  }
}

export const Emulator: React.FC<EmulatorProps> = ({ 
  romUrl, 
  biosUrl = "/bios/neogeo.zip", 
  core = "arcade" 
}) => {
  const iframeUrl = `/emulator.html?rom=${encodeURIComponent(romUrl)}&bios=${encodeURIComponent(biosUrl)}&core=${encodeURIComponent(core)}`;

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border-4 border-retro-card shadow-2xl crt-effect">
      <iframe 
        src={iframeUrl}
        className="w-full h-full border-none"
        allowFullScreen
        allow="autoplay; gamepad"
      />
    </div>
  );
};
