import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import vishnuImg from '../assets/vishnu.png';

/* ─────────────────────────────────────────────────────────
   Comic color palette cycling per letter on hover
───────────────────────────────────────────────────────── */
const LETTER_COLORS = [
  '#fbbf24', '#e63229', '#ffffff', '#fde047',
  '#fb923c', '#ffffff', '#fbbf24', '#e63229',
  '#fde047', '#ffffff', '#fb923c', '#fbbf24',
];

/* ─────────────────────────────────────────────────────────
   Letter variants — respond to parent "hovered" state
───────────────────────────────────────────────────────── */
const letterVariants = {
  idle: {
    y: 0,
    scale: 1,
    rotate: 0,
    color: '#ffffff',
    textShadow: '6px 6px 0 #1a1a1a, -2px -2px 0 #1a1a1a',
  },
  hovered: (i) => ({
    y: [-0, -22, 6, -12, 0],
    scale: [1, 1.18, 0.95, 1.08, 1],
    rotate: [0, -8, 6, -3, 0],
    color: LETTER_COLORS[i % LETTER_COLORS.length],
    textShadow: [
      '6px 6px 0 #1a1a1a',
      `4px 4px 0 #1a1a1a`,
      `6px 6px 0 #1a1a1a`,
    ],
    transition: {
      duration: 0.55,
      delay: i * 0.055,
      times: [0, 0.3, 0.55, 0.75, 1],
      ease: 'easeOut',
    },
  }),
};

