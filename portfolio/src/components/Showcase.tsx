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

const GAP_PX = 24;    // gap between cards

export function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;

      if (isDesktop) {
        // We calculate the distance to scroll
        // It's the total width of the track minus the viewport width
        const xDist = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -xDist,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: true,
            start: "top top",
            end: () => `+=${xDist}`,
            invalidateOnRefresh: true,
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="systems"
      className="bg-background relative flex flex-col justify-center min-h-screen md:h-screen md:overflow-hidden py-24 md:py-0"
    >
      {/* Title — sits at top inside the pinned section */}
      <div className="md:absolute md:top-0 md:left-0 w-full px-8 md:px-14 pt-12 pb-6 z-20">
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
        className="flex flex-col md:flex-row items-center gap-6 px-6 md:px-[10vw] w-full md:w-max relative z-10"
        style={{
          willChange: 'transform',
        }}
      >
        {projects.map((proj, i) => (
          <div
            key={i}
            className="project-card flex-shrink-0 relative bg-card border border-white/10 hover:border-primary/40 transition-colors group flex flex-col justify-between w-full md:w-[75vw] md:max-w-[850px] lg:max-w-[1000px] h-auto md:h-[60vh] p-8 md:p-10"
            data-testid={`project-card-${i}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Top */}
            <div className="relative z-10">
              <div className="font-mono text-xs text-primary mb-3 tracking-widest">{proj.sys}</div>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4 leading-none">
                {proj.title}
              </h3>
              <div className="font-mono text-[10px] md:text-xs text-white/40 border-l-2 border-accent pl-3 mb-4">
                STACK: {proj.stack}
              </div>
              <p className="font-mono text-[10px] md:text-xs text-white/35 leading-relaxed max-w-md">
                {proj.desc}
              </p>
            </div>

            {/* Bottom — metric + coming soon */}
            <div className="relative z-10 flex items-end justify-between mt-8">
              <div className="text-4xl md:text-6xl font-light text-accent/20 group-hover:text-accent/40 transition-colors duration-500 font-mono leading-none">
                {proj.metric}
              </div>
              <div className="font-mono text-[9px] md:text-[10px] text-white/15 tracking-widest text-right leading-relaxed">
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
