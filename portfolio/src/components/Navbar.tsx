import React from "react";
import { Link } from "wouter";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur border-b border-white/5">
      <div className="font-mono font-bold text-lg text-white">GARIBUL.SINGH</div>
      
      <div className="hidden md:flex items-center gap-8 font-mono text-sm">
        <a href="#systems" className="text-muted-foreground hover:text-white transition-colors">[SYSTEMS]</a>
        <a href="#core" className="text-muted-foreground hover:text-white transition-colors">[CORE]</a>
        <a href="#services" className="text-muted-foreground hover:text-white transition-colors">[SERVICES]</a>
        <a href="#contact" className="text-muted-foreground hover:text-white transition-colors">[CONTACT]</a>
      </div>

      <div className="flex items-center gap-3 font-mono text-xs">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-muted-foreground hidden sm:inline-block">STATUS: ONLINE</span>
      </div>
    </nav>
  );
}
