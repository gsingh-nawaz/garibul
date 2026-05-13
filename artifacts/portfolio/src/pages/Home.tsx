import React, { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { Navbar } from "@/components/Navbar";
import { Showcase } from "@/components/Showcase";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { WebGLErrorBoundary } from "@/components/WebGLErrorBoundary";
import { CustomCursor } from "@/components/CustomCursor";
import { isWebGLAvailable } from "@/lib/webgl";

const HeroScene = lazy(() => import("@/components/3d/HeroScene"));
const CoreScene = lazy(() => import("@/components/3d/CoreScene"));

const Canvas = lazy(() => import('@react-three/fiber').then(m => ({ default: m.Canvas })));

export default function Home() {
  const [webglEnabled] = useState(() => isWebGLAvailable());
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Wire Lenis into GSAP ticker — store reference so cleanup works
    const lenisRaf = (time: number) => { lenis.raf(time * 1000); };
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenisRaf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground dark selection:bg-primary selection:text-white relative">
      <CustomCursor />
      <Navbar />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background border-b border-white/5">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-10" />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0" />
          
          <div className="absolute inset-0 z-0">
            {webglEnabled && (
              <WebGLErrorBoundary fallback={<div className="w-full h-full bg-black" />}>
                <Suspense fallback={<div className="w-full h-full bg-black" />}>
                  <Canvas camera={{ position: [0, 0, 15] }}>
                    <HeroScene />
                  </Canvas>
                </Suspense>
              </WebGLErrorBoundary>
            )}
          </div>

          <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-6xl w-full">
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent">
                Autonomous
              </span>
              <br />Intelligence.
            </motion.h1>
            
            <motion.p 
              className="mt-10 text-lg md:text-xl text-muted-foreground max-w-2xl font-mono border-l-2 border-primary pl-6 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Building scalable, self-healing systems and neural infrastructure for the next generation of automation. Precision engineered for scale.
            </motion.p>
            
            <motion.div 
              className="mt-16 flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto sm:max-w-none justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a href="#contact" className="px-8 py-4 font-mono text-sm tracking-widest text-primary border border-primary hover:bg-primary/10 transition-all hover:scale-105 active:scale-95 bg-black/50 backdrop-blur">
                [INITIALIZE_CONTACT]
              </a>
              <a href="#systems" className="px-8 py-4 font-mono text-sm tracking-widest text-accent border border-accent hover:bg-accent/10 transition-all hover:scale-105 active:scale-95 bg-black/50 backdrop-blur">
                [VIEW_SYSTEMS]
              </a>
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20 hidden md:block">
            <div className="w-px h-24 bg-gradient-to-b from-white/0 via-accent to-accent" />
          </div>
        </section>

        <Showcase />

        {/* CORE SECTION */}
        <section id="core" className="relative w-full h-screen bg-[#050505] border-y border-white/5 overflow-hidden">
          {/* Full-canvas 3D */}
          <div className="absolute inset-0 z-10">
            {webglEnabled && (
              <WebGLErrorBoundary fallback={<div className="w-full h-full flex items-center justify-center font-mono text-xs text-white/20">[3D_CORE_UNAVAILABLE]</div>}>
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center font-mono text-xs text-white/20">[LOADING_CORE_MODULE...]</div>}>
                  <Canvas camera={{ position: [0, 0, 7] }}>
                    <CoreScene />
                  </Canvas>
                </Suspense>
              </WebGLErrorBoundary>
            )}
          </div>

          {/* Top-left text overlay */}
          <div className="absolute top-8 left-6 md:left-12 z-20 pointer-events-none max-w-xl">
            <div className="font-mono text-[10px] tracking-widest text-accent mb-4 uppercase">
              PROCESSING_CORE
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.9] text-white mb-5">
              A LIVE_SYNAPSE OF{" "}
              <span className="text-white/35">DATA,</span>
              <br />
              MODELS &amp; DECISIONS.
            </h2>
            <p className="font-mono text-xs md:text-sm text-white/40 max-w-sm leading-relaxed">
              Click the core to ping the network. Drag your cursor across the
              field — every node responds in real-time.
            </p>
          </div>

          {/* Bottom-left label */}
          <div className="absolute bottom-10 left-6 md:left-12 z-20 pointer-events-none">
            <div className="font-mono text-xs text-white/25 border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-sm">
              $ vector_db.upsert(embeddings)
            </div>
          </div>

          {/* Bottom-right label */}
          <div className="absolute bottom-10 right-6 md:right-12 z-20 pointer-events-none">
            <div className="font-mono text-xs text-white/25 border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-sm">
              $ graph.tool_call('search_web')
            </div>
          </div>

          {/* Top-right label */}
          <div className="absolute top-8 right-6 md:right-12 z-20 pointer-events-none">
            <div className="font-mono text-xs text-white/25 border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-sm">
              $ retriever.k = 8; rerank = true
            </div>
          </div>

          {/* Bottom terminal labels */}
          <div className="absolute bottom-32 left-6 md:left-12 z-20 pointer-events-none">
            <div className="font-mono text-[10px] text-white/20 space-y-1">
              <div>&gt; DRAG_TO_ROTATE_MODEL</div>
              <div>&gt; RENDER_ENGINE: THREE.JS</div>
              <div>&gt; SHADERS: ACTIVE</div>
            </div>
          </div>
        </section>

        <About />
        <Services />
        <Contact />

      </main>
      
      <footer className="py-8 border-t border-white/5 text-center font-mono text-xs text-muted-foreground">
        <div>&copy; {new Date().getFullYear()} GARIBUL.SINGH // ALL SYSTEMS NOMINAL</div>
      </footer>
    </div>
  );
}
