import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FadeIn } from '../components/motion';
import { Shield, FileText, Scale } from 'lucide-react';

const pages = [
  { id: 'privacy', label: 'Privacy Policy', icon: Shield, path: '/legal/privacy' },
  { id: 'terms', label: 'Terms of Service', icon: FileText, path: '/legal/terms' },
  { id: 'refund', label: 'Refund Policy', icon: Scale, path: '/legal/refund' },
] as const;

type PageId = (typeof pages)[number]['id'];

const PrivacyPolicy = () => (
  <>
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-10">
      Last updated: June 2025 · Effective immediately
    </p>

    <Section title="Overview">
      <p>
        Moovoa is a menu bar utility for macOS. It runs entirely on your device and does not collect, transmit, or store any personal data beyond what is necessary to process your purchase.
      </p>
    </Section>

    <Section title="Information we collect">
      <p>We collect only the minimum information necessary to process your purchase and deliver your license key:</p>
      <ul className="list-disc pl-5 mt-3 space-y-2">
        <li><strong>Email address</strong> — collected by Paddle (our payment processor) at checkout, used to deliver your license key and transaction receipt.</li>
        <li><strong>Payment data</strong> — handled entirely by Paddle, our Merchant of Record. We never see or store your credit card details.</li>
      </ul>
      <p className="mt-3">
        The Moovoa application itself collects no data. There is no telemetry, no analytics, no crash reporting, and no network calls made by the app.
      </p>
    </Section>

    <Section title="How we use your information">
      <ul className="list-disc pl-5 space-y-2">
        <li>To deliver your license key after purchase</li>
        <li>To send your transaction receipt</li>
        <li>To respond to support requests you initiate</li>
      </ul>
      <p className="mt-3">
        We do not use your email for marketing. We do not sell, share, or rent your information to any third party.
      </p>
    </Section>

    <Section title="Third-party services">
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Paddle</strong> — processes payments and acts as Merchant of Record. Paddle handles all payment data, tax compliance, and receipts on our behalf. See Paddle's Privacy Policy.</li>
        <li><strong>Keygen</strong> — manages license key generation and validation. Only your email is associated with your license. See Keygen's Privacy Policy.</li>
      </ul>
    </Section>

    <Section title="Data retention">
      <p>
        Your email and associated license information are retained for as long as your license is active or as required by applicable law. You may request deletion of your data at any time by contacting us.
      </p>
    </Section>

    <Section title="Your rights">
      <p>
        Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise any of these rights, contact us at:
      </p>
      <p className="mt-2">
        <a href="mailto:contato@usevoa.com" className="text-brand hover:underline">contato@usevoa.com</a>
      </p>
    </Section>

    <Section title="Changes to this policy">
      <p>
        We may update this policy as Moovoa evolves. Material changes will be announced on this page with an updated date. Continued use of the app constitutes acceptance of the updated policy.
      </p>
    </Section>

    <Section title="Contact">
      <p>
        Questions? Reach us at{' '}
        <a href="mailto:contato@usevoa.com" className="text-brand hover:underline">contato@usevoa.com</a>
      </p>
    </Section>
  </>
);

const TermsOfService = () => (
  <>
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-10">
      Last updated: June 2025 · Effective immediately
    </p>

    <Section title="Agreement">
      <p>
        By downloading, installing, or using Moovoa, you agree to these Terms of Service. If you do not agree, do not use the software.
      </p>
    </Section>

    <Section title="The software">
      <p>
        Moovoa is a macOS menu bar utility that prevents your Mac from sleeping, locking, or activating the screensaver. It is sold as a one-time purchase and distributed independently outside of the Mac App Store.
      </p>
    </Section>

    <Section title="License">
      <p>
        Upon purchase, you are granted a personal, non-exclusive, non-transferable license to use Moovoa on up to 2 Macs that you own or control.
      </p>
      <p className="mt-3">You may not:</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>Redistribute, sell, or sublicense the software to any third party</li>
        <li>Reverse engineer, decompile, or modify the software</li>
        <li>Use a single license on more machines than permitted</li>
        <li>Share your license key publicly</li>
      </ul>
    </Section>

    <Section title="Purchases and payments">
      <p>
        All purchases are processed by Paddle, our Merchant of Record. By completing a purchase, you also agree to Paddle's Terms of Service.
      </p>
      <p className="mt-3">
        Prices are listed in USD. Applicable taxes are calculated and collected by Paddle based on your location.
      </p>
    </Section>

    <Section title="Refund policy">
      <p>
        All sales are final. Because Moovoa is a digital product that is immediately delivered upon purchase, we do not offer refunds except where required by applicable law.
      </p>
      <p className="mt-3">
        If you experience a technical issue preventing use of the software, contact us at{' '}
        <a href="mailto:contato@usevoa.com" className="text-brand hover:underline">contato@usevoa.com</a>{' '}
        and we will make every effort to resolve it.
      </p>
    </Section>

    <Section title="Updates">
      <p>
        Your license includes access to all future updates within the same major version. We reserve the right to release future major versions as separate paid upgrades, though we will provide reasonable notice before doing so.
      </p>
    </Section>

    <Section title="Disclaimer of warranties">
      <p>
        Moovoa is provided "as is" without warranty of any kind. We do not warrant that the software will be error-free, uninterrupted, or compatible with every system configuration. Use at your own discretion.
      </p>
    </Section>

    <Section title="Limitation of liability">
      <p>
        To the maximum extent permitted by law, VOA shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of Moovoa or inability to use it, even if advised of the possibility of such damages.
      </p>
      <p className="mt-3">
        Our total liability to you for any claim shall not exceed the amount you paid for the software.
      </p>
    </Section>

    <Section title="Governing law">
      <p>
        These terms are governed by the laws of Brazil. Any disputes shall be resolved in the courts of Curitiba, Paraná, Brazil.
      </p>
    </Section>

    <Section title="Changes to these terms">
      <p>
        We may update these terms at any time. Continued use of Moovoa after changes constitutes acceptance of the updated terms. Material changes will be posted on this page with an updated date.
      </p>
    </Section>

    <Section title="Contact">
      <p>
        Questions about these terms? Write to{' '}
        <a href="mailto:contato@usevoa.com" className="text-brand hover:underline">contato@usevoa.com</a>
      </p>
    </Section>
  </>
);

