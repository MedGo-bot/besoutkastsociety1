import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface InnerSquareProps {
  onBack: () => void;
}

export const InnerSquare: React.FC<InnerSquareProps> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream pt-32 pb-24 px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gold hover:text-burgundy transition-colors mb-16 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="vogue-label tracking-[0.2em]">Return to Vault</span>
        </button>

        <div className="space-y-16">
          <header className="space-y-4 text-center md:text-left">
            <span className="vogue-label text-gold tracking-[0.5em]">Editor's Letter</span>
            <h1 className="text-5xl md:text-8xl font-serif italic text-burgundy leading-tight tracking-[0.1em]">
              For the Love of the Dare
            </h1>
          </header>

          <div className="love-letter-body text-xl md:text-3xl space-y-12 text-burgundy font-serif italic leading-relaxed max-w-3xl">
            <p>My Dear Society,</p>
            
            <p>
              Everything we achieve begins with a dare.
            </p>
            
            <p>
              It is the silent, trembling foundation upon which we build a life. It is the moment we decide to move out of the comfortable and into the unknown. We spend our youth learning to navigate the dares of others, but as we mature, we begin to place our own bets. We bet on new careers, we bet on the homes that will hold our legacies, and we bet on the markets that fuel our ambitions.
            </p>
            
            <p>
              But the greatest bet is the one you place on yourself.
            </p>
            
            <p>
              To believe in your purpose enough to step into the void is the ultimate act of courage. Bes Outkast Society exists for this singular reason: to celebrate the "Big Jump." Whether we are showing you the path through Our Demeanor or honoring the triumphs of those who refused to sit on the sidelines, we are your witnesses.
            </p>
            
            <p>
              It is easy to watch from the shore. It is another thing entirely to be the one in the water, daring to swim against the current. This is our Creed.
            </p>

            <div className="pt-12">
              <p className="not-italic vogue-label text-gold mb-2 tracking-[0.2em]">With affection and respect,</p>
              <p className="text-4xl font-serif italic text-burgundy">Ms. Wilson</p>
              <p className="vogue-label text-burgundy/60 tracking-[0.1em]">Editor-in-Chief</p>
            </div>
          </div>

          <div className="pt-16 flex justify-center md:justify-start">
            <a 
              href="https://besoutkastsociety.substack.com/s/the-inner-circle-with-ms-wilson"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 border border-gold px-12 py-6 vogue-label text-burgundy hover:bg-gold hover:text-white transition-all duration-500 no-underline font-bold text-sm tracking-[0.2em]"
            >
              Enter the Archive
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
