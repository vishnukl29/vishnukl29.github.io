import { motion } from 'framer-motion';
import AnimatedTitle from '../components/AnimatedTitle';

const PROJECTS = [
  {
    icon: '🌌',
    title: 'NovaSphere',
    desc: 'An immersive 3D data-visualization platform that maps live satellite telemetry onto a WebGL globe with real-time anomaly detection.',
    tech: ['React', 'Three.js', 'WebSocket', 'Node.js'],
    status: 'Deployed',
    statusColor: '#22c55e',
    link: '#',
    cornerColor: '#22c55e',
  },
  {
    icon: '🤖',
    title: 'InkBot',
    desc: 'An AI-powered storyboard generator that converts rough scene descriptions into panel layouts using GPT-4 + Stable Diffusion pipelines.',
    tech: ['Python', 'FastAPI', 'GPT-4', 'Stable Diffusion'],
    status: 'In Progress',
    statusColor: '#fbbf24',
    link: '#',
    cornerColor: '#fbbf24',
  },
  {
    icon: '🛒',
    title: 'ShopForge',
    desc: 'A headless commerce engine with custom storefront, real-time inventory sync, and a no-code theme builder for Shopify merchants.',
    tech: ['Next.js', 'TypeScript', 'Shopify API', 'Prisma'],
    status: 'Deployed',
    statusColor: '#22c55e',
    link: '#',
    cornerColor: '#22c55e',
  },
  {
    icon: '🎵',
    title: 'BeatCanvas',
    desc: 'A browser DAW that visualizes audio waveforms as generative art in real time — every track becomes a living canvas.',
    tech: ['Web Audio API', 'Canvas', 'React', 'Tone.js'],
    status: 'Beta',
    statusColor: '#0ea5e9',
    link: '#',
    cornerColor: '#0ea5e9',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: 2 },
  show:   { opacity: 1, y: 0,  rotate: 0,
    transition: { type: 'spring', stiffness: 140, damping: 18 },
  },
};

export default function Projects() {
  return (
    <section className="comic-section section-projects" id="projects">
      <div className="action-lines" />
      <div className="comic-section-inner">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <span className="section-eyebrow" style={{ color: 'var(--ink-deep)' }}>
            🗺️ Case Files — Classified
          </span>
          <AnimatedTitle
            text="EPIC MISSIONS"
            palette="green"
            baseColor="#ffffff"
            shadow="4px 4px 0 #1a1a1a"
            underlineGradient="linear-gradient(90deg, #bbf7d0, #16a34a, #fde047)"
            burstWord="EPIC!"
            particles={[
              { x: -30, y: -22, char: '🗺️', size: '1rem',   delay: 0    },
              { x: 20,  y: -30, char: '★',  size: '0.85rem',delay: 0.06 },
              { x: -18, y: 50,  char: '✦',  size: '0.9rem', delay: 0.1  },
              { x: 95,  y: 45,  char: '🚀', size: '0.85rem',delay: 0.04 },
            ]}
          />
        </motion.div>

        <motion.div
          className="grid-2 mt-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS.map((p, i) => (
            <motion.div
              key={i}
              className="project-card"
              variants={cardVariants}
              whileHover={{ scale: 1.025, rotate: -0.5 }}
            >
              {/* Folded corner */}
              <div className="project-card-corner" style={{ background: p.cornerColor }} />

              <div className="project-card-header">
                <div className="project-icon">{p.icon}</div>
                <div>
                  <div className="project-title">{p.title}</div>
                  <span
                    className="status-tag"
                    style={{
                      background: p.statusColor,
                      color: p.statusColor === '#fbbf24' ? '#1a1a1a' : '#ffffff',
                    }}
                  >
                    STATUS: {p.status}
                  </span>
                </div>
              </div>

              <p className="project-desc">{p.desc}</p>

              <div className="project-tech-stack">
                {p.tech.map((t) => (
                  <span key={t} className="tech-chip">{t}</span>
                ))}
              </div>

              <div className="flex gap-2" style={{ marginTop: '0.75rem' }}>
                <motion.a
                  href={p.link}
                  className="btn-comic btn-dark"
                  style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => { e.preventDefault(); alert('Link coming soon!'); }}
                >
                  View Project →
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* More projects note */}

      </div>
    </section>
  );
}
