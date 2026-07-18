import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   Canvas-based texture painter for each visible page
───────────────────────────────────────────────────────── */
function makeTitlePageTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 720;
  const ctx = c.getContext('2d');

  // Cream background
  ctx.fillStyle = '#f9f4ea';
  ctx.fillRect(0, 0, 512, 720);

  // Halftone dots
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  for (let x = 12; x < 512; x += 22) {
    for (let y = 12; y < 720; y += 22) {
      ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Thick outer border
  ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, 498, 706);
  // Inner border
  ctx.lineWidth = 3;
  ctx.strokeRect(22, 22, 468, 676);

  // Red accent top bar
  ctx.fillStyle = '#e63229';
  ctx.fillRect(22, 22, 468, 72);

  // ISSUE text in bar
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 36px Bangers, Arial Black, Arial';
  ctx.textAlign = 'center';
  ctx.fillText('ISSUE #1', 256, 68);

  // Title plate box
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(50, 130, 412, 6);
  ctx.fillRect(50, 290, 412, 6);

  // PORTFOLIO big text
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 78px Bangers, Arial Black, Arial';
  ctx.textAlign = 'center';
  // Shadow
  ctx.fillStyle = '#e63229';
  ctx.fillText('PORTFOLIO', 260, 252);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillText('PORTFOLIO', 256, 248);

  // Starburst decoration
  ctx.fillStyle = '#fbbf24';
  ctx.save();
  ctx.translate(400, 380);
  const pts = 16;
  ctx.beginPath();
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? 44 : 20;
    const a = (i / (pts * 2)) * Math.PI * 2 - Math.PI / 2;
    i === 0 ? ctx.moveTo(Math.cos(a)*r, Math.sin(a)*r) : ctx.lineTo(Math.cos(a)*r, Math.sin(a)*r);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = '#e63229';
  ctx.font = 'bold 18px Bangers, Arial';
  ctx.textAlign = 'center';
  ctx.fillText('WOW!', 0, 8);
  ctx.restore();

  // Sub-headline
  ctx.fillStyle = '#6b21a8';
  ctx.font = 'bold 28px Bangers, Arial Black, Arial';
  ctx.textAlign = 'center';
  ctx.fillText('A Creative Developer Story', 256, 350);

  // Author line
  ctx.fillStyle = '#1a1a1a';
  ctx.font = '22px Bangers, Arial Black, Arial';
  ctx.fillText('BY ALEX MERCER', 256, 400);

  // Divider
  ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(80, 430); ctx.lineTo(432, 430); ctx.stroke();

  // Tagline
  ctx.fillStyle = '#555';
  ctx.font = '18px Georgia, serif';
  ctx.fillText('"Code is my superpower."', 256, 465);

  // Footer
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 16px Bangers, Arial';
  ctx.fillText('ANTIGRAVITY STUDIOS  •  2026', 256, 680);

  return new THREE.CanvasTexture(c);
}

