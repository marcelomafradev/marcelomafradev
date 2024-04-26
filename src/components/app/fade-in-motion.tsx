'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FadeInProps, fadeIn } from '@/helpers/motion';

interface FadeInMotionProps extends FadeInProps {
  className?: string;
  children: ReactNode;
}

const FadeInMotion = ({
  delay,
  children,
  className,
  direction = 'right',
}: FadeInMotionProps) => (
  <motion.div
    initial="hidden"
    animate="show"
    viewport={{ once: true, amount: 0.25 }}
    variants={fadeIn({ direction, type: 'tween', delay, duration: 1 })}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeInMotion;
