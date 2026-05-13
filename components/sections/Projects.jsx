const PROJECTS = [
  { title: "Circle", year: "2047", img: "/circle.jpg" },
  { title: "Aerofly", year: "2047", img: "/aerofly.jpg" },
  { title: "Node", year: "2047", img: "/node.jpg" },
  { title: "Build", year: "2047", img: "/build.jpg" },
];

export default function Projects() {
  return (
    <section className="py-24 px-6 md:px-12">
      <h2 className="text-6xl font-bold mb-12 tracking-tighter">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 0.98 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[4/5] overflow-hidden bg-muted mb-4 relative">
              <img 
                src={project.img} 
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
            </div>
            <div className="flex justify-between items-end border-b border-white/20 pb-4">
              <h3 className="text-3xl font-bold">{project.title}</h3>
              <span className="text-white/50">{project.year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
