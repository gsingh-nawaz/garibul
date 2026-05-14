import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    sys: "SYSTEM_1",
    title: "AetherFlow",
    stack: "Python / Ray / Redis",
    desc: "AI workflow orchestration engine — routes tasks across distributed agents with sub-millisecond handoff.",
    metric: "10x Speed",
  },
  {
    sys: "SYSTEM_2",
    title: "VisionGrid",
    stack: "PyTorch / OpenCV / CUDA",
    desc: "Real-time computer vision surveillance pipeline with edge-optimised inference and anomaly detection.",
    metric: "99% Acc",
  },
  {
    sys: "SYSTEM_3",
    title: "SentinelOS",
    stack: "Go / Kafka / eBPF",
    desc: "Autonomous security monitoring system with kernel-level observability and zero false-positive tuning.",
    metric: "<1ms Latency",
  },
  {
    sys: "SYSTEM_4",
    title: "Chronos Neural",
    stack: "TensorFlow / Timescale",
    desc: "Temporal prediction framework trained on financial and sensor time-series data at scale.",
    metric: "TB/s scale",
  },
];

const CARD_VW = 82;   // each card width as % of viewport
const GAP_PX = 24;    // gap between cards

export function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    if (window.innerWidth < 768) return;

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="systems"
      className="bg-background relative"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      {/* Title — sits at top inside the pinned section */}
      <div className="px-8 md:px-14 pt-12 pb-6 relative z-10 flex-shrink-0">
        <div className="font-mono text-[10px] tracking-widest text-accent mb-3 uppercase">
          PORTFOLIO_SHOWCASE
        </div>
        <h2 className="text-2xl md:text-3xl font-black font-mono text-white tracking-tight uppercase">
          [SYSTEMS]
        </h2>
        <div className="w-16 h-0.5 bg-primary mt-3" />
      </div>

      {/* Horizontal track — no overflow clip here so cards slide naturally */}
      <div
        ref={trackRef}
        className="flex"
        style={{
          position: 'absolute',
          top: 100,
          left: 0,
          bottom: 0,
          gap: `${GAP_PX}px`,
          paddingLeft: `${56}px`,
          paddingRight: `${56}px`,
          width: `calc(${projects.length * CARD_VW}vw + ${(projects.length + 1) * GAP_PX}px)`,
          willChange: 'transform',
        }}
      >
        {projects.map((proj, i) => (
          <div
            key={i}
            className="project-card flex-shrink-0 relative bg-card border border-white/10 hover:border-primary/40 transition-colors group flex flex-col justify-between"
            style={{
              width: `${CARD_VW}vw`,
              maxWidth: 900,
              padding: '2rem 2.5rem',
            }}
            data-testid={`project-card-${i}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Top */}
            <div className="relative z-10">
              <div className="font-mono text-xs text-primary mb-3 tracking-widest">{proj.sys}</div>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-5 leading-none">
                {proj.title}
              </h3>
              <div className="font-mono text-xs text-white/40 border-l-2 border-accent pl-3 mb-5">
                STACK: {proj.stack}
              </div>
              <p className="font-mono text-xs text-white/35 leading-relaxed max-w-md">
                {proj.desc}
              </p>
            </div>

            {/* Bottom — metric + coming soon */}
            <div className="relative z-10 flex items-end justify-between">
              <div className="text-5xl md:text-7xl font-light text-accent/20 group-hover:text-accent/40 transition-colors duration-500 font-mono leading-none">
                {proj.metric}
              </div>
              <div className="font-mono text-[10px] text-white/15 tracking-widest text-right leading-relaxed">
                LINKS<br />COMING SOON
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-10 z-20 font-mono text-[10px] text-white/20 tracking-widest hidden md:flex items-center gap-2">
        <span>SCROLL</span>
        <span className="text-accent">→</span>
      </div>
    </section>
  );
}
