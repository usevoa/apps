import { useState } from 'react';
import { ArrowRight, Monitor, Smartphone, Watch, Download, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context';
import { FadeIn, FadeInScale, Stagger, StaggerItem } from '../components/motion';
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

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-6 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand/8 dark:bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative max-w-5xl mx-auto text-center">
            <FadeIn>
              <span className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles size={14} />
                {t.apps.badge}
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                {t.apps.title}<br />
                <span className="text-brand">{t.apps.titleHighlight}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto leading-relaxed">
                {t.apps.subtitle}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Platform filter */}
        <section className="px-6 pb-8">
          <div className="max-w-5xl mx-auto">
            <FadeIn delay={0.3}>
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark">
                  {platforms.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setActivePlatform(p.key)}
                      className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
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
          </div>
        </section>

        {/* Apps */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {filteredApps.length > 0 ? (
                <motion.div
                  key={activePlatform + '-apps'}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-8"
                >
                  {/* Featured app — large card */}
                  {filteredApps.map((app, idx) => (
                    <Link
                      key={idx}
                      to={`/${app.slug}`}
                      className="group relative rounded-3xl border border-border-light dark:border-border-dark bg-card-light/60 dark:bg-card-dark/60 backdrop-blur-sm overflow-hidden hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/5 transition-all duration-500"
                    >
                      <div className="grid md:grid-cols-[1fr,auto] gap-0">
                        {/* Content */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-6">
                            <img
                              src={app.icon}
                              alt={app.name}
                              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                            />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-2xl md:text-3xl font-bold">{app.name}</h2>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-2.5 py-1 rounded-full">
                                  {app.badge}
                                </span>
                              </div>
                              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-medium">
                                {app.tagline}
                              </p>
                            </div>
                          </div>

                          <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-8 max-w-lg">
                            {app.desc}
                          </p>

                          <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-xl text-sm font-semibold group-hover:bg-brand-hover transition-colors">
                              {app.cta}
                              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 dark:text-green-400">
                              <Download size={14} />
                              {app.price}
                            </span>
                          </div>
                        </div>

                        {/* Screenshot */}
                        <div className="hidden md:flex items-end justify-center px-8 pb-0 pt-8">
                          <motion.img
                            src={app.screenshot}
                            alt={`${app.name} preview`}
                            className="w-[280px] rounded-t-2xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        </div>
                      </div>

                      {/* Subtle gradient accent */}
                      <div className="absolute top-0 right-0 w-80 h-80 bg-brand/5 dark:bg-brand/3 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3 group-hover:bg-brand/10 transition-colors duration-500" />
                    </Link>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={activePlatform + '-empty'}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-24"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark mb-6">
                    {platformIcons[activePlatform] ? (
                      <span className="text-text-secondary-light dark:text-text-secondary-dark scale-[2.5]">
                        {platformIcons[activePlatform]}
                      </span>
                    ) : (
                      <Sparkles size={32} className="text-text-secondary-light dark:text-text-secondary-dark" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.apps.comingSoon}</h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-sm mx-auto">
                    {t.apps.comingSoonDesc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AppsPage;
