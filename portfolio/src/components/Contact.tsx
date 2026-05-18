import { useState, useEffect } from 'react';
import { useSubmitContact } from '@workspace/api-client-react';
import { Github, Linkedin, Twitter, Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const mutation = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTransmissionLogs(["INITIATING_CONNECTION..."]);

    setTimeout(() => {
      setTransmissionLogs(prev => [...prev, "ENCRYPTING_PAYLOAD..."]);
    }, 400);

    setTimeout(() => {
      setTransmissionLogs(prev => [...prev, "ROUTING_THROUGH_CORE..."]);
    }, 800);

    mutation.mutate({
      data: {
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        message: formData.message
      } as any
    });
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setTransmissionLogs(prev => [...prev, "SIGNAL_RECEIVED", "QUEUED_FOR_TRANSMISSION"]);
    } else if (mutation.isError) {
      setTransmissionLogs(prev => [...prev, "ERROR: TRANSMISSION_FAILED"]);
    }
  }, [mutation.isSuccess, mutation.isError]);

  const socials = [
    { icon: Github, label: 'github.com/gsingh-nawaz', href: 'https://github.com/gsingh-nawaz' },
    { icon: Linkedin, label: 'linkedin.com/in/garibul-singh', href: 'https://linkedin.com/in/garibul-singh' },
    { icon: Twitter, label: 'x.com/garibulsingh', href: 'https://x.com/GaribulSingh' },
  ];

  return (
    <section id="contact" className="py-24 bg-background border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">

        <div className="font-mono text-[10px] tracking-widest text-accent mb-6 uppercase">
          ESTABLISH_CONNECTION
        </div>

        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.88] mb-14">
          OPEN A<br />
          <span className="text-accent">SECURE</span> CHANNEL.
        </h2>

        <div className="border border-accent/40 bg-accent/5 px-5 py-4 mb-6 flex flex-col gap-1">
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
            <span className="text-accent font-bold tracking-widest">STATUS: ONLINE</span>
          </div>
          <div className="font-mono text-[11px] text-white/40 tracking-wider">
            AVAILABLE FOR PROJECTS · OPEN
          </div>
        </div>

        <div className="mb-6 space-y-0">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border border-white/8 hover:border-accent/40 hover:bg-accent/5 px-5 py-4 font-mono text-sm text-white/50 hover:text-white transition-all group"
              data-testid={`link-${label.split('.')[0]}`}
            >
              <Icon className="w-4 h-4 text-white/30 group-hover:text-accent transition-colors flex-shrink-0" strokeWidth={1.5} />
              {label}
            </a>
          ))}
        </div>

        <div className="font-mono text-[10px] text-white/25 tracking-wider mb-10 leading-relaxed">
          ENCRYPTION: TLS 1.3 · KEY EXCHANGE: X25519<br />
          MESSAGES STORED IN PRIVATE INDEX · NO TRACKERS
        </div>

        <div className="border border-white/12 bg-[#0a0a0a]">
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-[#111111]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <span className="font-mono text-[11px] text-white/30">garibul@neural-core ~ % ./send_signal</span>
            <div className="w-14" />
          </div>

          {mutation.isSuccess ? (
            <div className="p-10 text-center font-mono space-y-4">
              <div className="text-accent text-4xl mb-4">{"[OK]"}</div>
              <div className="text-white text-lg tracking-widest uppercase">signal received / queued for transmission</div>
              <div className="text-white/40 text-sm">Signal registered in neural core. Transmission process active.</div>

              <div className="mt-8 p-4 bg-black/40 border border-white/5 text-left font-mono text-[10px] space-y-1">
                {transmissionLogs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-accent/40">[{i.toString().padStart(2, '0')}]</span>
                    <span className={log.includes('ERROR') ? 'text-red-500' : 'text-white/60'}>{log}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  mutation.reset();
                  setFormData({ name: '', email: '', company: '', message: '' });
                  setTransmissionLogs([]);
                }}
                className="mt-6 px-6 py-2 border border-white/20 hover:border-accent text-sm font-mono text-white/60 hover:text-accent transition-colors"
              >
                [RESET_CONNECTION]
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6 font-mono">
              <div>
                <label className="block text-[10px] tracking-widest text-white/35 mb-2 uppercase">01. NAME</label>
                <div className="flex items-center border border-white/10 focus-within:border-accent/50 bg-black/30 transition-colors">
                  <span className="pl-4 pr-2 text-accent/60 text-sm select-none">›</span>
                  <input
                    type="text"
                    required
                    placeholder="ada lovelace"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="flex-1 bg-transparent outline-none py-3 pr-4 text-sm text-white placeholder:text-white/20"
                    data-testid="input-name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest text-white/35 mb-2 uppercase">02. EMAIL</label>
                <div className="flex items-center border border-white/10 focus-within:border-accent/50 bg-black/30 transition-colors">
                  <span className="pl-4 pr-2 text-accent/60 text-sm select-none">›</span>
                  <input
                    type="email"
                    required
                    placeholder="ada@analytical.engine"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="flex-1 bg-transparent outline-none py-3 pr-4 text-sm text-white placeholder:text-white/20"
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest text-white/35 mb-2 uppercase">03. COMPANY (OPTIONAL)</label>
                <div className="flex items-center border border-white/10 focus-within:border-accent/50 bg-black/30 transition-colors">
                  <span className="pl-4 pr-2 text-accent/60 text-sm select-none">›</span>
                  <input
                    type="text"
                    placeholder="—"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="flex-1 bg-transparent outline-none py-3 pr-4 text-sm text-white placeholder:text-white/20"
                    data-testid="input-company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest text-white/35 mb-2 uppercase">04. MESSAGE</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Describe your system..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-white/10 focus:border-accent/50 bg-black/30 outline-none px-4 py-3 text-sm text-white placeholder:text-white/20 resize-none transition-colors"
                  data-testid="input-message"
                />
              </div>

              {mutation.isPending && (
                <div className="p-4 bg-black/40 border border-white/5 font-mono text-[10px] space-y-1">
                   {transmissionLogs.map((log, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-accent/40">[{i.toString().padStart(2, '0')}]</span>
                      <span className="text-white/60">{log}</span>
                    </div>
                  ))}
                  <div className="flex gap-2 animate-pulse">
                    <span className="text-accent/40">[--]</span>
                    <span className="text-accent">PROCESSING...</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-white/8">
                <span className="font-mono text-[10px] text-white/25 tracking-wider">
                  + AWAITING TRANSMISSION
                </span>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="flex items-center gap-3 px-6 py-3 bg-accent hover:bg-accent/80 text-black font-black text-sm tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-submit"
                >
                  {mutation.isPending ? 'SENDING...' : 'TRANSMIT'}
                  <Send className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
