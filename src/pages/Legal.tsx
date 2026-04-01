import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FadeIn } from '../components/motion';
import { Shield, FileText, Scale } from 'lucide-react';
import { useLanguage } from '../context';

const email = <a href="mailto:contato@usevoa.com" className="text-brand hover:underline">contato@usevoa.com</a>;

const i18n = {
  en: {
    sidebarTitle: 'Legal',
    pages: [
      { id: 'privacy', label: 'Privacy Policy', icon: Shield, path: '/legal/privacy' },
      { id: 'terms', label: 'Terms of Service', icon: FileText, path: '/legal/terms' },
      { id: 'refund', label: 'Refund Policy', icon: Scale, path: '/legal/refund' },
    ],
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: June 2025 · Effective immediately',
      sections: [
        { title: 'Overview', content: 'Moovoa is a menu bar utility for macOS. It runs entirely on your device and does not collect, transmit, or store any personal data beyond what is necessary to process your purchase.' },
        { title: 'Information we collect', list: true },
        { title: 'How we use your information', list: true },
        { title: 'Third-party services', list: true },
        { title: 'Data retention', content: 'Your email and associated license information are retained for as long as your license is active or as required by applicable law. You may request deletion of your data at any time by contacting us.' },
        { title: 'Your rights', content: 'Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise any of these rights, contact us.' },
        { title: 'Changes to this policy', content: 'We may update this policy as Moovoa evolves. Material changes will be announced on this page with an updated date. Continued use of the app constitutes acceptance of the updated policy.' },
      ],
    },
    terms: {
      title: 'Terms of Service',
      updated: 'Last updated: June 2025 · Effective immediately',
    },
    refund: {
      title: 'Refund Policy',
      updated: 'Last updated: June 2025 · Effective immediately',
    },
  },
  pt: {
    sidebarTitle: 'Legal',
    pages: [
      { id: 'privacy', label: 'Privacidade', icon: Shield, path: '/legal/privacy' },
      { id: 'terms', label: 'Termos de Uso', icon: FileText, path: '/legal/terms' },
      { id: 'refund', label: 'Reembolso', icon: Scale, path: '/legal/refund' },
    ],
    privacy: {
      title: 'Politica de Privacidade',
      updated: 'Ultima atualizacao: Junho 2025 · Vigente imediatamente',
    },
    terms: {
      title: 'Termos de Uso',
      updated: 'Ultima atualizacao: Junho 2025 · Vigente imediatamente',
    },
    refund: {
      title: 'Politica de Reembolso',
      updated: 'Ultima atualizacao: Junho 2025 · Vigente imediatamente',
    },
  },
} as const;

// -- Section component --

