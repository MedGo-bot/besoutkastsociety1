import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Instagram, Linkedin } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream pt-32 pb-24 px-8"
    >
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gold hover:text-burgundy transition-colors mb-24 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="vogue-label tracking-[0.2em]">Return to Vault</span>
        </button>

        <div className="space-y-32">
          {/* Hero Section */}
          <motion.section 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            <div className="lg:col-span-4 space-y-6">
              <span className="vogue-label text-gold tracking-[0.5em] block">Bes Outkast Society</span>
              <h1 className="text-6xl md:text-8xl font-serif italic text-burgundy leading-[0.9] tracking-[0.1em]">
                About the <br /> Society
              </h1>
            </div>
            <div className="lg:col-span-8 lg:pl-12 border-l border-gold/20">
              <p className="text-2xl md:text-3xl font-serif italic text-burgundy/80 leading-relaxed">
                Bes Outkast Society is not merely a publication; it is a sanctuary for the discerning, a laboratory for persuasion, and a chronicle of distinction.
              </p>
              <p className="mt-8 text-lg text-charcoal/70 leading-relaxed font-body">
                Established in 2003, we have spent over two decades documenting the intersection of culture, strategy, and the extreme. Our mission is to provide the "Intel" necessary for navigating a world that demands both grit and grace.
              </p>
            </div>
          </motion.section>

          {/* The Call Section */}
          <motion.section 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-24 border-y border-gold/10"
          >
            <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-start space-y-4">
              <div className="w-32 h-32 border border-gold flex items-center justify-center p-4 text-center">
                <span className="vogue-label text-gold text-[10px] leading-tight tracking-[0.3em] uppercase">
                  The Call <br /> Logo <br /> Placeholder
                </span>
              </div>
              <span className="vogue-label text-gold tracking-[0.5em] mt-4">The Call</span>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <span className="text-4xl font-serif italic text-gold/40">01</span>
                <h3 className="vogue-label text-burgundy tracking-[0.2em] font-bold">Dependability</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed italic">
                  We value the private briefing over the public spectacle. Our most potent insights are reserved for the Inner Square.
                </p>
              </div>
              <div className="space-y-4">
                <span className="text-4xl font-serif italic text-gold/40">02</span>
                <h3 className="vogue-label text-burgundy tracking-[0.2em] font-bold">Distinction</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed italic">
                  In every endeavor, we seek the mark of quality. Mediocrity is the only unforgivable sin in the Society.
                </p>
              </div>
              <div className="space-y-4">
                <span className="text-4xl font-serif italic text-gold/40">03</span>
                <h3 className="vogue-label text-burgundy tracking-[0.2em] font-bold">Dare</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed italic">
                  The Society was founded on the principle of the 'Dare'—the willingness to push beyond the comfortable boundaries of the status quo.
                </p>
              </div>
            </div>
          </motion.section>

          {/* The Blueprint & Collective */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.section
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="vogue-label text-gold tracking-[0.5em] block">The Blueprint</span>
              <blockquote className="text-3xl font-serif italic text-burgundy leading-relaxed border-l-4 border-gold pl-8 py-4">
                “When I dare to be powerful—to use my strength in the service of our vision then it becomes less and less important whether I am afraid.”
                <footer className="mt-4 text-sm vogue-label text-gold tracking-[0.2em]">— Audre Lorde</footer>
              </blockquote>
            </motion.section>

            <motion.section
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8 bg-cream-darker p-12 border-l border-gold"
            >
              <span className="vogue-label text-gold tracking-[0.5em] block">The Collective</span>
              <p className="text-xl font-serif italic text-burgundy leading-relaxed">
                Our contributors are architects of influence, athletes of the mind, and veterans of the cultural arena. We do not just report; we refine.
              </p>
              <div className="pt-8 border-t border-gold/20">
                <p className="vogue-label text-gold tracking-[0.3em] uppercase text-xs">
                  This is Our Demeanor
                </p>
              </div>
            </motion.section>
          </div>

          {/* Contact Footer */}
          <footer className="pt-24 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-8">
              <a href="mailto:tracy.wilson@besoutkastsociety.com" className="vogue-label text-burgundy hover:text-gold transition-colors no-underline tracking-[0.2em]">Concierge</a>
              <a href="https://www.instagram.com/besosociety" target="_blank" rel="noopener noreferrer" className="vogue-label text-burgundy hover:text-gold transition-colors no-underline tracking-[0.2em]">Instagram</a>
              <a href="https://www.linkedin.com/company/bes-outkast-society" target="_blank" rel="noopener noreferrer" className="vogue-label text-burgundy hover:text-gold transition-colors no-underline tracking-[0.2em]">LinkedIn</a>
              <a href="https://www.youtube.com/@besoutkastsociety" target="_blank" rel="noopener noreferrer" className="vogue-label text-burgundy hover:text-gold transition-colors no-underline tracking-[0.2em]">YouTube</a>
            </div>
            <span className="vogue-label text-gold/40 tracking-[0.2em]">Established 2003</span>
          </footer>
        </div>
      </div>
    </motion.div>
  );
};

