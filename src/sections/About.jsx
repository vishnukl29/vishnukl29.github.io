import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   Colour palette — purple section tones
───────────────────────────────────────────────────────── */
const HOVER_COLORS = [
  '#fde047', // yellow
  '#f0abfc', // pink-purple
  '#ffffff',
  '#fbbf24', // amber
  '#c4b5fd', // lavender
  '#ffffff',
  '#fde047',
  '#f0abfc',
];

/* ─────────────────────────────────────────────────────────
   Letter variants — 3D Y-axis flip + color + bounce
───────────────────────────────────────────────────────── */
const whoLetterVariants = {
  idle: (i) => ({
    rotateY: 0,
    y: 0,
    scale: 1,
    color: '#ffffff',
    textShadow: '5px 5px 0 #1a1a1a, -2px -2px 0 #1a1a1a',
    transition: { type: 'spring', stiffness: 200, damping: 14, delay: i * 0.03 },
  }),
  hovered: (i) => ({
    rotateY: [0, 90, 180, 90, 0],
    y: [0, -14, 0, -7, 0],
    scale: [1, 1.2, 1, 1.08, 1],
    color: HOVER_COLORS[i % HOVER_COLORS.length],
    textShadow: [
      '5px 5px 0 #1a1a1a',
      '3px 3px 0 #1a1a1a',
      '5px 5px 0 #1a1a1a',
    ],
    transition: {
      duration: 0.6,
      delay: i * 0.06,
      times: [0, 0.25, 0.5, 0.75, 1],
      ease: 'easeInOut',
    },
  }),
};

/* Question mark spins */
const qMarkVariants = {
  idle:    { rotate: 0,   scale: 1,   color: '#fde047' },
  hovered: {
    rotate: [0, -15, 360, 375, 360],
    scale:  [1, 1.3, 1.3, 1,   1],
    color:  '#e63229',
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
};

/* ─────────────────────────────────────────────────────────
   Floating "???" burst
───────────────────────────────────────────────────────── */
function QuestionBurst({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 10,  opacity: 1 }}
          exit={{   scale: 0, rotate: 20,   opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 16 }}
          style={{
            position: 'absolute',
            top: '-1rem',
            right: '-4.5rem',
            fontFamily: 'var(--font-comic)',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: '#1a1a1a',
            background: '#fde047',
            border: '3px solid #1a1a1a',
            padding: '0.2rem 0.7rem',
            letterSpacing: 2,
            boxShadow: '3px 3px 0 #1a1a1a',
            pointerEvents: 'none',
            zIndex: 10,
            whiteSpace: 'nowrap',
          }}
        >
          ???
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────
   Glitch overlay — quick red/cyan offset flash on hover
───────────────────────────────────────────────────────── */
function GlitchFlash({ text, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Red channel */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: [0, 0.5, 0, 0.3, 0], x: [-4, 4, -2, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, times: [0, 0.2, 0.4, 0.7, 1] }}
            style={{
              position: 'absolute', top: 0, left: 0,
              fontFamily: 'var(--font-comic)',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              color: '#e63229',
              pointerEvents: 'none',
              letterSpacing: 4,
              whiteSpace: 'nowrap',
            }}
          >
            {text}?
          </motion.span>
          {/* Cyan channel */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: [0, 0.4, 0, 0.25, 0], x: [4, -3, 2, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, times: [0, 0.2, 0.5, 0.75, 1], delay: 0.05 }}
            style={{
              position: 'absolute', top: 0, left: 0,
              fontFamily: 'var(--font-comic)',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              color: '#22d3ee',
              pointerEvents: 'none',
              letterSpacing: 4,
              whiteSpace: 'nowrap',
            }}
          >
            {text}?
          </motion.span>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────
   Main WHO AM I? Banner component
───────────────────────────────────────────────────────── */
function WhoAmIBanner() {
  const [hovered, setHovered] = useState(false);
  const letters = 'WHO AM I'.split('');

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      {/* Eyebrow */}
      <span className="section-eyebrow" style={{ color: 'var(--yellow-bright)' }}>
        ✦ Origin Story ✦
      </span>

      {/* Title row */}
      <div style={{ position: 'relative', display: 'inline-block' }}>

        {/* Glitch flash layers (behind) */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <GlitchFlash text="WHO AM I" visible={hovered} />

          {/* The actual heading */}
          <motion.h2
            className="who-am-i-banner"
            animate={hovered ? 'hovered' : 'idle'}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{
              cursor: 'default',
              display: 'inline-flex',
              gap: '0.05em',
              flexWrap: 'nowrap',
              position: 'relative',
              perspective: 600,
            }}
          >
            {letters.map((char, i) =>
              char === ' ' ? (
                <span key={i} style={{ display: 'inline-block', width: '0.35em' }} />
              ) : (
                <motion.span
                  key={i}
                  custom={i}
                  variants={whoLetterVariants}
                  style={{
                    display: 'inline-block',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                    cursor: 'default',
                  }}
                >
                  {char}
                </motion.span>
              )
            )}

            {/* Animated "?" */}
            <motion.span
              variants={qMarkVariants}
              style={{
                display: 'inline-block',
                transformOrigin: 'bottom center',
                color: '#fde047',
                textShadow: '4px 4px 0 #1a1a1a',
              }}
            >
              ?
            </motion.span>
          </motion.h2>

          {/* Floating question-mark dots around banner */}
          <AnimatePresence>
            {hovered && [
              { x: -28, y: -24, size: '1.1rem', delay: 0,    char: '?' },
              { x: 10,  y: -32, size: '0.85rem',delay: 0.06, char: '✦' },
              { x: -15, y: 48,  size: '0.9rem', delay: 0.1,  char: '?' },
              { x: 60,  y: 50,  size: '1rem',   delay: 0.04, char: '💡' },
              { x: 110, y: -20, size: '0.8rem', delay: 0.12, char: '?' },
            ].map((dot, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, x: dot.x, y: dot.y }}
                animate={{ opacity: 1, scale: 1,  x: dot.x, y: dot.y }}
                exit={{   opacity: 0, scale: 0,  x: dot.x, y: dot.y }}
                transition={{ delay: dot.delay, type: 'spring', stiffness: 380, damping: 14 }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  fontSize: dot.size,
                  fontFamily: 'var(--font-comic)',
                  color: '#fde047',
                  textShadow: '1px 1px 0 #1a1a1a',
                  pointerEvents: 'none',
                  zIndex: 5,
                  fontWeight: 'bold',
                }}
              >
                {dot.char}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* "???" burst badge */}
        <QuestionBurst visible={hovered} />

        {/* Sweep underline */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: -8,
            left: 0,
            height: 6,
            background: 'linear-gradient(90deg, #fde047, #f0abfc, #fde047)',
            border: '2px solid #1a1a1a',
            originX: 0,
          }}
          animate={hovered
            ? { width: '100%', opacity: 1 }
            : { width: '60%', opacity: 1 }
          }
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: '60%', opacity: 1 }}
          viewport={{ once: true }}
          transition={hovered
            ? { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }
            : { delay: 0.4, duration: 0.5 }
          }
        />
      </div>
    </motion.div>
  );
}

