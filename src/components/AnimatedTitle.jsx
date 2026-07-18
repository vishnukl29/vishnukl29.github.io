import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   Per-section colour palettes
───────────────────────────────────────────────────────── */
export const PALETTES = {
  red:    ['#fde047','#ffffff','#fbbf24','#ff8fa3','#ffffff','#fde047'],
  purple: ['#fde047','#f0abfc','#ffffff','#fbbf24','#c4b5fd','#ffffff'],
  orange: ['#fde047','#ffffff','#fed7aa','#fbbf24','#ffffff','#fb923c'],
  green:  ['#bbf7d0','#fde047','#ffffff','#4ade80','#fde047','#ffffff'],
  yellow: ['#1a1a1a','#e63229','#6b21a8','#1a1a1a','#e63229','#6b21a8'],
  teal:   ['#fde047','#ffffff','#a5f3fc','#fbbf24','#ffffff','#67e8f9'],
  dark:   ['#fde047','#e63229','#ffffff','#fbbf24','#ff6b6b','#ffffff'],
};

const BURST_WORDS = ['ZAP!','POW!','WOW!','BAM!','⚡','EPIC!','🔥'];

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */
function BurstBadge({ visible, word }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={word}
          initial={{ scale: 0, rotate: -18, opacity: 0 }}
          animate={{ scale: 1, rotate: 10,  opacity: 1 }}
          exit={{   scale: 0, rotate: 20,   opacity: 0 }}
          transition={{ type: 'spring', stiffness: 440, damping: 16 }}
          style={{
            position: 'absolute',
            top: '-1rem',
            right: '-4rem',
            fontFamily: 'var(--font-comic)',
            fontSize: 'clamp(0.8rem, 2vw, 1.3rem)',
            color: '#1a1a1a',
            background: '#fde047',
            border: '3px solid #1a1a1a',
            padding: '0.15rem 0.6rem',
            letterSpacing: 1,
            boxShadow: '3px 3px 0 #1a1a1a',
            pointerEvents: 'none',
            zIndex: 10,
            whiteSpace: 'nowrap',
          }}
        >
          {word}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GlitchFlash({ text, visible, color1 = '#e63229', color2 = '#22d3ee' }) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0, 0.25, 0], x: [-5, 5, -2, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, times: [0,0.2,0.4,0.7,1] }}
            style={{ position:'absolute', inset:0, color: color1,
              fontFamily:'inherit', fontSize:'inherit', lineHeight:'inherit',
              pointerEvents:'none', whiteSpace:'nowrap', display:'flex',
              gap:'0.05em', flexWrap:'nowrap' }}
          >
            {text}
          </motion.span>
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0, 0.2, 0], x: [5, -4, 2, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, times: [0,0.2,0.5,0.75,1], delay: 0.05 }}
            style={{ position:'absolute', inset:0, color: color2,
              fontFamily:'inherit', fontSize:'inherit', lineHeight:'inherit',
              pointerEvents:'none', whiteSpace:'nowrap', display:'flex',
              gap:'0.05em', flexWrap:'nowrap' }}
          >
            {text}
          </motion.span>
        </>
      )}
    </AnimatePresence>
  );
}

function FloatingParticles({ visible, particles }) {
  return (
    <AnimatePresence>
      {visible && particles.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0, x: p.x, y: p.y }}
          animate={{ opacity: 1, scale: 1,  x: p.x, y: p.y }}
          exit={{   opacity: 0, scale: 0 }}
          transition={{ delay: p.delay, type: 'spring', stiffness: 380, damping: 14 }}
          style={{
            position: 'absolute', top: 0, left: 0,
            fontSize: p.size || '1rem',
            fontFamily: 'var(--font-comic)',
            color: '#fde047',
            textShadow: '1px 1px 0 #1a1a1a',
            pointerEvents: 'none',
            zIndex: 5,
            fontWeight: 'bold',
          }}
        >
          {p.char}
        </motion.span>
      ))}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────
   Main AnimatedTitle component
   Props:
     text        — string, the title text
     palette     — key of PALETTES or custom color array
     baseColor   — default letter color (white / ink etc.)
     shadow      — CSS text-shadow for idle state
     underlineGradient — CSS gradient for sweep underline
     particles   — array of {x,y,char,size,delay} to float around
     burstIdx    — index into BURST_WORDS (default random)
     className   — extra CSS class on the heading
     tag         — heading tag, default 'h2'
     style       — extra inline styles on the heading wrapper
