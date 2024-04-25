'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/helpers/motion';

const FadeInMotion = ({
  delay,
  children,
  className,
}: {
  delay: number;
  className?: string;
  children: ReactNode;
}) => (
  <motion.div
    initial="hidden"
    animate="show"
    viewport={{ once: true, amount: 0.25 }}
    variants={fadeIn({ direction: 'right', type: 'tween', delay, duration: 1 })}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeInMotion;
