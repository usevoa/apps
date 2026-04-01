import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FadeIn, FadeInScale } from '../components/motion';
import { Check, Shield, Zap, Clock, Battery, Eye, Palette, ArrowLeft, Copy, CheckCircle, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// -- Features --

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

// -- i18n --

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
    processing: 'Secure checkout powered by Stripe',
    included: 'Everything in PRO',
    guarantee: 'All future updates within the same major version included.',
    backToMoovoa: 'Back to moovoa',
    termsPrefix: 'By purchasing you agree to our',
    terms: 'Terms of Service',
    and: 'and',
    refund: 'Refund Policy',
    // Checkout step
    checkoutTitle: 'Complete your purchase',
    emailLabel: 'Email',
    emailPlaceholder: 'you@email.com',
    emailHint: 'Your license key will be sent to this email.',
    payButton: 'Pay $3.99',
    backToSummary: 'Back',
    securedBy: 'Secured by Stripe',
    // Success step
    successTitle: 'You\'re all set!',
    successSubtitle: 'Your license key has been activated. A copy was also sent to your email.',
    licenseKeyLabel: 'Your license key',
    copyKey: 'Copy',
    copiedKey: 'Copied!',
    howToActivate: 'Open moovoa → Click "Activate Pro" → Paste your key',
    downloadApp: 'Download moovoa',
    backToHome: 'Back to moovoa page',
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
    processing: 'Checkout seguro via Stripe',
    included: 'Tudo no PRO',
    guarantee: 'Todas as atualizacoes futuras dentro da mesma versao principal incluidas.',
    backToMoovoa: 'Voltar para moovoa',
    termsPrefix: 'Ao comprar voce concorda com nossos',
    terms: 'Termos de Uso',
    and: 'e',
    refund: 'Politica de Reembolso',
    // Checkout step
    checkoutTitle: 'Finalize sua compra',
    emailLabel: 'Email',
    emailPlaceholder: 'voce@email.com',
    emailHint: 'Sua chave de licenca sera enviada para este email.',
    payButton: 'Pagar $3.99',
    backToSummary: 'Voltar',
    securedBy: 'Protegido por Stripe',
    // Success step
    successTitle: 'Tudo pronto!',
    successSubtitle: 'Sua chave de licenca foi ativada. Uma copia tambem foi enviada para seu email.',
    licenseKeyLabel: 'Sua chave de licenca',
    copyKey: 'Copiar',
    copiedKey: 'Copiado!',
    howToActivate: 'Abra o moovoa → Clique em "Activate Pro" → Cole sua chave',
    downloadApp: 'Baixar moovoa',
    backToHome: 'Voltar para pagina do moovoa',
  },
} as const;

// -- Checkout steps --

type Step = 'summary' | 'checkout' | 'success';

// Step 1: Summary (price + buy button)
const SummaryCard = ({ t, onBuy }: { t: typeof i18n['en']; onBuy: () => void }) => (
  <>
    {/* Product header */}
    <div className="flex items-center gap-4 mb-8">
      <img src="/moovoa-icon.png" alt="moovoa PRO" className="w-16 h-16 rounded-xl shadow-md" />
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
      onClick={onBuy}
      className="w-full bg-brand text-white py-4 rounded-xl font-semibold text-lg hover:bg-brand-hover active:bg-brand-active shadow-sm transition-all mb-4"
    >
      {t.buyButton}
    </button>

    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark text-center mb-6">
      {t.processing}
    </p>

    {/* Terms */}
    <div className="border-t border-border-light dark:border-border-dark pt-5">
      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark text-center">
        {t.termsPrefix}{' '}
        <Link to="/legal/terms" className="text-brand hover:underline">{t.terms}</Link>
        {' '}{t.and}{' '}
        <Link to="/legal/refund" className="text-brand hover:underline">{t.refund}</Link>.
      </p>
    </div>
  </>
);

