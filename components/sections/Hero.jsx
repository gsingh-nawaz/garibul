import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-between pt-12 pb-24 px-6 md:px-12">
      <motion.h1 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-[22vw] font-black leading-[0.8] tracking-tighter uppercase"
      >
        Collins
      </motion.h1>

      <div className="flex flex-col md:flex-row justify-end items-end gap-12">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-xl text-2xl md:text-4xl font-medium leading-tight text-right"
        >
          I help purpose-driven brands grow through strategic design — 
          <span className="text-accent">creating beautiful identities</span> and solid websites.
        </motion.p>
      </div>
    </section>
  );
}