const RefundPolicy = () => (
  <>
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Refund Policy</h1>
    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-10">
      Last updated: June 2025 · Effective immediately
    </p>

    <Section title="All sales are final.">
      <p>
        Moovoa is a digital product. Once purchased, your license key is delivered immediately. Because the product is fully accessible upon purchase, we are generally unable to offer refunds.
      </p>
    </Section>

    <Section title="Why no refunds?">
      <p>
        Unlike physical goods, digital software cannot be "returned." Once a license key is issued, it cannot be un-delivered. This policy allows us to keep prices low and focus on building great software.
      </p>
      <p className="mt-3">We strongly encourage you to:</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>Review the feature list and screenshots on the product page before purchasing</li>
        <li>Check macOS compatibility requirements listed on the site</li>
        <li>Reach out with any pre-purchase questions at{' '}
          <a href="mailto:contato@usevoa.com" className="text-brand hover:underline">contato@usevoa.com</a>
        </li>
      </ul>
    </Section>

    <Section title="Exceptions">
      <p>We will consider a refund in the following situations:</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>You were charged more than once for the same purchase (duplicate billing)</li>
        <li>You never received your license key after purchase and we are unable to resolve it within 48 hours</li>
        <li>Applicable consumer protection law in your jurisdiction requires it (e.g. EU 14-day cooling-off period for distance contracts)</li>
      </ul>
      <p className="mt-3">
        Refund requests based on exceptions are handled by Paddle, our Merchant of Record. You can reach Paddle support directly at paddle.com/support.
      </p>
    </Section>

    <Section title="Technical issues">
      <p>
        If Moovoa is not working as described on your Mac, we want to fix it. Please contact us before assuming a refund is the only option — most issues can be resolved quickly.
      </p>
      <p className="mt-3">
        Write to{' '}
        <a href="mailto:contato@usevoa.com" className="text-brand hover:underline">contato@usevoa.com</a>{' '}
        with a description of your issue and your macOS version.
      </p>
    </Section>

    <Section title="Chargebacks">
      <p>
        If you initiate a chargeback without first contacting us, your license key will be permanently revoked. We encourage you to reach out — we are a small, independent team and we genuinely want to help resolve any issue.
      </p>
    </Section>

    <Section title="Contact">
      <p>
        For any billing or refund question, write to{' '}
        <a href="mailto:contato@usevoa.com" className="text-brand hover:underline">contato@usevoa.com</a>{' '}
        and we'll respond within 1–2 business days.
      </p>
    </Section>
  </>
);

const Section = ({ title, children }: { title: string; children: import('react').ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    <div className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
      {children}
    </div>
  </div>
);

export const LegalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = pages.find(p => p.path === location.pathname)?.id ?? 'privacy';

  useEffect(() => {
    if (location.pathname === '/legal') {
      navigate('/legal/privacy', { replace: true });
    }
  }, [location.pathname, navigate]);

  const titles: Record<PageId, string> = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    refund: 'Refund Policy',
  };

  return (
    <div className="min-h-screen selection:bg-brand/30 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
      <Helmet>
        <title>{titles[currentPage]} — moovoa</title>
        <meta name="description" content={`${titles[currentPage]} for moovoa by VOA Digital.`} />
      </Helmet>
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Content */}
          <FadeIn className="flex-1 min-w-0">
            {currentPage === 'privacy' && <PrivacyPolicy />}
            {currentPage === 'terms' && <TermsOfService />}
            {currentPage === 'refund' && <RefundPolicy />}
          </FadeIn>

          {/* Side nav */}
          <FadeIn delay={0.1} className="md:w-56 flex-shrink-0">
            <div className="md:sticky md:top-32">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary-light dark:text-text-secondary-dark mb-4">
                Legal
              </p>
              <nav className="flex flex-row md:flex-col gap-2">
                {pages.map(page => {
                  const Icon = page.icon;
                  const isActive = currentPage === page.id;
                  return (
                    <button
                      key={page.id}
                      onClick={() => navigate(page.path)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left w-full ${
                        isActive
                          ? 'bg-brand/10 text-brand'
                          : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-card-light dark:hover:bg-card-dark'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="hidden md:inline">{page.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