// Step 2: Checkout (email + Stripe payment element)
const CheckoutCard = ({ t, onBack, onSuccess }: { t: typeof i18n['en']; onBack: () => void; onSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = async () => {
    if (!email) return;
    setIsProcessing(true);

    // TODO: Integrate Stripe
    // 1. Call backend to create PaymentIntent with email
    // 2. Confirm payment with Stripe Elements
    // 3. Backend webhook creates Keygen license + sends email
    // 4. Call onSuccess()

    // Placeholder — remove when Stripe is integrated
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-card-light dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <h2 className="font-bold text-lg">{t.checkoutTitle}</h2>
      </div>

      {/* Order summary mini */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark mb-6">
        <div className="flex items-center gap-3">
          <img src="/moovoa-icon.png" alt="moovoa PRO" className="w-10 h-10 rounded-lg" />
          <div>
            <p className="font-medium text-sm">moovoa PRO</p>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{t.priceNote}</p>
          </div>
        </div>
        <p className="font-bold">{t.price}{t.priceSuffix}</p>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">{t.emailLabel}</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
          />
        </div>
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-2">{t.emailHint}</p>
      </div>

      {/* Stripe Payment Element placeholder */}
      <div className="mb-6 p-4 rounded-xl border border-dashed border-border-light dark:border-border-dark bg-card-light/50 dark:bg-card-dark/50 min-h-[120px] flex items-center justify-center">
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          Stripe Payment Element
        </p>
      </div>

      {/* Pay button */}
      <button
        onClick={handlePay}
        disabled={!email || isProcessing}
        className="w-full bg-brand text-white py-4 rounded-xl font-semibold text-lg hover:bg-brand-hover active:bg-brand-active shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        {isProcessing ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {t.payButton}
          </span>
        ) : (
          t.payButton
        )}
      </button>

      <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark text-center flex items-center justify-center gap-1.5">
        <Shield size={12} />
        {t.securedBy}
      </p>
    </>
  );
};

// Step 3: Success (license key)
const SuccessCard = ({ t }: { t: typeof i18n['en'] }) => {
  const [copied, setCopied] = useState(false);

  // TODO: Replace with actual license key from API response
  const licenseKey = 'XXXX-XXXX-XXXX-XXXX-XXXX';

  const handleCopy = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Success icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
          <CheckCircle size={32} className="text-green-500" />
        </div>
      </div>

      <h2 className="font-bold text-xl text-center mb-2">{t.successTitle}</h2>
      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark text-center mb-8">
        {t.successSubtitle}
      </p>

      {/* License key */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary-light dark:text-text-secondary-dark mb-2">
          {t.licenseKeyLabel}
        </p>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl px-4 py-3 text-sm font-mono tracking-wider select-all">
            {licenseKey}
          </code>
          <button
            onClick={handleCopy}
            className="p-3 rounded-xl border border-border-light dark:border-border-dark hover:bg-card-light dark:hover:bg-card-dark transition-colors flex-shrink-0"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-2">
          {copied ? t.copiedKey : t.copyKey}
        </p>
      </div>

      {/* How to activate */}
      <div className="p-4 rounded-xl bg-brand/5 border border-brand/10 mb-6">
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          {t.howToActivate}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <a
          href="/downloads/moovoa.dmg"
          download
          className="w-full bg-brand text-white py-3.5 rounded-xl font-semibold hover:bg-brand-hover active:bg-brand-active shadow-sm transition-all flex items-center justify-center gap-2"
        >
          {t.downloadApp}
        </a>
        <Link
          to="/moovoa"
          className="w-full py-3.5 rounded-xl font-medium text-sm text-text-secondary-light dark:text-text-secondary-dark hover:bg-card-light dark:hover:bg-card-dark transition-colors flex items-center justify-center"
        >
          {t.backToHome}
        </Link>
      </div>
    </>
  );
};

// -- Page --

export const MoovoaProPage = () => {
  const { lang } = useLanguage();
  const t = i18n[lang];
  const features = proFeatures[lang];
  const [step, setStep] = useState<Step>('summary');

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
                <div className="rounded-2xl border border-border-light dark:border-border-dark bg-card-light/50 dark:bg-card-dark/50 p-8 md:p-10 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {step === 'summary' && <SummaryCard t={t} onBuy={() => setStep('checkout')} />}
                      {step === 'checkout' && <CheckoutCard t={t} onBack={() => setStep('summary')} onSuccess={() => setStep('success')} />}
                      {step === 'success' && <SuccessCard t={t} />}
                    </motion.div>
                  </AnimatePresence>
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
