import React from 'react';
import { motion } from 'motion/react';

export const BrandStory: React.FC = () => {
  return (
    <section className="px-8 py-32 bg-burgundy text-cream overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&w=1200&q=80" 
          alt="Texture" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <span className="vogue-label text-gold">The Narrative</span>
            <h2 className="text-6xl md:text-8xl font-serif italic leading-[0.9]">
              A Legacy of <br /> Absolute <br /> Discipline
            </h2>
            <p className="text-xl font-body italic opacity-70 max-w-xl leading-relaxed">
              "To identify the patterns of success where others see chaos. To master the art of persuasion in its most extreme forms."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12 border-l border-gold/20 pl-12"
          >
            <div className="space-y-6">
              <h3 className="vogue-label text-gold">The Society Creed</h3>
              <p className="text-sm font-body opacity-60 leading-relaxed">
                Established in 2003, Bes Outkast Society has spent over two decades documenting the intersection of culture, strategy, and the extreme. We provide the tactical advantage required for navigating a world that demands both grit and grace.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-gold/10">
              <div>
                <span className="text-4xl font-serif italic block mb-2 text-gold">23</span>
                <span className="vogue-label opacity-40">Years of Intel</span>
              </div>
              <div>
                <span className="text-4xl font-serif italic block mb-2 text-gold">5k+</span>
                <span className="vogue-label opacity-40">Society Members</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

