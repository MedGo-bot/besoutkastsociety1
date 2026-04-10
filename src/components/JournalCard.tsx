import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface JournalCardProps {
  title: string;
  author: string;
  substackUrl: string;
  imageSrc?: string | null;
  description?: string;
}

export const JournalCard: React.FC<JournalCardProps> = ({ title, author, substackUrl, imageSrc, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-burgundy/10">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center border border-gold/20">
            <span className="font-serif italic text-burgundy/40 text-lg mb-2">Image Pending</span>
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-burgundy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
        
        {/* Subtle Label Overlay */}
        <div className="absolute top-4 left-4">
          <span className="vogue-label text-white/80 text-[8px] tracking-[0.4em] drop-shadow-md">
            Bes Journal
          </span>
        </div>
      </div>

      <div className="space-y-4 px-2">
        <h3 className="text-2xl md:text-3xl font-serif italic leading-tight text-burgundy group-hover:text-gold transition-colors duration-500">
          {title}
        </h3>
        
        <p className="text-[13px] font-body text-charcoal/80 leading-relaxed line-clamp-3 italic">
          {description || "Exploring the intersection of extreme performance and high culture."}
        </p>

        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-[1px] bg-gold/50" />
          <span className="vogue-label text-gold tracking-[0.2em]">{author}</span>
        </div>

        <a
          href={substackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-burgundy font-sans text-[9px] uppercase tracking-[0.3em] font-bold pt-2 hover:text-gold transition-colors group/link border-b border-transparent hover:border-gold pb-1"
        >
          Explore Entry
          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};