const stats = [
  {
    icon: '💻',
    title: 'Primary Role',
    body: 'Full-Stack Developer specializing in React, Node.js, and cloud-native architectures that scale from zero to millions.',
    bg: '#fbbf24',
    accent: '#1a1a1a',
  },
  {
    icon: '🎨',
    title: 'Design Specialty',
    body: 'Motion design, 3D interfaces, and WebGL experiences that make ordinary interactions feel extraordinary.',
    bg: '#ffffff',
    accent: '#6b21a8',
  },
  {
    icon: '⚡',
    title: 'Creative Specialty',
    body: 'Turning complex ideas into intuitive, visually arresting stories — from brand identity to interactive data viz.',
    bg: '#e63229',
    accent: '#ffffff',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotate: -3 },
  show:   { opacity: 1, y: 0,  rotate: 0,
    transition: { type: 'spring', stiffness: 160, damping: 18 },
  },
};

export default function About() {
  return (
    <section className="comic-section section-about" id="about">
      <div className="action-lines" />

      <div className="comic-section-inner">
        {/* ── WHO AM I? Animated Banner ── */}
        <WhoAmIBanner />

        {/* Bio panel */}
        <motion.div
          className="speech-bubble mt-4"
          style={{ maxWidth: 620 }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
        >
          <p style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            lineHeight: 1.75,
            fontSize: '0.97rem',
          }}>
            Hey, I'm <strong style={{ color: 'var(--purple)' }}>Vishnu</strong> — a{' '}
            <span style={{ color: 'var(--red)' }}>Tech Enthusiast</span>,{' '}
            <span style={{ color: 'var(--purple)' }}>Vibe Coder</span>, from{' '}
            <span style={{ color: 'var(--orange)' }}>Kayamkulam, Kerala</span>.{' '}
            I am a programmer in my daily life. I am a quick learner with a self-learning attitude.
            I love to learn and explore new technologies and am passionate about problem-solving.
            I love almost all the stacks of web application development and love to make the web more open to the world.
          </p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          className="grid-3 mt-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="stat-card"
              variants={cardVariants}
              whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? -1 : 1 }}
              style={{ background: s.bg, color: s.accent }}
            >
              <div className="comic-panel-accent" />
              <div className="stat-card-icon">{s.icon}</div>
              <div className="stat-card-title" style={{ color: s.accent }}>
                {s.title}
              </div>
              <p className="stat-card-body" style={{ color: s.accent, opacity: 0.85 }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
