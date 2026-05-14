import { Brain, GitMerge, Eye, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    num: "01",
    icon: Brain,
    tags: "FINE-TUNING · RAG · EVALS",
    title: "LLM ARCHITECT",
    titleAccent: true,
    desc: "Custom fine-tuning, retrieval-augmented generation pipelines, and rigorous evaluation harnesses for production-grade language models.",
    bullets: ["Domain SFT + DPO", "Vector retrieval", "Eval & guardrails"],
  },
  {
    num: "02",
    icon: GitMerge,
    tags: "ORCHESTRATION · INTEGRATIONS",
    title: "WORKFLOW AUTOMATION",
    titleAccent: false,
    desc: "End-to-end business process orchestration — from data ingestion to decision-making — wired into your existing tooling.",
    bullets: ["Event-driven pipelines", "API integrations", "Observability"],
  },
  {
    num: "03",
    icon: Eye,
    tags: "DETECTION · EDGE · SPATIAL",
    title: "COMPUTER VISION",
    titleAccent: false,
    desc: "Custom object detection, segmentation, and spatial analysis models optimized for edge devices and industrial throughput.",
    bullets: ["YOLO / DETR stacks", "Edge deployment", "Synthetic data"],
  },
  {
    num: "04",
    icon: Bot,
    tags: "AUTONOMOUS · MULTI-AGENT",
    title: "AGENTIC FRAMEWORKS",
    titleAccent: false,
    desc: "Autonomous AI employees and tool-using agents that operate in the real world — research, decide, and act on your behalf.",
    bullets: ["Tool orchestration", "Memory + planning", "Safety layers"],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Services() {
  return (
    <section id="services" className="py-24 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-16">
          <div>
            <div className="font-mono text-xs text-accent tracking-widest mb-4">
              COGNITIVE_SOLUTIONS
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] uppercase text-white">
              WHAT I <span className="text-accent">DEPLOY</span> FOR<br />YOU.
            </h2>
          </div>
          <p className="font-mono text-sm text-white/40 max-w-xs lg:text-right leading-relaxed self-end">
            Four service pillars · fully managed<br />
            engagements · production hand-off included.
          </p>
        </div>

        {/* 2×2 Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 border border-white/10"
        >
          {services.map((srv, i) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={i}
                variants={item}
                data-testid={`service-card-${i}`}
                className={`group relative p-10 border-white/10 transition-colors duration-300 hover:bg-white/[0.02]
                  ${i === 0 ? "border-b border-r" : ""}
                  ${i === 1 ? "border-b border-l md:border-l-0" : ""}
                  ${i === 2 ? "border-t-0 border-r" : ""}
                  ${i === 3 ? "border-t-0 border-l md:border-l-0" : ""}
                `}
              >
                {/* Top row: icon + number */}
                <div className="flex items-start justify-between mb-8">
                  <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                    <Icon className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs text-white/20">{srv.num}</span>
                </div>

                {/* Tags */}
                <div className="font-mono text-[10px] tracking-widest text-primary mb-3 uppercase">
                  {srv.tags}
                </div>

                {/* Title */}
                <h3 className={`text-3xl md:text-4xl font-black uppercase tracking-tight mb-5 leading-none ${srv.titleAccent ? "text-accent" : "text-white"}`}>
                  {srv.title}
                </h3>

                {/* Description */}
                <p className="font-mono text-sm text-white/45 leading-relaxed mb-6">
                  {srv.desc}
                </p>

                {/* Bullets */}
                <ul className="space-y-1">
                  {srv.bullets.map((b, j) => (
                    <li key={j} className="font-mono text-xs text-white/35 flex items-center gap-2">
                      <span className="text-accent/60">›</span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
