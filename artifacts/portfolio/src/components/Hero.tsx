import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-10" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0" />
      
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl">
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Architecting <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Autonomous Intelligence.
          </span>
        </motion.h1>
        
        <motion.p 
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Building scalable, self-healing systems and neural infrastructure for the next generation of automation.
        </motion.p>
        
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a href="#contact" className="px-8 py-4 font-mono text-sm text-primary border border-primary hover:bg-primary/10 transition-colors">
            [INITIALIZE_CONTACT]
          </a>
          <a href="#systems" className="px-8 py-4 font-mono text-sm text-accent border border-accent hover:bg-accent/10 transition-colors">
            [VIEW_SYSTEMS]
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-px h-16 bg-gradient-to-b from-white/0 via-white/50 to-white" />
      </div>
    </section>
  );
}
