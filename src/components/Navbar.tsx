import { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage, useTheme } from '../context';

const LanguageDropdown = () => {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const options = [
    { code: 'pt' as const, label: 'Portugues' },
    { code: 'en' as const, label: 'English' },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-card-light dark:hover:bg-gray-800 transition-colors text-sm font-medium"
      >
        <span className="uppercase">{lang}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 bg-bg-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg overflow-hidden min-w-[120px] z-50"
          >
            {options.map((opt) => (
              <button
                key={opt.code}
                onClick={() => { setLang(opt.code); setIsOpen(false); }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${lang === opt.code ? 'bg-brand/10 text-brand font-medium' : 'hover:bg-card-light dark:hover:bg-gray-800'}`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    <img src="/logo-light.png" alt="VOA" className="h-6 w-auto block dark:hidden" />
    <img src="/logo-dark.png" alt="VOA" className="h-6 w-auto hidden dark:block" />
    <span className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark">Apps</span>
  </Link>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {!isHome && (
            <Link to="/" className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:text-black dark:hover:text-white transition-colors">
              Apps
            </Link>
          )}

          <div className="flex items-center gap-3 border-l border-border-light dark:border-border-dark pl-8">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-card-light dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <LanguageDropdown />

            <a href="https://usevoa.com" className="bg-brand text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-hover active:bg-brand-active shadow-sm transition-all whitespace-nowrap">
              usevoa.com
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-card-light dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-bg-light dark:bg-bg-dark border-b border-border-light dark:border-border-dark p-6 flex flex-col gap-4 md:hidden"
          >
            {!isHome && (
              <Link
                to="/"
                className="text-lg font-medium text-text-secondary-light dark:text-text-secondary-dark"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Apps
              </Link>
            )}
            <div className="flex items-center justify-between pt-4 border-t border-border-light dark:border-border-dark">
              <button
                onClick={() => {
                  setLang(lang === 'pt' ? 'en' : 'pt');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <span>{lang === 'pt' ? 'English' : 'Portugues'}</span>
              </button>
            </div>
            <a
              href="https://usevoa.com"
              className="bg-brand text-white px-5 py-3 rounded-lg text-center font-medium hover:bg-brand-hover active:bg-brand-active shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              usevoa.com
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
