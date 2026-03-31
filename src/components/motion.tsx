import { motion } from 'motion/react';
import { ReactNode } from 'react';

const ease = [0.25, 0.1, 0.25, 1];

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  className?: string;
}

export const FadeIn = ({ children, delay = 0, y = 30, x = 0, duration = 0.8, className }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration, delay, ease }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeInScale = ({ children, delay = 0, duration = 1, className }: Omit<FadeInProps, 'y' | 'x'>) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration, delay, ease }}
    className={className}
  >
    {children}
  </motion.div>
);

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export const Stagger = ({ children, className, stagger = 0.1, delay = 0 }: StaggerProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);
