import { useState } from 'react';
import { ArrowRight, Monitor, Smartphone, Watch, Download, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context';
import { FadeIn } from '../components/motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

type Platform = 'all' | 'macos' | 'ios' | 'watchos' | 'windows' | 'android';

const platformIcons: Record<string, JSX.Element> = {
  macos: <Monitor size={16} />,
  ios: <Smartphone size={16} />,
  watchos: <Watch size={16} />,
  windows: <Monitor size={16} />,
  android: <Smartphone size={16} />,
};

export const AppsPage = () => {
  const { t } = useLanguage();
  const [activePlatform, setActivePlatform] = useState<Platform>('all');

  const platforms: { key: Platform; label: string; hasApps: boolean }[] = [
    { key: 'all', label: t.apps.platforms.all, hasApps: true },
    { key: 'macos', label: t.apps.platforms.macos, hasApps: true },
    { key: 'ios', label: t.apps.platforms.ios, hasApps: false },
    { key: 'watchos', label: t.apps.platforms.watchos, hasApps: false },
    { key: 'windows', label: t.apps.platforms.windows, hasApps: false },
    { key: 'android', label: t.apps.platforms.android, hasApps: false },
  ];

  const filteredApps = activePlatform === 'all'
    ? t.apps.items
    : t.apps.items.filter(app => app.platform === activePlatform);

  return (
    <div className="min-h-screen selection:bg-brand/30 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
      <Helmet>
        <title>Apps — VOA Digital</title>
        <meta name="description" content="Aplicativos criados pela VOA Digital. Ferramentas para facilitar o dia a dia." />
      </Helmet>
      <Navbar />

      <main className="pt-32 md:pt-40 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">

            {/* Left column — Hero (sticky) */}
            <div className="md:sticky md:top-40">
              <FadeIn>
                <span className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  <Sparkles size={14} />
                  {t.apps.badge}
                </span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
                  {t.apps.title}<br />
                  <span className="text-brand">{t.apps.titleHighlight}</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-8 max-w-md">
                  {t.apps.subtitle}
                </p>
              </FadeIn>

              {/* Background glow */}
              <div className="absolute -left-40 top-20 w-[500px] h-[400px] bg-brand/6 dark:bg-brand/4 rounded-full blur-[120px] pointer-events-none" />
            </div>

            {/* Right column — Filters + Apps (scrollable) */}
            <div>
              {/* Platform filter */}
              <FadeIn delay={0.3}>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
                    {platforms.map((p) => (
                      <button
                        key={p.key}
                        onClick={() => setActivePlatform(p.key)}
                        className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          activePlatform === p.key
                            ? 'text-white'
                            : p.hasApps
                              ? 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-light dark:hover:text-text-dark'
                              : 'text-text-secondary-light/40 dark:text-text-secondary-dark/40'
                        }`}
                      >
                        {activePlatform === p.key && (
                          <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 bg-brand rounded-xl"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-1.5">
                          {p.key !== 'all' && platformIcons[p.key]}
                          <span className="hidden sm:inline">{p.label}</span>
                          {p.key !== 'all' && <span className="sm:hidden">{p.key === 'macos' ? 'Mac' : p.key === 'watchos' ? 'Watch' : p.label}</span>}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Apps list */}
              <AnimatePresence mode="wait">
                {filteredApps.length > 0 ? (
                  <motion.div
                    key={activePlatform + '-apps'}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-4"
                  >
                    {filteredApps.map((app, idx) => (
                      <Link
                        key={idx}
                        to={`/${app.slug}`}
                        className="group relative rounded-2xl border border-border-light dark:border-border-dark bg-card-light/60 dark:bg-card-dark/60 backdrop-blur-sm overflow-hidden hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 p-5">
                          <img
                            src={app.icon}
                            alt={app.name}
                            className="w-14 h-14 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-lg font-bold">{app.name}</h2>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-2 py-0.5 rounded-full">
                                {app.badge}
                              </span>
                            </div>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-1">
                              {app.desc}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                              <Download size={12} />
                              {app.price}
                            </span>
                            <span className="text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                              <ArrowRight size={18} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key={activePlatform + '-empty'}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="text-center py-16"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark mb-5">
                      {platformIcons[activePlatform] ? (
                        <span className="text-text-secondary-light dark:text-text-secondary-dark scale-[2]">
                          {platformIcons[activePlatform]}
                        </span>
                      ) : (
                        <Sparkles size={28} className="text-text-secondary-light dark:text-text-secondary-dark" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-1.5">{t.apps.comingSoon}</h3>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark max-w-xs mx-auto">
                      {t.apps.comingSoonDesc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AppsPage;
