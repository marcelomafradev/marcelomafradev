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
      className={cn('whitespace-nowrap text-2xl font-bold', className)}
    >
      {Array.from(title).map((letter, index) => (
        <motion.span variants={textVariant} key={index}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default TypingText;