const Section = ({ title, children }: { title: string; children: import('react').ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    <div className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
      {children}
    </div>
  </div>
);

// -- EN content --

const PrivacyEN = () => (
  <>
    <Section title="Overview">
      <p>Moovoa is a menu bar utility for macOS. It runs entirely on your device and does not collect, transmit, or store any personal data beyond what is necessary to process your purchase.</p>
    </Section>
    <Section title="Information we collect">
      <p>We collect only the minimum information necessary to process your purchase and deliver your license key:</p>
      <ul className="list-disc pl-5 mt-3 space-y-2">
        <li><strong>Email address</strong> — collected by Paddle (our payment processor) at checkout, used to deliver your license key and transaction receipt.</li>
        <li><strong>Payment data</strong> — handled entirely by Paddle, our Merchant of Record. We never see or store your credit card details.</li>
      </ul>
      <p className="mt-3">The Moovoa application itself collects no data. There is no telemetry, no analytics, no crash reporting, and no network calls made by the app.</p>
    </Section>
    <Section title="How we use your information">
      <ul className="list-disc pl-5 space-y-2">
        <li>To deliver your license key after purchase</li>
        <li>To send your transaction receipt</li>
        <li>To respond to support requests you initiate</li>
      </ul>
      <p className="mt-3">We do not use your email for marketing. We do not sell, share, or rent your information to any third party.</p>
    </Section>
    <Section title="Third-party services">
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Paddle</strong> — processes payments and acts as Merchant of Record. Paddle handles all payment data, tax compliance, and receipts on our behalf. See Paddle's Privacy Policy.</li>
        <li><strong>Keygen</strong> — manages license key generation and validation. Only your email is associated with your license. See Keygen's Privacy Policy.</li>
      </ul>
    </Section>
    <Section title="Data retention">
      <p>Your email and associated license information are retained for as long as your license is active or as required by applicable law. You may request deletion of your data at any time by contacting us.</p>
    </Section>
    <Section title="Your rights">
      <p>Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise any of these rights, contact us at:</p>
      <p className="mt-2">{email}</p>
    </Section>
    <Section title="Changes to this policy">
      <p>We may update this policy as Moovoa evolves. Material changes will be announced on this page with an updated date. Continued use of the app constitutes acceptance of the updated policy.</p>
    </Section>
    <Section title="Contact">
      <p>Questions? Reach us at {email}</p>
    </Section>
  </>
);

const TermsEN = () => (
  <>
    <Section title="Agreement">
      <p>By downloading, installing, or using Moovoa, you agree to these Terms of Service. If you do not agree, do not use the software.</p>
    </Section>
    <Section title="The software">
      <p>Moovoa is a macOS menu bar utility that prevents your Mac from sleeping, locking, or activating the screensaver. It is sold as a one-time purchase and distributed independently outside of the Mac App Store.</p>
    </Section>
    <Section title="License">
      <p>Upon purchase, you are granted a personal, non-exclusive, non-transferable license to use Moovoa on up to 2 Macs that you own or control.</p>
      <p className="mt-3">You may not:</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>Redistribute, sell, or sublicense the software to any third party</li>
        <li>Reverse engineer, decompile, or modify the software</li>
        <li>Use a single license on more machines than permitted</li>
        <li>Share your license key publicly</li>
      </ul>
    </Section>
    <Section title="Purchases and payments">
      <p>All purchases are processed by Paddle, our Merchant of Record. By completing a purchase, you also agree to Paddle's Terms of Service.</p>
      <p className="mt-3">Prices are listed in USD. Applicable taxes are calculated and collected by Paddle based on your location.</p>
    </Section>
    <Section title="Refund policy">
      <p>All sales are final. Because Moovoa is a digital product that is immediately delivered upon purchase, we do not offer refunds except where required by applicable law.</p>
      <p className="mt-3">If you experience a technical issue preventing use of the software, contact us at {email} and we will make every effort to resolve it.</p>
    </Section>
    <Section title="Updates">
      <p>Your license includes access to all future updates within the same major version. We reserve the right to release future major versions as separate paid upgrades, though we will provide reasonable notice before doing so.</p>
    </Section>
    <Section title="Disclaimer of warranties">
      <p>Moovoa is provided "as is" without warranty of any kind. We do not warrant that the software will be error-free, uninterrupted, or compatible with every system configuration. Use at your own discretion.</p>
    </Section>
    <Section title="Limitation of liability">
      <p>To the maximum extent permitted by law, VOA shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of Moovoa or inability to use it, even if advised of the possibility of such damages.</p>
      <p className="mt-3">Our total liability to you for any claim shall not exceed the amount you paid for the software.</p>
    </Section>
    <Section title="Governing law">
      <p>These terms are governed by the laws of Brazil. Any disputes shall be resolved in the courts of Curitiba, Parana, Brazil.</p>
    </Section>
    <Section title="Changes to these terms">
      <p>We may update these terms at any time. Continued use of Moovoa after changes constitutes acceptance of the updated terms. Material changes will be posted on this page with an updated date.</p>
    </Section>
    <Section title="Contact">
      <p>Questions about these terms? Write to {email}</p>
    </Section>
  </>
);

const RefundEN = () => (
  <>
    <Section title="All sales are final.">
      <p>Moovoa is a digital product. Once purchased, your license key is delivered immediately. Because the product is fully accessible upon purchase, we are generally unable to offer refunds.</p>
    </Section>
    <Section title="Why no refunds?">
      <p>Unlike physical goods, digital software cannot be "returned." Once a license key is issued, it cannot be un-delivered. This policy allows us to keep prices low and focus on building great software.</p>
      <p className="mt-3">We strongly encourage you to:</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>Review the feature list and screenshots on the product page before purchasing</li>
        <li>Check macOS compatibility requirements listed on the site</li>
        <li>Reach out with any pre-purchase questions at {email}</li>
      </ul>
    </Section>
    <Section title="Exceptions">
      <p>We will consider a refund in the following situations:</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>You were charged more than once for the same purchase (duplicate billing)</li>
        <li>You never received your license key after purchase and we are unable to resolve it within 48 hours</li>
        <li>Applicable consumer protection law in your jurisdiction requires it (e.g. EU 14-day cooling-off period for distance contracts)</li>
      </ul>
      <p className="mt-3">Refund requests based on exceptions are handled by Paddle, our Merchant of Record. You can reach Paddle support directly at paddle.com/support.</p>
    </Section>
    <Section title="Technical issues">
      <p>If Moovoa is not working as described on your Mac, we want to fix it. Please contact us before assuming a refund is the only option — most issues can be resolved quickly.</p>
      <p className="mt-3">Write to {email} with a description of your issue and your macOS version.</p>
    </Section>
    <Section title="Chargebacks">
      <p>If you initiate a chargeback without first contacting us, your license key will be permanently revoked. We encourage you to reach out — we are a small, independent team and we genuinely want to help resolve any issue.</p>
    </Section>
    <Section title="Contact">
      <p>For any billing or refund question, write to {email} and we'll respond within 1–2 business days.</p>
    </Section>
  </>
);

// -- PT-BR content --

const PrivacyPT = () => (
  <>
    <Section title="Visao geral">
      <p>O Moovoa e um utilitario de barra de menu para macOS. Ele funciona inteiramente no seu dispositivo e nao coleta, transmite ou armazena nenhum dado pessoal alem do necessario para processar sua compra.</p>
    </Section>
    <Section title="Informacoes que coletamos">
      <p>Coletamos apenas o minimo necessario para processar sua compra e entregar sua chave de licenca:</p>
      <ul className="list-disc pl-5 mt-3 space-y-2">
        <li><strong>Endereco de e-mail</strong> — coletado pelo Paddle (nosso processador de pagamentos) no checkout, usado para entregar sua chave de licenca e recibo da transacao.</li>
        <li><strong>Dados de pagamento</strong> — tratados inteiramente pelo Paddle, nosso Merchant of Record. Nos nunca vemos ou armazenamos os dados do seu cartao de credito.</li>
      </ul>
      <p className="mt-3">O aplicativo Moovoa em si nao coleta nenhum dado. Nao ha telemetria, analytics, relatorio de erros, nem chamadas de rede feitas pelo app.</p>
    </Section>
    <Section title="Como usamos suas informacoes">
      <ul className="list-disc pl-5 space-y-2">
        <li>Para entregar sua chave de licenca apos a compra</li>
        <li>Para enviar o recibo da transacao</li>
        <li>Para responder a solicitacoes de suporte que voce iniciar</li>
      </ul>
      <p className="mt-3">Nao usamos seu e-mail para marketing. Nao vendemos, compartilhamos ou alugamos suas informacoes para terceiros.</p>
    </Section>
    <Section title="Servicos de terceiros">
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Paddle</strong> — processa pagamentos e atua como Merchant of Record. O Paddle lida com todos os dados de pagamento, conformidade fiscal e recibos em nosso nome. Consulte a Politica de Privacidade do Paddle.</li>
        <li><strong>Keygen</strong> — gerencia a geracao e validacao de chaves de licenca. Apenas seu e-mail e associado a sua licenca. Consulte a Politica de Privacidade do Keygen.</li>
      </ul>
    </Section>
    <Section title="Retencao de dados">
      <p>Seu e-mail e informacoes de licenca associadas sao retidos enquanto sua licenca estiver ativa ou conforme exigido pela legislacao aplicavel. Voce pode solicitar a exclusao dos seus dados a qualquer momento entrando em contato conosco.</p>
    </Section>
    <Section title="Seus direitos">
      <p>Dependendo da sua localizacao, voce pode ter o direito de acessar, corrigir ou excluir seus dados pessoais. Para exercer qualquer um desses direitos, entre em contato conosco em:</p>
      <p className="mt-2">{email}</p>
    </Section>
    <Section title="Alteracoes nesta politica">
      <p>Podemos atualizar esta politica conforme o Moovoa evolui. Alteracoes significativas serao anunciadas nesta pagina com uma data atualizada. O uso continuado do app constitui aceitacao da politica atualizada.</p>
    </Section>
    <Section title="Contato">
      <p>Duvidas? Entre em contato pelo {email}</p>
    </Section>
  </>
);

const TermsPT = () => (
  <>
    <Section title="Acordo">
      <p>Ao baixar, instalar ou usar o Moovoa, voce concorda com estes Termos de Uso. Se nao concordar, nao use o software.</p>
    </Section>
    <Section title="O software">
      <p>O Moovoa e um utilitario de barra de menu para macOS que impede seu Mac de entrar em repouso, bloquear ou ativar a protecao de tela. E vendido como compra unica e distribuido independentemente fora da Mac App Store.</p>
    </Section>
    <Section title="Licenca">
      <p>Apos a compra, voce recebe uma licenca pessoal, nao exclusiva e intransferivel para usar o Moovoa em ate 2 Macs que voce possua ou controle.</p>
      <p className="mt-3">Voce nao pode:</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>Redistribuir, vender ou sublicenciar o software para terceiros</li>
        <li>Fazer engenharia reversa, descompilar ou modificar o software</li>
        <li>Usar uma unica licenca em mais maquinas do que o permitido</li>
        <li>Compartilhar sua chave de licenca publicamente</li>
      </ul>
    </Section>
    <Section title="Compras e pagamentos">
      <p>Todas as compras sao processadas pelo Paddle, nosso Merchant of Record. Ao concluir uma compra, voce tambem concorda com os Termos de Servico do Paddle.</p>
      <p className="mt-3">Os precos sao listados em USD. Impostos aplicaveis sao calculados e cobrados pelo Paddle com base na sua localizacao.</p>
    </Section>
    <Section title="Politica de reembolso">
      <p>Todas as vendas sao finais. Como o Moovoa e um produto digital entregue imediatamente apos a compra, nao oferecemos reembolsos, exceto quando exigido pela legislacao aplicavel.</p>
      <p className="mt-3">Se voce tiver um problema tecnico que impeca o uso do software, entre em contato pelo {email} e faremos todo o possivel para resolver.</p>
    </Section>
    <Section title="Atualizacoes">
      <p>Sua licenca inclui acesso a todas as atualizacoes futuras dentro da mesma versao principal. Nos reservamos o direito de lancar futuras versoes principais como upgrades pagos separados, embora forneceremos aviso previo razoavel antes de faze-lo.</p>
    </Section>
    <Section title="Isencao de garantias">
      <p>O Moovoa e fornecido "como esta", sem garantia de qualquer tipo. Nao garantimos que o software sera livre de erros, ininterrupto ou compativel com todas as configuracoes de sistema. Use a seu proprio criterio.</p>
    </Section>
    <Section title="Limitacao de responsabilidade">
      <p>Na extensao maxima permitida por lei, a VOA nao sera responsavel por quaisquer danos indiretos, incidentais, especiais ou consequentes decorrentes do uso do Moovoa ou da incapacidade de usa-lo, mesmo se avisada da possibilidade de tais danos.</p>
      <p className="mt-3">Nossa responsabilidade total perante voce por qualquer reclamacao nao excedera o valor que voce pagou pelo software.</p>
    </Section>
    <Section title="Legislacao aplicavel">
      <p>Estes termos sao regidos pelas leis do Brasil. Quaisquer disputas serao resolvidas nos tribunais de Curitiba, Parana, Brasil.</p>
    </Section>
    <Section title="Alteracoes nestes termos">
      <p>Podemos atualizar estes termos a qualquer momento. O uso continuado do Moovoa apos as alteracoes constitui aceitacao dos termos atualizados. Alteracoes significativas serao publicadas nesta pagina com uma data atualizada.</p>
    </Section>
    <Section title="Contato">
      <p>Duvidas sobre estes termos? Escreva para {email}</p>
    </Section>
  </>
);

const RefundPT = () => (
  <>
    <Section title="Todas as vendas sao finais.">
      <p>O Moovoa e um produto digital. Uma vez comprado, sua chave de licenca e entregue imediatamente. Como o produto e totalmente acessivel apos a compra, geralmente nao oferecemos reembolsos.</p>
    </Section>
    <Section title="Por que nao ha reembolsos?">
      <p>Diferente de bens fisicos, software digital nao pode ser "devolvido". Uma vez que uma chave de licenca e emitida, ela nao pode ser des-entregue. Esta politica nos permite manter precos baixos e focar em construir um otimo software.</p>
      <p className="mt-3">Recomendamos fortemente que voce:</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>Revise a lista de funcionalidades e capturas de tela na pagina do produto antes de comprar</li>
        <li>Verifique os requisitos de compatibilidade do macOS listados no site</li>
        <li>Entre em contato com qualquer duvida antes da compra pelo {email}</li>
      </ul>
    </Section>
    <Section title="Excecoes">
      <p>Consideraremos um reembolso nas seguintes situacoes:</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>Voce foi cobrado mais de uma vez pela mesma compra (cobranca duplicada)</li>
        <li>Voce nunca recebeu sua chave de licenca apos a compra e nao conseguimos resolver em 48 horas</li>
        <li>A legislacao de protecao ao consumidor aplicavel na sua jurisdicao exige (ex: periodo de reflexao de 14 dias da UE para contratos a distancia)</li>
      </ul>
      <p className="mt-3">Solicitacoes de reembolso baseadas em excecoes sao tratadas pelo Paddle, nosso Merchant of Record. Voce pode entrar em contato com o suporte do Paddle diretamente em paddle.com/support.</p>
    </Section>
    <Section title="Problemas tecnicos">
      <p>Se o Moovoa nao esta funcionando conforme descrito no seu Mac, queremos corrigir. Por favor, entre em contato antes de assumir que um reembolso e a unica opcao — a maioria dos problemas pode ser resolvida rapidamente.</p>
      <p className="mt-3">Escreva para {email} com uma descricao do seu problema e a versao do seu macOS.</p>
    </Section>
    <Section title="Chargebacks">
      <p>Se voce iniciar um chargeback sem entrar em contato conosco primeiro, sua chave de licenca sera permanentemente revogada. Encorajamos voce a nos procurar — somos uma equipe pequena e independente e genuinamente queremos ajudar a resolver qualquer problema.</p>
    </Section>
    <Section title="Contato">
      <p>Para qualquer duvida sobre cobranca ou reembolso, escreva para {email} e responderemos em 1–2 dias uteis.</p>
    </Section>
  </>
);

// -- Page component --

type PageId = 'privacy' | 'terms' | 'refund';

const content: Record<string, Record<PageId, () => import('react').ReactElement>> = {
  en: { privacy: PrivacyEN, terms: TermsEN, refund: RefundEN },
  pt: { privacy: PrivacyPT, terms: TermsPT, refund: RefundPT },
};

export const LegalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const t = i18n[lang];
  const currentPage = (t.pages.find(p => p.path === location.pathname)?.id ?? 'privacy') as PageId;

  useEffect(() => {
    if (location.pathname === '/legal') {
      navigate('/legal/privacy', { replace: true });
    }
  }, [location.pathname, navigate]);

  const titles: Record<PageId, string> = {
    privacy: t.privacy.title,
    terms: t.terms.title,
    refund: t.refund.title,
  };

  const Content = content[lang][currentPage];

  return (
    <div className="min-h-screen selection:bg-brand/30 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300">
      <Helmet>
        <title>{titles[currentPage]} — moovoa</title>
        <meta name="description" content={`${titles[currentPage]} — moovoa by VOA Digital.`} />
      </Helmet>
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Content */}
          <FadeIn className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{titles[currentPage]}</h1>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-10">
              {t[currentPage].updated}
            </p>
            <Content />
          </FadeIn>

          {/* Side nav */}
          <FadeIn delay={0.1} className="md:w-56 flex-shrink-0">
            <div className="md:sticky md:top-32">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary-light dark:text-text-secondary-dark mb-4">
                {t.sidebarTitle}
              </p>
              <nav className="flex flex-row md:flex-col gap-2">
                {t.pages.map(page => {
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
