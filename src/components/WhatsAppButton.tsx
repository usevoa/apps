import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context';

export const WhatsAppButton = () => {
  const { t } = useLanguage();
  return (
    <motion.a
      href={t.contact.links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
      aria-label="WhatsApp"
    >
      <MessageCircle size={32} fill="currentColor" />
    </motion.a>
  );
};
