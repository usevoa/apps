import { useState } from 'react';
import { ArrowRight, Monitor, Smartphone, Watch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context';
import { FadeIn, Stagger, StaggerItem } from '../components/motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

type Platform = 'all' | 'macos' | 'ios' | 'watchos' | 'windows' | 'android';

const platformIcons: Record<string, JSX.Element> = {
  macos: <Monitor size={14} />,
  ios: <Smartphone size={14} />,
  watchos: <Watch size={14} />,
  windows: <Monitor size={14} />,
  android: <Smartphone size={14} />,
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
      <main className="pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t.apps.title}</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
              {t.apps.subtitle}
            </p>
          </FadeIn>

          {/* Platform filter */}
          <FadeIn delay={0.1} className="mb-10">
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setActivePlatform(p.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activePlatform === p.key
                      ? 'bg-brand text-white'
                      : p.hasApps
                        ? 'bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark hover:border-brand/30'
                        : 'bg-card-light/50 dark:bg-card-dark/50 border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark opacity-60'
                  }`}
                >
                  {p.key !== 'all' && platformIcons[p.key]}
                  {p.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Apps list */}
          {filteredApps.length > 0 ? (
            <Stagger className="grid gap-6" stagger={0.12}>
              {filteredApps.map((app, idx) => (
                <StaggerItem key={idx}>
                  <Link
                    to="/moovoa"
                    className="group flex items-center gap-6 p-6 rounded-2xl border border-border-light dark:border-border-dark bg-card-light/50 dark:bg-card-dark/50 hover:border-brand/30 hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src="/moovoa-icon.png"
                      alt={app.name}
                      className="w-16 h-16 rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-lg font-bold">{app.name}</h2>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-2 py-0.5 rounded-full">
                          {app.badge}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {app.tagline}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-brand flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      {app.cta} <ArrowRight size={16} />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <FadeIn>
              <div className="text-center py-20 text-text-secondary-light dark:text-text-secondary-dark">
                <p className="text-lg">Em breve.</p>
              </div>
            </FadeIn>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AppsPage;
