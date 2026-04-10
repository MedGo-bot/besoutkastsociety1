import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Instagram, Linkedin, Mail, Search, Globe, Sparkles, Loader2, ExternalLink } from 'lucide-react';
import journalData from './data.json';
import { AboutPage } from './components/AboutPage';
import { BrandStory } from './components/BrandStory';
import { JournalCard } from './components/JournalCard';
import { InnerSquare } from './components/InnerSquare';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'inner-square'>('home');
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);

  const handleViewChange = (view: 'home' | 'about' | 'inner-square') => {
    setCurrentView(view);
    if (view === 'about') {
      window.history.pushState({ view: 'about' }, '', '/about');
    } else if (view === 'inner-square') {
      window.history.pushState({ view: 'inner-square' }, '', '/inner-square');
    } else {
      window.history.pushState({ view: 'home' }, '', '/');
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.view) {
        setCurrentView(event.state.view);
      } else {
        const path = window.location.pathname;
        if (path === '/about') setCurrentView('about');
        else if (path === '/inner-square') setCurrentView('inner-square');
        else setCurrentView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    const path = window.location.pathname;
    if (path === '/about') setCurrentView('about');
    else if (path === '/inner-square') setCurrentView('inner-square');

    const timer = setTimeout(() => {
      setShowNewsletter(true);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
      clearTimeout(timer);
    };
  }, []);

  const conciergeItems = [
    { name: "The News magazine", url: "https://besoutkastsociety.substack.com" },
    { name: "The Inner Square", action: () => { handleViewChange('inner-square'); setIsMenuOpen(false); } },
    { name: "Private Archive", url: "https://besoutkastsociety.substack.com/archive" },
    { name: "Concierge", url: "mailto:tracy.wilson@besoutkastsociety.com" },
    { name: "Join Society", action: () => setShowNewsletter(true) }
  ];

  const editorialSections = journalData.sections.map(section => ({
    name: section.title,
    id: section.id
  }));

  return (
    <div className="min-h-screen bg-cream selection:bg-burgundy selection:text-white relative">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] blueprint-grid" />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled ? 'bg-cream/95 backdrop-blur-md border-b border-gold/20 py-2' : 'bg-transparent py-4'
      }`}>
        <div className="border-b border-gold/10 pb-4 px-8">
          <div className="max-w-[1600px] mx-auto flex justify-between items-center">
            <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.4em] font-bold text-burgundy hover:text-gold transition-all group">
              <Menu className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">The Directory</span>
            </button>
            
            <div 
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => handleViewChange('home')}
            >
              <div className="text-2xl sm:text-4xl font-serif tracking-[0.15em] text-burgundy font-bold uppercase transition-all group-hover:tracking-[0.2em]">
                Bes Outkast Society
              </div>
              <div className="h-[1px] w-0 group-hover:w-full bg-gold transition-all duration-700" />
            </div>

            <div className="flex items-center gap-8">
              <button 
                onClick={() => handleViewChange('about')}
                className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold text-burgundy hover:text-gold transition-colors hidden lg:block"
              >
                About
              </button>
              <button 
                onClick={() => setShowNewsletter(true)}
                className="bg-burgundy text-white px-8 py-3 text-[10px] font-sans uppercase tracking-[0.4em] hover:bg-gold transition-all duration-500 shadow-lg hover:shadow-gold/20"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-cream z-[60] flex flex-col"
          >
            <div className="flex justify-between items-center p-8 border-b border-gold/10">
              <div className="text-xl font-serif tracking-widest font-bold uppercase text-burgundy">Bes Outkast Society</div>
              <button onClick={() => setIsMenuOpen(false)} className="text-burgundy p-2 hover:rotate-90 transition-transform duration-500">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-6xl mx-auto py-24 px-8 grid grid-cols-1 md:grid-cols-2 gap-24">
                <div>
                  <h3 className="vogue-label text-gold mb-12 border-b border-gold/10 pb-4 tracking-[0.5em]">The Directory</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {conciergeItems.map((item, i) => (
                      'url' in item ? (
                        <motion.a
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="vogue-label text-burgundy hover:text-gold transition-all p-6 border-l border-gold/20 hover:border-gold bg-cream-darker/20 hover:bg-cream-darker/40 no-underline"
                        >
                          {item.name}
                        </motion.a>
                      ) : (
                        <motion.button
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          onClick={item.action}
                          className="vogue-label text-burgundy hover:text-gold transition-all p-6 border-l border-gold/20 hover:border-gold bg-cream-darker/20 hover:bg-cream-darker/40 text-left"
                        >
                          {item.name}
                        </motion.button>
                      )
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="vogue-label text-gold mb-12 border-b border-gold/10 pb-4 tracking-[0.5em]">Editorial Columns</h3>
                  <div className="grid grid-cols-1 gap-12">
                    {journalData.sections.map((section, i) => (
                      <div key={section.id} className="space-y-6">
                        <h4 className="vogue-label text-gold/40 text-[10px] tracking-[0.4em] uppercase">{section.title}</h4>
                        <div className="grid grid-cols-1 gap-8">
                          {section.journals.map((journal) => (
                            <motion.button
                              key={journal.title}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                              onClick={() => {
                                const element = document.getElementById(section.id);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' });
                                  setIsMenuOpen(false);
                                }
                              }}
                              className="group text-left w-full"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-3xl sm:text-4xl font-serif text-burgundy group-hover:text-gold group-hover:italic transition-all">{journal.title}</span>
                                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-gold" />
                              </div>
                              <p className="text-[11px] font-body text-charcoal/60 leading-relaxed italic line-clamp-1">
                                {journal.description}
                              </p>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.main 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-[80px]"
          >
            {/* HERO SECTION */}
            <section className="relative h-[90vh] w-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1920&q=90" 
                alt="Luxury Surfing" 
                className="absolute inset-0 w-full h-full object-cover brightness-90 scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-burgundy/20 via-transparent to-burgundy/40" />
              
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-6xl"
                >
                  <motion.span 
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, letterSpacing: "0.5em" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="vogue-label text-gold mb-8 block"
                  >
                    Established 2003
                  </motion.span>
                  <h1 className="text-7xl md:text-[10rem] font-serif italic text-white leading-[0.85] mb-12 tracking-tight">
                    The Art of <br /> 
                    <span className="text-gold">Extreme</span> <br />
                    Persuasion
                  </h1>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16">
                    <a 
                      href="https://besoutkastsociety.substack.com/archive"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-12 py-5 overflow-hidden no-underline"
                    >
                      <div className="absolute inset-0 bg-burgundy transition-transform duration-500 group-hover:scale-105" />
                      <span className="relative vogue-label text-white tracking-[0.4em] group-hover:text-gold transition-colors">Enter the Vault</span>
                    </a>
                    <button 
                      onClick={() => handleViewChange('about')}
                      className="vogue-label text-white hover:text-gold transition-all tracking-[0.4em] border-b border-white/20 hover:border-gold pb-2"
                    >
                      Our Demeanor
                    </button>
                  </div>
                </motion.div>
              </div>
              
              {/* Hero Footer Ticker */}
              <div className="absolute bottom-0 left-0 w-full bg-burgundy/80 backdrop-blur-sm py-4 border-t border-gold/20 overflow-hidden hidden md:block">
                <div className="flex whitespace-nowrap ticker-scroll">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className="vogue-label text-gold/60 mx-12 text-[8px] tracking-[0.5em]">
                      Bes Outkast Society • High Culture • Extreme Performance • Visionary Leadership • The Quarterly Briefing •
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* EDITORIAL SECTIONS */}
            {journalData.sections.map((section: any, idx) => (
              <section key={section.id} id={section.id} className={`px-8 py-40 ${idx % 2 !== 0 ? 'bg-cream-darker' : 'bg-cream'} relative overflow-hidden`}>
                {idx % 2 !== 0 && <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />}
                
                <div className="max-w-[1600px] mx-auto relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32 border-b border-gold/20 pb-16">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="vogue-label text-gold tracking-[0.5em]">Section 0{idx + 1}</span>
                        <div className="w-24 h-[1px] bg-gold/30" />
                      </div>
                      <h2 className="text-7xl md:text-9xl font-serif italic leading-none tracking-tight text-burgundy">{section.title}</h2>
                    </div>
                    <p className="max-w-xl text-lg font-body text-charcoal/60 leading-relaxed italic lg:text-right">
                      {section.tagline}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-10 gap-y-32">
                    {section.journals.map((journal: any) => (
                      <JournalCard 
                        key={journal.title}
                        title={journal.title}
                        author={journal.author}
                        substackUrl={journal.substackUrl}
                        imageSrc={journal.imageSrc}
                        description={journal.description}
                      />
                    ))}
                  </div>
                </div>
              </section>
            ))}

            <BrandStory />

            {/* Footer */}
            <footer className="bg-burgundy text-cream pt-32 pb-12 px-8">
              <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col items-center mb-32">
                  <div className="text-4xl sm:text-7xl font-serif tracking-[0.1em] font-bold uppercase text-center text-gold">Bes Outkast Society</div>
                  <div className="flex gap-12 mt-12">
                    {[
                      { name: 'Instagram', url: 'https://www.instagram.com/besosociety' },
                      { name: 'LinkedIn', url: 'https://www.linkedin.com/company/bes-outkast-society' },
                      { name: 'YouTube', url: 'https://www.youtube.com/@besoutkastsociety' }
                    ].map(social => (
                      <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="vogue-label text-cream/40 hover:text-gold transition-colors tracking-[0.2em]">{social.name}</a>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-32 border-t border-gold/10 pt-12">
                  <div>
                    <h4 className="vogue-label text-gold mb-8">The Society</h4>
                    <p className="text-lg font-serif italic opacity-70 leading-relaxed mb-8">
                      A premium concierge gateway to extreme performance, high culture, and visionary leadership.
                    </p>
                    <a 
                      href="https://besoutkastsociety.substack.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gold text-burgundy px-6 py-3 vogue-label hover:bg-cream hover:text-burgundy transition-all no-underline font-bold"
                    >
                      Join the Society
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                  <div>
                    <h4 className="vogue-label text-gold mb-8">Vault Access</h4>
                    <ul className="space-y-4 vogue-label text-cream/60">
                      <li><button onClick={() => handleViewChange('about')} className="hover:text-gold transition-colors">About Society</button></li>
                      <li><a href="mailto:tracy.wilson@besoutkastsociety.com" className="hover:text-gold transition-colors">Contact Concierge</a></li>
                      <li><a href="https://besoutkastsociety.substack.com/archive" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Private Archives</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="vogue-label text-gold mb-8">Our Demeanor</h4>
                    <ul className="space-y-4 vogue-label text-cream/60">
                      <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
                      <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
                      <li><button onClick={() => setShowSitemap(true)} className="hover:text-gold transition-colors uppercase">Site Map</button></li>
                    </ul>
                  </div>
                </div>

                <div className="text-center pt-12 border-t border-gold/10">
                  <span className="vogue-label opacity-30">
                    © 2026 Bes Outkast Society. Established 2003. All Rights Reserved.
                  </span>
                </div>
              </div>
            </footer>

          </motion.main>
        ) : currentView === 'about' ? (
          <AboutPage key="about" onBack={() => handleViewChange('home')} />
        ) : (
          <InnerSquare key="inner-square" onBack={() => handleViewChange('home')} />
        )}
      </AnimatePresence>

      {/* Newsletter Modal */}
      <AnimatePresence>
        {showNewsletter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-charcoal/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-cream max-w-md w-full p-12 relative shadow-2xl border-l border-gold"
            >
              <button 
                onClick={() => setShowNewsletter(false)}
                className="absolute top-6 right-6 text-burgundy hover:text-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <h2 className="text-3xl font-serif italic mb-4 text-burgundy">
                  The Inner Square
                </h2>
                <p className="vogue-label mb-8 leading-relaxed">
                  Love Letter from the Editor-in-Chief, Ms. Wilson. <br /> Join the Bes Outkast Society briefing.
                </p>

                <div className="space-y-4">
                  <button 
                    onClick={() => { setShowNewsletter(false); handleViewChange('inner-square'); }}
                    className="block w-full bg-burgundy text-white py-4 vogue-label hover:bg-gold transition-colors text-center no-underline"
                  >
                    Secure Access
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Site Map Modal */}
      <AnimatePresence>
        {showSitemap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-cream overflow-y-auto"
          >            <div className="min-h-screen p-8 md:p-24 bg-cream">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-24 border-b border-gold pb-8">
                  <h2 className="text-4xl md:text-6xl font-serif italic text-burgundy">Site Map</h2>
                  <button onClick={() => setShowSitemap(false)} className="text-burgundy p-2 hover:text-gold transition-colors">
                    <X className="w-12 h-12" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <div className="space-y-12">
                    <section>
                      <h3 className="vogue-label text-gold mb-6 border-b border-gold/10 pb-2">Main Navigation</h3>
                      <ul className="space-y-4 text-2xl font-serif italic">
                        <li><button onClick={() => { handleViewChange('home'); setShowSitemap(false); }} className="hover:text-gold transition-colors text-left text-burgundy">The News magazine</button></li>
                        <li><a href="https://besoutkastsociety.substack.com/archive" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors text-burgundy">Private Archive</a></li>
                        <li><button onClick={() => { handleViewChange('about'); setShowSitemap(false); }} className="hover:text-gold transition-colors text-left text-burgundy">About Society</button></li>
                        <li><a href="mailto:tracy.wilson@besoutkastsociety.com" className="hover:text-gold transition-colors text-burgundy">Contact</a></li>
                      </ul>
                    </section>
                  </div>

                  <div className="md:col-span-2">
                    <section>
                      <h3 className="vogue-label text-gold mb-6 border-b border-gold/10 pb-2">Journal Vault</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                        {journalData.sections.flatMap(s => s.journals).map((journal) => (
                          <a 
                            key={journal.title} 
                            href={journal.substackUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group cursor-pointer no-underline block space-y-2"
                          >
                            <h4 className="font-serif text-xl italic group-hover:text-gold transition-colors text-burgundy">{journal.title}</h4>
                            <p className="text-[10px] font-body text-charcoal/60 italic line-clamp-1">{journal.description}</p>
                            <p className="vogue-label text-[9px] text-gold tracking-widest">{journal.author}</p>
                          </a>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>

                <div className="mt-32 pt-12 border-t border-gold text-center">
                  <div className="text-xl font-serif tracking-widest font-bold uppercase mb-4 text-burgundy">Bes Outkast Society</div>
                  <p className="vogue-label">
                    Established 2003. All rights reserved.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

