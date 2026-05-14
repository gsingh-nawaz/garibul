import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ALL_SKILLS = [
  "PyTorch", "LangChain", "OpenAI API", "Anthropic Claude",
  "Pinecone", "Milvus", "Weaviate", "Docker",
  "AWS Bedrock", "Kubernetes", "FastAPI", "Next.js",
  "CUDA", "Ray", "Hugging Face", "Postgres",
];

function useCountUp(target: number, duration = 2000, trigger: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);
  return value;
}

function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(value, 2200, inView);

  const display =
    value >= 1000000
      ? (count / 1000000).toFixed(count / 1000000 >= 1 ? 1 : 0) + "M"
      : value >= 1000
      ? (count / 1000).toFixed(1) + "K"
      : count.toString();

  return (
    <div ref={ref} className="border-l-2 border-primary pl-6">
      <div className="text-5xl md:text-6xl font-black text-white font-mono leading-none mb-2">
        {display}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="font-mono text-[10px] tracking-widest text-white/40 uppercase">{label}</div>
    </div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Massive headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.88] mb-12"
        >
          I DESIGN{" "}
          <span className="text-accent">SYSTEMS</span>
          <br />
          THAT THINK,
          <br />
          DECIDE &amp;{" "}
          <span className="text-white/30">EXECUTE.</span>
        </motion.h2>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="font-mono text-sm md:text-base text-white/50 max-w-2xl leading-relaxed mb-20"
        >
          Eight years building autonomous infrastructure for enterprises,
          startups, and hedge funds. I ship LLM stacks, vision pipelines and
          agentic frameworks that run 24/7 — not demos.
        </motion.p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-24">
          <StatCounter value={1000000} suffix="+" label="AUTOMATED TASKS" />
          <StatCounter value={999} suffix="%" label="INFERENCE RELIABILITY" />
          <StatCounter value={50} suffix="+" label="CUSTOM LLM FINE-TUNES" />
        </div>

        {/* Skills terminal grid */}
        <div>
          <div className="font-mono text-sm text-white/40 mb-6">
            $ ls /skills
          </div>
          <div className="border border-white/10">
            {Array.from({ length: Math.ceil(ALL_SKILLS.length / 4) }).map((_, row) => (
              <div
                key={row}
                className={`grid grid-cols-2 md:grid-cols-4 ${row < Math.ceil(ALL_SKILLS.length / 4) - 1 ? "border-b border-white/10" : ""}`}
              >
                {ALL_SKILLS.slice(row * 4, row * 4 + 4).map((skill, col) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: row * 0.05 + col * 0.03 }}
                    className={`font-mono text-sm text-white/60 hover:text-accent hover:bg-accent/5 transition-colors px-6 py-4 flex items-center gap-2
                      ${col < 3 ? "border-r border-white/10" : ""}
                    `}
                  >
                    <span className="text-accent/50 text-xs">›</span>
                    {skill}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