function makePageTexture({ bgColor, label, icon, lines, accentColor }) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 720;
  const ctx = c.getContext('2d');

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 512, 720);

  // Halftone
  ctx.fillStyle = 'rgba(0,0,0,0.07)';
  for (let x = 12; x < 512; x += 22) {
    for (let y = 12; y < 720; y += 22) {
      ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Border
  ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, 500, 708);
  ctx.lineWidth = 2.5;
  ctx.strokeRect(20, 20, 472, 684);

  // Icon circle
  ctx.fillStyle = accentColor;
  ctx.beginPath(); ctx.arc(256, 120, 64, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 5; ctx.stroke();
  // Icon emoji
  ctx.font = '64px serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(icon, 256, 120);
  ctx.textBaseline = 'alphabetic';

  // Section label
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 54px Bangers, Arial Black, Arial';
  ctx.textAlign = 'center';
  // Shadow
  ctx.fillStyle = accentColor;
  ctx.fillText(label, 259, 225);
  ctx.fillStyle = '#fff';
  ctx.fillText(label, 256, 222);

  // Divider
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(60, 240, 392, 4);

  // Content lines
  ctx.textAlign = 'left';
  lines.forEach((line, i) => {
    const y = 285 + i * 52;
    // Bullet dot
    ctx.fillStyle = accentColor;
    ctx.beginPath(); ctx.arc(55, y - 10, 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 2; ctx.stroke();
    // Text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px Bangers, Arial Black, Arial';
    ctx.fillText(line.toUpperCase(), 78, y);
  });

  // Page number
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = 'bold 18px Bangers, Arial';
  ctx.fillText(`— ${lines.length + 1} —`, 256, 685);

  return new THREE.CanvasTexture(c);
}

/* ─────────────────────────────────────────────────────────
   Page definitions
───────────────────────────────────────────────────────── */
const PAGE_DEFS = [
  {
    bgColor: '#6b21a8', accentColor: '#fbbf24',
    label: 'ABOUT ME', icon: '🦸',
    lines: ['Full-Stack Developer', 'Motion & 3D Design', '6+ Years Experience', '30+ Projects Shipped'],
  },
  {
    bgColor: '#ea580c', accentColor: '#fde047',
    label: 'SKILLS', icon: '⚡',
    lines: ['React / Next.js  95%', 'Three.js / WebGL  82%', 'Node.js  88%', 'GSAP / Motion  90%'],
  },
  {
    bgColor: '#16a34a', accentColor: '#fde047',
    label: 'PROJECTS', icon: '🚀',
    lines: ['NovaSphere — Deployed', 'InkBot — In Progress', 'ShopForge — Live', 'BeatCanvas — Beta'],
  },
  {
    bgColor: '#0d9488', accentColor: '#fbbf24',
    label: 'CONTACT', icon: '📡',
    lines: ['alex@example.com', 'github.com/alexmercer', '@alexmercer_dev', 'Available for hire!'],
  },
];

/* ─────────────────────────────────────────────────────────
   3D Book Mesh
───────────────────────────────────────────────────────── */
function BookMesh() {
  const groupRef  = useRef();
  const coverRef  = useRef();
  const floatRef  = useRef({ angle: 0 });

  // Build all textures once
  const titleTex = useMemo(() => makeTitlePageTexture(), []);
  const pageTex  = useMemo(() => PAGE_DEFS.map(d => makePageTexture(d)), []);

  // Cover texture (red with title)
  const coverTex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 720;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#e63229';
    ctx.fillRect(0, 0, 512, 720);

    // Action lines
    ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = 1.5;
    for (let i = -20; i < 60; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 28 - 200, 0);
      ctx.lineTo(i * 28 + 400, 720);
      ctx.stroke();
    }

    // Border
    ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, 498, 706);
    ctx.lineWidth = 3;
    ctx.strokeRect(22, 22, 468, 676);

    // "COMIC PORTFOLIO" title
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 72px Bangers, Arial Black, Arial';
    ctx.textAlign = 'center';
    ctx.fillText('COMIC', 260, 200);
    ctx.fillText('PORTFOLIO', 260, 290);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('COMIC', 256, 196);
    ctx.fillText('PORTFOLIO', 256, 286);

    // Yellow bar
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(50, 320, 412, 8);

    // Author label
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 30px Bangers, Arial Black, Arial';
    ctx.fillText('BY ALEX MERCER', 256, 380);

    // Big starburst
    ctx.fillStyle = '#fbbf24';
    ctx.save(); ctx.translate(256, 520);
    const pts = 16;
    ctx.beginPath();
    for (let i = 0; i < pts * 2; i++) {
      const r = i % 2 === 0 ? 80 : 36;
      const a = (i / (pts * 2)) * Math.PI * 2 - Math.PI / 2;
      i === 0 ? ctx.moveTo(Math.cos(a)*r, Math.sin(a)*r) : ctx.lineTo(Math.cos(a)*r, Math.sin(a)*r);
    }
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 4; ctx.stroke();
    ctx.fillStyle = '#e63229';
    ctx.font = 'bold 34px Bangers, Arial Black';
    ctx.textAlign = 'center';
    ctx.fillText('#001', 0, 14);
    ctx.restore();

    // Barcode-style bottom
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(22, 654, 468, 44);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 18px Bangers, Arial';
    ctx.textAlign = 'center';
    ctx.fillText('ANTIGRAVITY STUDIOS  •  2026', 256, 683);

    return new THREE.CanvasTexture(c);
  }, []);

  useEffect(() => {
    if (!groupRef.current) return;

    // Scroll-driven book open
    ScrollTrigger.create({
      trigger: '#book-reveal',
      start: 'top 75%',
      end: 'bottom 20%',
      scrub: 1.8,
      onUpdate: (self) => {
        if (coverRef.current) {
          // Smoothly swing cover open from 0 → -π*0.9
          coverRef.current.rotation.y = -self.progress * Math.PI * 0.88;
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars?.trigger === '#book-reveal') t.kill();
      });
    };
  }, []);

  // Gentle floating animation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.015;
  });

  const W = 3.2;   // page width
  const H = 4.5;   // page height
  const D = 0.42;  // book depth

  return (
    <group ref={groupRef}>

      {/* ── Stacked inner pages (visible edges + surfaces) ── */}
      {[...PAGE_DEFS].reverse().map((_, rawIdx) => {
        const idx = PAGE_DEFS.length - 1 - rawIdx;
        const zOff = (idx / PAGE_DEFS.length) * 0.25;
        return (
          <mesh key={idx} position={[0, 0, -D / 2 + zOff]}>
            <boxGeometry args={[W, H, 0.03]} />
            <meshStandardMaterial map={pageTex[idx]} />
          </mesh>
        );
      })}

      {/* ── Title / first visible page (top of stack) ── */}
      <mesh position={[0, 0, D / 2 - 0.01]}>
        <planeGeometry args={[W - 0.08, H - 0.08]} />
        <meshStandardMaterial map={titleTex} />
      </mesh>

      {/* ── Book body (page block edges) ── */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[W + 0.02, H + 0.02, D]} />
        <meshStandardMaterial color="#f0ead8" />
      </mesh>

      {/* ── Spine ── */}
      <mesh position={[-(W / 2) - 0.06, 0, 0]}>
        <boxGeometry args={[0.14, H + 0.06, D + 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* ── Cover (rotates open around spine edge) ── */}
      <group ref={coverRef} position={[-(W / 2), 0, D / 2]}>
        {/* Cover board with canvas texture */}
        <mesh position={[W / 2, 0, 0.04]}>
          <boxGeometry args={[W + 0.04, H + 0.06, 0.06]} />
          <meshStandardMaterial map={coverTex} />
        </mesh>
        {/* Inner cover (back of cover — cream paper) */}
        <mesh position={[W / 2, 0, 0.01]}>
          <planeGeometry args={[W - 0.1, H - 0.1]} />
          <meshStandardMaterial color="#f8f3e8" side={THREE.BackSide} />
        </mesh>
      </group>

      {/* ── Back cover ── */}
      <mesh position={[0, 0, -(D / 2) - 0.04]}>
        <boxGeometry args={[W + 0.04, H + 0.06, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

    </group>
  );
}

/* ─────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────── */
export default function BookReveal() {
  return (
    <section
      className="section-book-reveal comic-section"
      id="book-reveal"
      style={{ background: 'var(--ink-deep)', minHeight: '100vh' }}
    >
      <div className="action-lines" />

      <div className="comic-section-inner" style={{ textAlign: 'center' }}>
        <motion.span
          className="section-eyebrow"
          style={{ color: 'var(--yellow)', marginBottom: '0.5rem' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          ✦ Now Presenting ✦
        </motion.span>

        {/* ── 3D Book Canvas ── */}
        <div style={{ width: '100%', height: '62vh', maxHeight: 540, position: 'relative' }}>
          <Canvas
            camera={{ position: [0, 0.5, 8], fov: 40 }}
            shadows
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.65} />
            <directionalLight position={[5, 8, 6]}  intensity={1.8} castShadow />
            <directionalLight position={[-4, -2, 3]} intensity={0.4} color="#fbbf24" />
            <pointLight       position={[0, 0, 5]}   intensity={0.5} color="#fff" />
            <BookMesh />
          </Canvas>

          {/* Scroll hint overlay */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-comic)',
              fontSize: '0.85rem',
              color: 'var(--yellow-bright)',
              letterSpacing: 2,
              opacity: 0.7,
              pointerEvents: 'none',
            }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↕ SCROLL TO OPEN BOOK
          </motion.div>
        </div>

        {/* Title plate below canvas */}
        <motion.div
          className="book-title-plate"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.3 }}
        >
          Issue #1 — Portfolio
        </motion.div>

        {/* Page legend */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1.25rem',
            flexWrap: 'wrap',
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {[
            { color: '#e63229', label: 'Cover'    },
            { color: '#6b21a8', label: 'About'    },
            { color: '#ea580c', label: 'Skills'   },
            { color: '#16a34a', label: 'Projects' },
            { color: '#0d9488', label: 'Contact'  },
          ].map(({ color, label }) => (
            <div
              key={label}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                fontFamily: 'var(--font-comic)',
                fontSize: '0.85rem',
                color: 'var(--cream)',
                letterSpacing: 1,
              }}
            >
              <span style={{ width: 14, height: 14, background: color, border: '2px solid #fff', borderRadius: 2, display: 'inline-block' }} />
              {label}
            </div>
          ))}
        </motion.div>

        <motion.p
          style={{
            fontFamily: 'var(--font-hand)',
            fontSize: '1.15rem',
            color: 'var(--cream)',
            opacity: 0.6,
            marginTop: '1rem',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          "Every great project starts with a blank panel."
        </motion.p>
      </div>
    </section>
  );
}
