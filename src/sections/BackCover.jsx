import { motion } from 'framer-motion';
import AnimatedTitle from '../components/AnimatedTitle';

// Simple barcode SVG component
function Barcode() {
  const widths = [2,1,3,1,2,3,1,2,1,3,2,1,3,1,2,1,3,2,1,2,3,1,2,1,3,2,1,2,1,3];
  return (
    <div style={{ display: 'flex', gap: 2, height: 56, alignItems: 'stretch' }}>
      {widths.map((w, i) => (
        <div
          key={i}
          style={{
            width: w * 3,
            background: i % 2 === 0 ? 'var(--yellow-bright)' : 'transparent',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

export default function BackCover() {
  return (
    <section className="section-back-cover" id="back-cover">
      <div className="action-lines" />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Decorative starburst */}
        <motion.div
          className="starburst"
          style={{
            width: 100,
            height: 100,
            background: 'var(--red)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <AnimatedTitle
            text="THE END?"
            palette="dark"
            baseColor="#fbbf24"
            shadow="4px 4px 0 #e63229"
            underlineGradient="linear-gradient(90deg, #fde047, #e63229, #fde047)"
            burstWord="FIN!"
            className="back-cover-title"
            particles={[
              { x: -30, y: -22, char: '🌟', size: '1.1rem', delay: 0    },
              { x: 18,  y: -28, char: '★',  size: '0.85rem',delay: 0.06 },
              { x: -15, y: 50,  char: '🎉', size: '0.9rem', delay: 0.1  },
              { x: 80,  y: 44,  char: '✨',  size: '0.85rem',delay: 0.04 },
            ]}
          />
          <motion.span
            className="back-cover-title"
            style={{ color: 'var(--red)', textShadow: '3px 3px 0 var(--yellow-bright)', display: 'block', marginTop: '0.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 140, delay: 0.2 }}
          >
            No, just the beginning.
          </motion.span>
        </div>

        <motion.p
          className="back-cover-joke"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Next issue: "The Developer Discovers CSS Grid" — Coming whenever I finish the refactor.
        </motion.p>

        {/* Barcode + issue info */}
        <motion.div
          style={{ marginTop: '2.5rem', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Barcode />
          <span style={{ fontFamily: 'var(--font-comic)', fontSize: '0.75rem', color: 'var(--cream)', letterSpacing: 2, opacity: 0.5 }}>
            VISHNU PRASAD · PORTFOLIO-2026 · ISSUE #001
          </span>
        </motion.div>

        {/* Rating box (comic back cover style) */}
        <motion.div
          style={{
            marginTop: '2rem',
            display: 'inline-block',
            border: '3px solid var(--yellow-bright)',
            padding: '0.4rem 1rem',
            fontFamily: 'var(--font-comic)',
            fontSize: '0.9rem',
            color: 'var(--yellow-bright)',
            letterSpacing: 2,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          RATED: ★★★★★ HIRE-WORTHY
        </motion.div>
      </div>
    </section>
  );
}
