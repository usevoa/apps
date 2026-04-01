import { useLanguage } from '../context';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="py-12 border-t border-border-light dark:border-border-dark px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <img src="/logo-light.png" alt="VOA" className="h-6 w-auto block dark:hidden" />
              <img src="/logo-dark.png" alt="VOA" className="h-6 w-auto hidden dark:block" />
              <span className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark">Apps</span>
            </Link>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{t.footer.rights}</p>
          </div>
          <div className="flex gap-8">
            <a href={t.contact.links.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-brand transition-colors">WhatsApp</a>
            <a href={t.contact.links.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-brand transition-colors">Instagram</a>
            <a href={t.contact.links.email} className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-brand transition-colors">E-mail</a>
            <Link to="/legal/privacy" className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-brand transition-colors">Legal</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
