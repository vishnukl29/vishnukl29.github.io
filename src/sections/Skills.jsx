import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedTitle from '../components/AnimatedTitle';

const SKILLS = [
  { name: 'React / Next.js', level: 95, color: '#61dafb', icon: '⚛️' },
  { name: 'JavaScript / TS', level: 92, color: '#fbbf24', icon: '🟨' },
  { name: 'Three.js / WebGL', level: 82, color: '#6b21a8', icon: '🌐' },
  { name: 'Node.js',          level: 88, color: '#22c55e', icon: '🟩' },
  { name: 'Python',           level: 75, color: '#3b82f6', icon: '🐍' },
  { name: 'GSAP / Motion',    level: 90, color: '#e63229', icon: '🎬' },
  { name: 'UI / UX Design',   level: 80, color: '#ec4899', icon: '🎨' },
  { name: 'Docker / DevOps',  level: 70, color: '#0ea5e9', icon: '🐳' },
  { name: 'PostgreSQL',       level: 78, color: '#fb923c', icon: '🗃️' },
  { name: 'Figma',            level: 85, color: '#a855f7', icon: '🖌️' },
];

function SkillBar({ name, level, color, icon, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="skill-row"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 150 }}
    >
      <div className="skill-name">{name}</div>
      <div className="power-bar-track">
        <motion.div
          className="power-bar-fill"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay: index * 0.07 + 0.3, duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>
      <div className="skill-icon">{icon}</div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="comic-section section-skills" id="skills">
      <div className="action-lines" />
      <div className="comic-section-inner">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="section-eyebrow" style={{ color: 'var(--ink)' }}>
            ⚡ Power Levels Classified ⚡
          </span>
          <AnimatedTitle
            text="THE ARSENAL"
            palette="orange"
            baseColor="#1a1a1a"
            shadow="3px 3px 0 rgba(0,0,0,0.2)"
            underlineGradient="linear-gradient(90deg, #fde047, #ea580c, #fbbf24)"
            burstWord="POW!"
            particles={[
              { x: -32, y: -24, char: '⚡', size: '1.1rem', delay: 0    },
              { x: 20,  y: -28, char: '★',  size: '0.85rem',delay: 0.06 },
              { x: -18, y: 50,  char: '🔥', size: '0.9rem', delay: 0.1  },
              { x: 90,  y: 48,  char: '⚡', size: '0.8rem', delay: 0.04 },
            ]}
          />
        </motion.div>

        {/* Two-column grid for skill bars */}
        <div
          className="mt-6"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '0.5rem 3rem',
          }}
        >
          {SKILLS.map((skill, i) => (
            <SkillBar key={skill.name} {...skill} index={i} />
          ))}
        </div>

        {/* Decorative comic caption box */}
        <motion.div
          className="comic-panel mt-6"
          style={{
            padding: '1rem 1.5rem',
            background: 'var(--ink)',
            color: 'var(--yellow-bright)',
            maxWidth: 500,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            "Every skill level above 90% comes with at least one{' '}
            <span style={{ color: 'var(--red)' }}>existential crisis</span>{' '}
            and two Stack Overflow tabs."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
