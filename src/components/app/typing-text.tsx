'use client';

import { textContainer, textVariant } from '@/helpers/motion';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const TypingText = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <motion.p
      variants={textContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={cn(
        'whitespace-nowrap text-xl font-bold md:text-2xl lg:text-3xl',
        className,
      )}
    >
      {Array.from(title).map((letter, index) => (
        <motion.span
          viewport={{ once: true, amount: 0.25 }}
          variants={textVariant}
          key={index}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default TypingText;