───────────────────────────────────────────────────────── */
export default function AnimatedTitle({
  text,
  palette = 'red',
  baseColor = '#ffffff',
  shadow = '4px 4px 0 #1a1a1a, -1px -1px 0 #1a1a1a',
  underlineGradient = 'linear-gradient(90deg, #fde047, #e63229, #fde047)',
  particles,
  burstWord,
  className = 'section-headline',
  tag: Tag = 'h2',
  style = {},
}) {
  const [hovered, setHovered] = useState(false);
  const colors = Array.isArray(palette) ? palette : (PALETTES[palette] || PALETTES.red);
  const word = burstWord || BURST_WORDS[Math.floor(text.length % BURST_WORDS.length)];

  /* Default particles if none supplied */
  const pts = particles || [
    { x: -30, y: -22, char: '★', size: '1rem',   delay: 0     },
    { x: 20,  y: -30, char: '✦', size: '0.8rem',  delay: 0.06  },
    { x: -20, y: 50,  char: '⚡', size: '0.9rem',  delay: 0.1   },
    { x: 80,  y: 45,  char: '★', size: '0.75rem', delay: 0.04  },
  ];

  /* Letter variants */
  const letterVariants = {
    idle: (i) => ({
      y: 0, scale: 1, rotate: 0,
      color: baseColor,
      textShadow: shadow,
      transition: { type: 'spring', stiffness: 220, damping: 16, delay: i * 0.025 },
    }),
    hovered: (i) => ({
      y: [0, -18, 5, -9, 0],
      scale: [1, 1.15, 0.97, 1.06, 1],
      rotate: [0, -7, 5, -2, 0],
      color: colors[i % colors.length],
      textShadow: shadow,
      transition: {
        duration: 0.52,
        delay: i * 0.05,
        times: [0, 0.28, 0.55, 0.75, 1],
        ease: 'easeOut',
      },
    }),
  };

  const letters = text.split('');

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>

      {/* Glitch flash behind */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <GlitchFlash text={text} visible={hovered} />

        {/* Heading */}
        <Tag
          className={className}
          style={{ cursor: 'default', ...style }}
        >
          <motion.span
            animate={hovered ? 'hovered' : 'idle'}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{
              display: 'inline-flex',
              gap: '0.03em',
              flexWrap: 'wrap',
              position: 'relative',
            }}
          >
            {letters.map((char, i) =>
              char === ' ' ? (
                <span key={i} style={{ display: 'inline-block', width: '0.28em' }} />
              ) : (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  style={{ display: 'inline-block', willChange: 'transform' }}
                >
                  {char}
                </motion.span>
              )
            )}
          </motion.span>
        </Tag>

        {/* Floating particles */}
        <FloatingParticles visible={hovered} particles={pts} />
      </div>

      {/* Burst badge */}
      <BurstBadge visible={hovered} word={word} />

      {/* Sweep underline */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: -6,
          left: 0,
          height: 5,
          background: underlineGradient,
          border: '2px solid #1a1a1a',
          originX: 0,
          borderRadius: 0,
        }}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: '55%', opacity: 1 }}
        viewport={{ once: true }}
        animate={hovered ? { width: '100%', opacity: 1 } : undefined}
        transition={hovered
          ? { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }
          : { delay: 0.4, duration: 0.5 }
        }
      />
    </div>
  );
}
