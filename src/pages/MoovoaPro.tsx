import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FadeIn, FadeInScale } from '../components/motion';
import { Check, Shield, Zap, Clock, Battery, Eye, Palette, ArrowLeft } from 'lucide-react';

const proFeatures = {
  en: [
    { icon: Zap, title: '3 movement modes', desc: 'Normal, Smart (natural curves), and Stealth (invisible micro-movements).' },
    { icon: Eye, title: 'Silent Mode', desc: 'Auto-pauses when you use your Mac. Resumes when idle.' },
    { icon: Shield, title: 'Caffeine Mode', desc: 'Completely prevents your Mac from sleeping.' },
    { icon: Clock, title: 'Schedule', desc: 'Set active hours. moovoa pauses outside the window.' },
    { icon: Battery, title: 'Battery Saver', desc: 'Auto-pauses when battery drops below your threshold.' },
    { icon: Palette, title: 'Premium icons', desc: 'Choose from 7+ menu bar icons to personalize moovoa.' },
  ],
  pt: [
    { icon: Zap, title: '3 modos de movimento', desc: 'Normal, Smart (curvas naturais) e Stealth (micro-movimentos invisiveis).' },
    { icon: Eye, title: 'Silent Mode', desc: 'Pausa automaticamente quando voce usa o Mac. Retoma ao ficar idle.' },
    { icon: Shield, title: 'Caffeine Mode', desc: 'Impede completamente que o sistema entre em repouso.' },
    { icon: Clock, title: 'Schedule', desc: 'Defina horarios ativos. O moovoa pausa fora da janela.' },
    { icon: Battery, title: 'Battery Saver', desc: 'Pausa automaticamente quando a bateria cai abaixo do limite.' },
    { icon: Palette, title: 'Icones premium', desc: 'Escolha entre 7+ icones de barra de menu para personalizar o moovoa.' },
  ],
} as const;

const i18n = {
  en: {
    badge: 'One-time purchase',
    title: 'Upgrade to',
    titleHighlight: 'moovoa PRO',
    subtitle: 'Unlock the full power of moovoa with a single payment. No subscriptions, no hidden fees.',
    price: '$3',
    priceSuffix: '.99 USD',
    priceNote: 'One-time payment · Lifetime license',
    buyButton: 'Buy moovoa PRO',
    processing: 'Secure checkout powered by Paddle',
    included: 'Everything in PRO',
    guarantee: 'All future updates within the same major version included.',
    backToMoovoa: 'Back to moovoa',
    termsPrefix: 'By purchasing you agree to our',
    terms: 'Terms of Service',
    and: 'and',
    refund: 'Refund Policy',
  },
  pt: {
    badge: 'Compra unica',
    title: 'Upgrade para',
    titleHighlight: 'moovoa PRO',
    subtitle: 'Desbloqueie todo o poder do moovoa com um unico pagamento. Sem assinaturas, sem taxas ocultas.',
    price: '$3',
    priceSuffix: '.99 USD',
    priceNote: 'Pagamento unico · Licenca vitalicia',
    buyButton: 'Comprar moovoa PRO',
    processing: 'Checkout seguro via Paddle',
    included: 'Tudo no PRO',
    guarantee: 'Todas as atualizacoes futuras dentro da mesma versao principal incluidas.',
    backToMoovoa: 'Voltar para moovoa',
    termsPrefix: 'Ao comprar voce concorda com nossos',
    terms: 'Termos de Uso',
    and: 'e',
    refund: 'Politica de Reembolso',
  },
} as const;

export const MoovoaProPage = () => {
  const { lang } = useLanguage();
  const t = i18n[lang];
  const features = proFeatures[lang];

  const handleBuy = () => {
    // TODO: Integrate Paddle checkout
    // Paddle.Checkout.open({ ... })
    alert('Paddle checkout coming soon');
  };

  return (
    <div className="min-h-screen selection:bg-brand/30 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
      <Helmet>
        <title>moovoa PRO — VOA Digital</title>
        <meta name="description" content="Upgrade to moovoa PRO. Unlock Silent Mode, Caffeine Mode, Schedule, Battery Saver, and more." />
      </Helmet>
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <FadeIn>
            <Link
              to="/moovoa"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-brand transition-colors mb-10"
            >
              <ArrowLeft size={14} />
              {t.backToMoovoa}
            </Link>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: Info */}
            <div>
              <FadeIn>
                <span className="inline-flex items-center gap-1.5 bg-brand/10 text-brand px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-6">
                  {t.badge}
                </span>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
                  {t.title}{' '}
                  <span className="text-brand">{t.titleHighlight}</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-10 max-w-lg">
                  {t.subtitle}
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-widest text-text-secondary-light dark:text-text-secondary-dark">
                    {t.included}
                  </p>
                  {features.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-brand/10 text-brand rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{feature.title}</p>
                          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{feature.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark pt-2 flex items-center gap-1.5">
                    <Check size={12} className="text-brand" />
                    {t.guarantee}
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Right: Checkout card */}
            <FadeInScale delay={0.15}>
              <div className="md:sticky md:top-32">
                <div className="rounded-2xl border border-border-light dark:border-border-dark bg-card-light/50 dark:bg-card-dark/50 p-8 md:p-10">
                  {/* Product header */}
                  <div className="flex items-center gap-4 mb-8">
                    <img
                      src="/moovoa-icon.png"
                      alt="moovoa PRO"
                      className="w-16 h-16 rounded-xl shadow-md"
                    />
                    <div>
                      <h2 className="font-bold text-lg">moovoa PRO</h2>
                      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">macOS 14+</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-tight">{t.price}</span>
                      <span className="text-xl text-text-secondary-light dark:text-text-secondary-dark font-medium">{t.priceSuffix}</span>
                    </div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">{t.priceNote}</p>
                  </div>

                  {/* Buy button */}
                  <button
                    onClick={handleBuy}
                    className="w-full bg-brand text-white py-4 rounded-xl font-semibold text-lg hover:bg-brand-hover active:bg-brand-active shadow-sm transition-all mb-4"
                  >
                    {t.buyButton}
                  </button>

                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark text-center mb-6">
                    {t.processing}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-border-light dark:border-border-dark pt-5">
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark text-center">
                      {t.termsPrefix}{' '}
                      <Link to="/legal/terms" className="text-brand hover:underline">{t.terms}</Link>
                      {' '}{t.and}{' '}
                      <Link to="/legal/refund" className="text-brand hover:underline">{t.refund}</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInScale>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MoovoaProPage;
