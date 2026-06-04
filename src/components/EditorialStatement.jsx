'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// White Wolf Infra — Updated luxury real estate editorial text with inline images
const lines = [
  [
    { type: 'text', value: 'Creation lives' },
    {
      type: 'image',
      src: '/assets/gallery/Ext1.jpeg',
      alt: 'luxury home',
    },
    { type: 'text', value: 'in those' },
  ],
  [
    { type: 'text', value: 'who challenge' },
    {
      type: 'image',
      src: '/assets/gallery/Ext2.jpeg',
      alt: 'premium villa',
    },
    { type: 'text', value: 'limits' },
  ],
  [
    { type: 'text', value: 'and create' },
    {
      type: 'image',
      src: '/assets/gallery/Ext3.jpeg',
      alt: 'landscape',
    },
    { type: 'text', value: 'history.' },
  ],
  [
    {
      type: 'image',
      src: '/assets/gallery/Ext4.jpeg',
      alt: 'beyond',
    },
    { type: 'text', value: 'White Wolf Infra' },
  ],
  [
    { type: 'text', value: 'reflects that' },
    {
      type: 'image',
      src: '/assets/gallery/Ext5.jpeg',
      alt: 'interior',
    },
    { type: 'text', value: 'spirit.' },
    {
      type: 'image',
      src: '/assets/gallery/Ext6.jpeg',
      alt: 'pool',
    },
  ],
];

// Word that fades from grey → dark on scroll
function AnimatedToken({ children, progress, startAt, endAt }) {
  const color = useTransform(progress, [startAt, endAt], ['#c0c0c0', '#111111']);
  return (
    <motion.span style={{ color }} className="transition-none whitespace-nowrap">
      {children}
    </motion.span>
  );
}

// Inline image pill — maxWidth: 0 → full so NO space reserved before scroll
function InlineImage({ src, alt, progress, startAt, endAt }) {
  const opacity = useTransform(progress, [startAt, endAt], [0, 1]);
  const maxWidth = useTransform(
    progress,
    [startAt, Math.min(endAt + 0.012, 1)],
    ['0px', '120px']
  );

  return (
    <motion.span
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        overflow: 'hidden',
        maxWidth,
        opacity,
        height: 'clamp(38px, 4vw, 68px)',
        borderRadius: '10px',
        marginLeft: '0.18em',
        marginRight: '0.18em',
        position: 'relative',
        top: '-0.05em',
        flexShrink: 0,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: '120px', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </motion.span>
  );
}

export default function EditorialStatement() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.3'],
  });

  // Count all tokens for even distribution
  const totalTokens = lines.flat().reduce((acc, token) => {
    if (token.type === 'image') return acc + 1;
    return acc + token.value.split(' ').filter(Boolean).length;
  }, 0);

  let tokenCounter = 0;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-[#f5f5f3] px-6 py-32"
    >
      <div className="w-full max-w-7xl mx-auto text-center">
        {lines.map((line, lineIdx) => (
          <div
            key={lineIdx}
            className="flex flex-wrap items-center justify-center"
            style={{
              fontSize: 'clamp(2.2rem, 6.5vw, 7rem)',
              lineHeight: 1.1,
              marginBottom: '0.04em',
            }}
          >
            {line.map((token, tokenIdx) => {
              if (token.type === 'image') {
                const startAt = tokenCounter / totalTokens;
                const endAt = Math.min((tokenCounter + 1) / totalTokens, 1);
                tokenCounter++;
                return (
                  <InlineImage
                    key={tokenIdx}
                    src={token.src}
                    alt={token.alt}
                    progress={scrollYProgress}
                    startAt={startAt}
                    endAt={endAt}
                  />
                );
              }

              const words = token.value.split(' ').filter(Boolean);
              return (
                <span
                  key={tokenIdx}
                  className="font-black tracking-tighter  font-sans"
                >
                  {tokenIdx > 0 && '\u00A0'}
                  {words.map((word, wIdx) => {
                    const startAt = tokenCounter / totalTokens;
                    const endAt = Math.min((tokenCounter + 1) / totalTokens, 1);
                    tokenCounter++;
                    return (
                      <AnimatedToken
                        key={`${lineIdx}-${tokenIdx}-${wIdx}`}
                        progress={scrollYProgress}
                        startAt={startAt}
                        endAt={endAt}
                      >
                        {word}{wIdx < words.length - 1 ? '\u00A0' : ''}
                      </AnimatedToken>
                    );
                  })}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gray-300" />
    </section>
  );
}