import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Instagram, Linkedin, Mail, Search, Globe, Sparkles, Loader2 } from 'lucide-react';
import { COLUMNS } from './constants';
import { AboutPage } from './components/AboutPage';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');
  
  // STATIC IMAGE STATES - Change these strings to your new filenames to update the site
  const [legendaryImage, setLegendaryImage] = useState<string | null>('/ledrule.jpg');
  const [forgeImage, setForgeImage] = useState<string | null>('https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=80');
  
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);

  const handleViewChange = (view: 'home' | 'about') => {
    setCurrentView(view);
    if (view === 'about') {
      window.history.pushState({ view: 'about' }, '', '/about');
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
        setCurrentView(window.location.pathname === '/about' ? 'about' : 'home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    if (window.location.pathname === '/about') {
      setCurrentView('about');
    }

    const timer = setTimeout(() => {
      setShowNewsletter(true);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
      clearTimeout(timer);
    };
  }, []);

  // Column Data Mapping
  const edgeOfTheWorld = COLUMNS.find(c => c.title === "Edge of the World");
  const blackManOnTheRun = COLUMNS.find(c => c.title === "Black Man on the Run");
  const fashionWithJuan = COLUMNS.find(c => c.title === "Fashion with Juan");
  const wealthProtocol = COLUMNS.find(c => c.title === "The Wealth Protocol");
  const tacticalAdvantage = COLUMNS.find(c => c.title === "The Tactical Advantage");
  const innerSquare = COLUMNS.find(c => c.title === "The Inner Square");
  const whiskeyAngels = COLUMNS.find(c => c.title === "Whiskey with the Angels");
  const legendaryRule = COLUMNS.find(c => c.title === "Legendary Rule");
  const askFred = COLUMNS.find(c => c.url.includes("ask-fred"));
  const theForge = COLUMNS.find(c => c.url.includes("the-forge"));

  const tickerItems = [
    "Politico Discord with Brandon Prescott",
    "Southern Grit with Jimi Holler",
    "The Forge",
    "Legendary Rule",
    "The Digital Arena with Tammy Gale",
    "Run Out Boyz"
  ];

  return (
    <div className="min-h-screen bg-paper selection:bg-ink selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-paper/95 backdrop-blur-md border-b border-ink' : 'bg-transparent'
      }`}>
        <div className="border-b border-ink py-4 px-8">
          <div className="max-w-[1600px] mx-auto flex justify-between items-center">
            <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-2 nav-link font-bold uppercase tracking-widest text-[10px]">
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </button>
            
            <div className="flex flex-col items-center cursor-pointer" onClick={() => handleViewChange('home')}>
              <div className="text-2xl sm:text-4xl font-serif tracking-[0.2em] text-ink font-bold uppercase">
                Bes Outkast Society
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button onClick={() => setShowNewsletter(true)} className="bg-ink text-paper px-6 py-2 text-[10px] font-display uppercase tracking-widest hover:bg-muted transition-colors font-bold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-paper z-[60] flex flex-col">
            <div className="flex justify-between items-center p-8 border-b border-ink">
              <div className="text-xl font-serif tracking-widest font-bold uppercase">Bes Outkast Society</div>
              <button onClick={() => setIsMenuOpen(false)} className="text-ink p-2"><X className="w-8 h-8" /></button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto py-24 px-8 flex flex-col gap-8">
                {[
                  { name: 'The News magazine', url: 'https://besoutkastsociety.substack.com' },
                  { name: 'Columns', url: 'https://besoutkastsociety.substack.com/archive' },
                  { name: 'About Society', action: () => { handleViewChange('about'); setIsMenuOpen(false); } },
                  { name: 'Contact', url: 'mailto:tracydwilson@besheanwe.com' }
                ].map((item, i) => (
                  'url' in item ? (
                    <motion.a key={item.name} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }} href={item.url} target="_blank" rel="noopener noreferrer" className="text-5xl sm:text-7xl font-serif text-ink hover:italic transition-all border-b border-ink/10 pb-4 no-underline">
                      {item.name}
                    </motion.a>
                  ) : (
                    <motion.button key={item.name} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }} onClick={item.action} className="text-5xl sm:text-7xl font-serif text-ink hover:italic transition-all border-b border-ink/10 pb-4 text-left w-full">
                      {item.name}
                    </motion.button>
                  )
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.main key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-[100px]">
            {/* HERO SECTION */}
            <section className="relative h-[90vh] w-full overflow-hidden border-b border-ink">
              <img src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1920&q=90" alt="Hero" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 bg-ink/30" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-5xl">
                  <span className="font-display text-xs uppercase tracking-[0.5em] text-paper mb-6 block font-bold">Quarterly News magazine of Distinction</span>
                  <h1 className="text-6xl md:text-9xl font-serif italic text-paper leading-[0.9] mb-8">The Art of <br /> Extreme Persuasion</h1>
                  <a href="https://besoutkastsociety.substack.com/archive" target="_blank" className="bg-paper text-ink px-10 py-4 font-display text-xs uppercase tracking-[0.3em] font-bold hover:bg-ink hover:text-paper transition-all no-underline inline-block">Enter the Archive</a>
                </motion.div>
              </div>
            </section>

            {/* BENTO GRID SECTION */}
            <section className="px-8 py-12 border-b border-ink">
              <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 border-ink border">
                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 border-r border-ink">
                  <div className="md:col-span-2 md:row-span-2 border-b border-ink relative group overflow-hidden h-[600px]">
                    <img src={edgeOfTheWorld?.image} alt="Edge" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    <div className="absolute bottom-12 left-12 text-paper">
                      <span className="font-display text-xs uppercase tracking-[0.3em] mb-4 block font-bold">Edge of the World</span>
                      <h3 className="text-5xl font-serif italic">The Ultimate Outdoorsman</h3>
                    </div>
                  </div>
                  <div className="border-b border-ink border-l border-ink relative group overflow-hidden h-[300px]">
                    <img src={blackManOnTheRun?.image} alt="Run" className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="bg-paper flex items-center justify-center p-8 border-b border-ink border-l border-ink h-[300px]">
                    <h2 className="text-2xl font-display font-bold tracking-[0.4em] text-red-600 text-center">FOR THE LOVE <br /> OF THE DARE</h2>
                  </div>
                </div>
                {/* SIDEBAR */}
                <aside className="lg:col-span-3 bg-grey p-8 sticky top-[100px] h-fit">
                   <h2 className="font-display text-sm font-bold tracking-[0.2em] uppercase border-b border-ink pb-4 mb-8">The Index</h2>
                   <ul className="space-y-6">
                      <li className="font-serif text-lg italic italic hover:text-muted cursor-pointer transition-colors border-b border-ink/10 pb-2">"The Wealth Protocol"</li>
                      <li className="font-serif text-lg italic italic hover:text-muted cursor-pointer transition-colors border-b border-ink/10 pb-2">"The Tactical Advantage"</li>
                      <li className="font-serif text-lg italic italic hover:text-muted cursor-pointer transition-colors border-b border-ink/10 pb-2">"The Inner Square"</li>
                   </ul>
                </aside>
              </div>
            </section>

            {/* FOUNDATIONAL PILLARS (The 2-Column Section) */}
            <section className="px-8 py-24 bg-paper">
              <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border-ink border">
                <div className="bg-ink text-paper p-12 md:p-24 border-r border-ink">
                  <h2 className="text-5xl font-serif italic mb-8">Legendary Rule</h2>
                  <div className="aspect-video overflow-hidden mb-8 border border-paper/10">
                    <img src={legendaryImage || ''} alt="Static Rule" className="w-full h-full object-cover" />
                  </div>
                  <p className
