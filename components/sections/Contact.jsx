export default function Contact() {
  return (
    <footer className="py-24 px-6 md:px-12 bg-white text-black min-h-screen flex flex-col justify-between">
      <h2 className="text-[15vw] font-black leading-none tracking-tighter">Get in touch</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Email me', 'Book a call', 'Behance', 'LinkedIn'].map((link) => (
          <a 
            key={link}
            href="#" 
            className="text-4xl md:text-6xl font-bold border-t border-black py-8 flex justify-between items-center group overflow-hidden"
          >
            <span className="group-hover:translate-x-4 transition-transform duration-500">{link}</span>
            <span className="text-5xl">→</span>
          </a>
        ))}
      </div>
    </footer>
  );
}
