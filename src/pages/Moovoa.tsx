import { Download, ShoppingCart, Monitor, Wrench } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context';
import { FadeIn, FadeInScale, Stagger, StaggerItem } from '../components/motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { motion } from 'motion/react';

const PRO_URL = 'https://www.creem.io/payment/prod_3NXD9zsFFN81PyTZaxMspO';

export const MoovoaPage = () => {
  const { t } = useLanguage();
  const m = t.moovoa;

  return (
    <div className="min-h-screen selection:bg-brand/30 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
      <Helmet>
        <title>moovoa — VOA Digital</title>
        <meta name="description" content="moovoa mantém seu Mac acordado movendo o cursor automaticamente. Download gratuito para macOS." />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-10 md:pt-44 md:pb-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn>
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 bg-brand/10 text-brand px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                    {m.hero.badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 text-text-secondary-light dark:text-text-secondary-dark px-3 py-1 rounded-lg text-xs font-medium">
                    <Monitor size={12} /> macOS 11+
                  </span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                  {m.hero.title}<br />
                  <span className="text-brand">{m.hero.titleHighlight}</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8 leading-relaxed max-w-lg">
                  {m.hero.subtitle}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <a
                    href="/downloads/moovoa.dmg"
                    download
                    className="bg-brand text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-brand-hover active:bg-brand-active shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    {m.download.button}
                    <span className="text-white/60 text-sm ml-1">({m.download.size})</span>
                  </a>
                  <a
                    href={PRO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border-light dark:border-border-dark px-6 py-3.5 rounded-lg font-semibold hover:bg-card-light dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    {m.download.pro}
                  </a>
                </div>
                {/* Windows coming soon */}
                <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  <Wrench size={14} />
                  <span>{m.download.windowsSoon}</span>
                </div>
              </FadeIn>
            </div>

            {/* App preview */}
            <FadeInScale delay={0.2}>
              <div className="relative flex justify-center">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <img
                    src="/moovoa-screenshot.svg"
                    alt="moovoa app"
                    className="w-[320px] md:w-[360px] rounded-2xl shadow-2xl"
                  />
                  <img
                    src="/moovoa-icon.png"
                    alt="moovoa icon"
                    className="absolute -bottom-6 -right-6 w-20 h-20 rounded-2xl shadow-xl border-4 border-bg-light dark:border-bg-dark"
                  />
                </motion.div>
              </div>
            </FadeInScale>
          </div>
        </section>

        {/* Requirements pill */}
        <section className="py-6 px-6">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                <span className="inline-flex items-center gap-1.5 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark px-4 py-2 rounded-full">
                  <Monitor size={14} />
                  {m.download.requirement}
                </span>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="mb-14">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{m.features.title}</h2>
            </FadeIn>

            <Stagger className="grid sm:grid-cols-2 gap-5" stagger={0.08}>
              {m.features.items.map((feature, idx) => (
                <StaggerItem key={idx}>
                  <div className="p-6 rounded-2xl border border-border-light dark:border-border-dark bg-card-light/50 dark:bg-card-dark/50 h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold">{feature.title}</h3>
                      {feature.pro && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-2 py-0.5 rounded-full">
                          PRO
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* PRO */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <FadeInScale>
              <div className="bg-black dark:bg-card-dark rounded-[2rem] p-8 md:p-14 text-white relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{m.download.pro}</h3>
                    <p className="text-white/70 leading-relaxed mb-6">{m.download.proDesc}</p>
                    <a
                      href={PRO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-hover transition-all"
                    >
                      <ShoppingCart size={18} />
                      {m.download.pro}
                    </a>
                  </div>
                  <img
                    src="/moovoa-icon.png"
                    alt="moovoa PRO"
                    className="w-28 h-28 rounded-2xl shadow-lg flex-shrink-0 opacity-90"
                  />
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand/20 rounded-full blur-3xl"></div>
              </div>
            </FadeInScale>
          </div>
        </section>

        {/* Install */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="mb-10">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{m.install.title}</h2>
            </FadeIn>

            <Stagger className="grid gap-4" stagger={0.1}>
              {m.install.steps.map((step, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex items-start gap-4 p-5 rounded-xl border border-border-light dark:border-border-dark bg-card-light/50 dark:bg-card-dark/50">
                    <div className="w-8 h-8 bg-brand/10 text-brand rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="text-center">
              <a
                href="/downloads/moovoa.dmg"
                download
                className="inline-flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand-hover active:bg-brand-active shadow-sm transition-all"
              >
                <Download size={20} />
                {m.download.button}
              </a>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default MoovoaPage;