/* ─────────────────────────────────────────────────────────
   Animated name — splits into individual letter spans
───────────────────────────────────────────────────────── */
function AnimatedName({ line, startIndex = 0 }) {
  return (
    <>
      {line.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={startIndex + i}
          variants={letterVariants}
          style={{
            display: 'inline-block',
            cursor: 'default',
            willChange: 'transform',
            /* preserve kerning */
            letterSpacing: char === ' ' ? '0.15em' : 'inherit',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   ZAP burst effect — appears near cursor on hover start
───────────────────────────────────────────────────────── */
const ZAP_WORDS = ['ZAP!', 'WOW!', 'POW!', 'BAM!', '⚡'];

function ZapBurst({ visible }) {
  const word = ZAP_WORDS[Math.floor(Math.random() * ZAP_WORDS.length)];
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={word}
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 8, opacity: 1 }}
          exit={{ scale: 0, opacity: 0, rotate: 20 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          style={{
            position: 'absolute',
            top: '-1.5rem',
            right: '-3rem',
            fontFamily: 'var(--font-comic)',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#1a1a1a',
            background: '#fde047',
            border: '3px solid #1a1a1a',
            padding: '0.2rem 0.6rem',
            letterSpacing: 2,
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

/* ─────────────────────────────────────────────────────────
   Ripple underline — sweeps across on hover
───────────────────────────────────────────────────────── */
function RippleUnderline({ hovered }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: -6,
        left: 0,
        height: 6,
        background: 'linear-gradient(90deg, #fde047, #e63229, #fbbf24)',
        border: '2px solid #1a1a1a',
        borderRadius: 0,
        originX: 0,
      }}
      animate={hovered ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    />
  );
}

/* ─────────────────────────────────────────────────────────
   Comic Photo Panel
───────────────────────────────────────────────────────── */
function ComicPhotoPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80, rotate: 4 }}
      animate={{ opacity: 1, x: 0, rotate: 3 }}
      transition={{ type: 'spring', stiffness: 100, damping: 16, delay: 0.3 }}
      style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
    >
      {/* Starburst glow behind the photo */}
      <motion.div
        style={{
          position: 'absolute',
          width: '110%',
          height: '110%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.35) 0%, transparent 70%)',
          zIndex: 0,
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Action-line starburst SVG */}
      <svg
        viewBox="0 0 400 400"
        style={{
          position: 'absolute',
          width: '130%',
          height: '130%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          opacity: 0.18,
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * 360;
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={200}
              y1={200}
              x2={200 + Math.cos(rad) * 200}
              y2={200 + Math.sin(rad) * 200}
              stroke="#fbbf24"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Photo wrapper — comic panel border */}
      <motion.div
        whileHover={{ scale: 1.04, rotate: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
        style={{
          position: 'relative',
          zIndex: 2,
          background: '#1a1a1a',
          border: '5px solid #1a1a1a',
          boxShadow: '10px 10px 0 #1a1a1a, 10px 10px 0 2px #fbbf24',
          maxWidth: 340,
          width: '100%',
        }}
      >
        {/* Red corner accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '36px 36px 0 0',
          borderColor: '#e63229 transparent transparent transparent',
          zIndex: 5,
        }} />

        {/* Halftone dot overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)',
          backgroundSize: '10px 10px',
          zIndex: 3,
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
        }} />

        {/* The actual photo */}
        <img
          src={vishnuImg}
          alt="Vishnu Prasad"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />

        {/* Caption strip */}
        <div style={{
          background: '#e63229',
          borderTop: '4px solid #1a1a1a',
          padding: '0.5rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{
            fontFamily: 'var(--font-comic)',
            fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
            color: '#ffffff',
            letterSpacing: 2,
            fontWeight: 'bold',
          }}>
            VISHNU PRASAD
          </span>
          <span style={{
            fontFamily: 'var(--font-comic)',
            fontSize: '0.7rem',
            color: '#fde047',
            letterSpacing: 1,
          }}>
            CREATIVE DEV
          </span>
        </div>
      </motion.div>



      {/* Page number stamp */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        style={{
          position: 'absolute',
          top: -14,
          right: 10,
          fontFamily: 'var(--font-comic)',
          fontSize: '0.75rem',
          color: '#fbbf24',
          letterSpacing: 2,
          zIndex: 6,
        }}
      >
        PG.01
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Cover section
───────────────────────────────────────────────────────── */
export default function Cover() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="comic-section section-cover" id="cover">
      <div className="cover-bg-lines" />
      <div className="action-lines" />

      {/* Issue badge */}
      <motion.div
        className="cover-issue-badge"
        initial={{ rotate: 4, scale: 0.9 }}
        animate={{ rotate: 4, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        ISSUE #001 · 2026
      </motion.div>

      {/* ── Two-column layout: Text | Photo ── */}
      <div
        className="comic-section-inner"
        style={{
          paddingTop: '2rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '3rem',
          alignItems: 'center',
        }}
      >
        {/* ── LEFT: Text column ── */}
        <div>
          {/* Hero name */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.15 }}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <motion.h1
              className="cover-title"
              animate={hovered ? 'hovered' : 'idle'}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              style={{ cursor: 'default', display: 'inline-block', rotate: -2, position: 'relative' }}
            >
              <span style={{ display: 'block' }}>
                <AnimatedName line="VISHNU" startIndex={0} />
              </span>
              <span style={{ display: 'block' }}>
                <AnimatedName line="PRASAD" startIndex={6} />
              </span>

              {/* Sweep underline */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: -6,
                  left: 0,
                  height: 6,
                  background: 'linear-gradient(90deg, #fde047, #e63229, #fbbf24)',
                  border: '2px solid #1a1a1a',
                  originX: 0,
                }}
                animate={hovered ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </motion.h1>

            <ZapBurst visible={hovered} />

            {/* Sparkles */}
            <AnimatePresence>
              {hovered && [
                { x: -30, y: -30, delay: 0, emoji: '✨' },
                { x: 120, y: -10, delay: 0.08, emoji: '⚡' },
                { x: -20, y: 60, delay: 0.15, emoji: '💥' },
                { x: 150, y: 40, delay: 0.06, emoji: '★' },
              ].map((s, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: s.x, y: s.y }}
                  animate={{ opacity: 1, scale: 1.2, x: s.x, y: s.y }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: s.delay, type: 'spring', stiffness: 400, damping: 14 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    fontSize: '1.4rem',
                    pointerEvents: 'none',
                    zIndex: 5,
                    filter: 'drop-shadow(1px 1px 0 #1a1a1a)',
                  }}
                >
                  {s.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Role subtitle */}
          <motion.div
            className="cover-subtitle mt-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Creative Developer
          </motion.div>

          {/* Speech bubble */}
          <motion.div
            className="speech-bubble mt-4"
            style={{ maxWidth: 420 }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.55 }}
          >
            <span style={{ display: 'block', lineHeight: 1.5 }}>
              <span style={{
                fontFamily: "'Caveat', cursive",
                fontWeight: 700,
                fontSize: '1.25rem',
                letterSpacing: '0.02em',
                color: '#1a1a1a',
                display: 'block',
                marginBottom: '0.4rem',
              }}>
                Tech Enthusiast &nbsp;·&nbsp; Problem Solver &nbsp;·&nbsp; Creative Mind.
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '0.95rem',
                color: '#444',
                lineHeight: 1.7,
                display: 'block',
              }}>
                I build intelligent, resilient and impactful solutions that make a real difference.
              </span>
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex mt-6 gap-2"
            style={{ flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.a
              href="#projects"
              className="btn-comic btn-secondary"
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              ⚡ View Work
            </motion.a>
            <motion.a
              href="#"
              className="btn-comic btn-dark"
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.96 }}
              onClick={(e) => { e.preventDefault(); alert('Resume PDF coming soon!'); }}
            >
              📄 Download Resume
            </motion.a>
          </motion.div>

          {/* Motto sticker */}
          <motion.div
            className="cover-sticker mt-4"
            initial={{ opacity: 0, rotate: -8, scale: 0.85 }}
            animate={{ opacity: 1, rotate: -4, scale: 1 }}
            transition={{ type: 'spring', stiffness: 180, delay: 0.85 }}
            style={{ display: 'inline-block' }}
          >
            ✨ "Ship smart. Build for impact."
          </motion.div>

          {/* Tech chips */}
          <motion.div
            className="flex mt-6 gap-2"
            style={{ flexWrap: 'wrap' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05 }}
          >
            {['React', 'Three.js', 'GSAP', 'Node.js', 'TypeScript'].map((tag, i) => (
              <motion.span
                key={tag}
                className="tech-chip"
                style={{ background: 'rgba(255,255,255,0.25)', border: '2px solid var(--ink)', color: 'var(--white)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05 + i * 0.07 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Comic photo panel ── */}
        <ComicPhotoPanel />
      </div>

      {/* Torn paper bottom edge */}
      <div className="torn-edge-bottom" />
    </section>
  );
}
