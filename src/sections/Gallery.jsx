import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import photo2  from '../assets/Gallery/2.jpeg';
import photo3  from '../assets/Gallery/3.jpeg';
import photo4  from '../assets/Gallery/4.jpeg';
import photo5  from '../assets/Gallery/5.jpeg';
import photo6  from '../assets/Gallery/6.jpeg';
import photo7  from '../assets/Gallery/7.jpeg';
import photo8  from '../assets/Gallery/8.jpeg';
import photo9  from '../assets/Gallery/9.jpeg';
import photo10 from '../assets/Gallery/10.jpeg';
import photo11 from '../assets/Gallery/11.jpeg';

const PHOTOS = [
  photo2, photo3, photo4, photo5, photo6,
  photo7, photo8, photo9, photo10, photo11,
];

/* Stack rotations for top 5 preview cards only */
const STACK_ROTATIONS = [-14, -7, 0, 7, 13];

/* ── Lightbox — instant CSS fade, no spring ── */
function Lightbox({ src, onClose }) {
  if (!src) return null;
  return (
    <div className="snaps-lb" onClick={onClose}>
      <img
        src={src}
        alt="Snap"
        className="snaps-lb-img"
        onClick={(e) => e.stopPropagation()}
      />
      <button className="snaps-lb-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>
  );
}

/* ── Bundle stack ── */
function SnapBundle({ onScatter }) {
  const preview = PHOTOS.slice(0, 5);

  return (
    <div className="snaps-bundle-row">
      {/* Stack */}
      <div className="snaps-stack-col">
        <div
          className="snaps-stack"
          onClick={onScatter}
          role="button"
          tabIndex={0}
          aria-label="Click to spread photos"
          onKeyDown={(e) => e.key === 'Enter' && onScatter()}
        >
          {preview.map((src, i) => (
            <div
              key={i}
              className="snaps-card"
              style={{
                transform: `rotate(${STACK_ROTATIONS[i]}deg) translateY(${-i * 4}px)`,
                zIndex: i,
              }}
            >
              <img src={src} alt="" loading="lazy" draggable={false} />
            </div>
          ))}
          <div className="snaps-pulse-ring" />
        </div>
        <button className="snaps-scatter-btn" onClick={onScatter}>
          📷 Spread Snaps
        </button>
      </div>

    
    </div>
  );
}

/* ── Scattered grid ── */
function SnapGrid({ onGather, onLightbox }) {
  return (
    <div className="snaps-grid-wrap">
      <div className="snaps-grid mt-6">
        {PHOTOS.map((src, i) => (
          <div
            key={i}
            className="snaps-photo"
            style={{ animationDelay: `${i * 0.04}s` }}
            onClick={() => onLightbox(src)}
          >
            <img src={src} alt={"Snap " + (i + 1)} loading="lazy" draggable={false} />
            <span className="snaps-photo-num">{i + 1}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <button className="snaps-gather-btn" onClick={onGather}>
          ← Gather Back
        </button>
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function Gallery() {
  const [scattered, setScattered] = useState(false);
  const [lightbox,  setLightbox]  = useState(null);

  return (
    <>
      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />

      <section className="comic-section section-gallery" id="gallery">
        <div className="action-lines" />
        <div className="comic-section-inner">

          {/* Header */}
          <div className="snaps-header">
            <span className="section-eyebrow" style={{ color: 'var(--ink)' }}>
              Through My Lens
            </span>
            <h2 className="snaps-title">📷 Snaps</h2>
          </div>

          {/* Bundle / Grid toggle */}
          <AnimatePresence mode="wait">
            {!scattered ? (
              <motion.div
                key="bundle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SnapBundle onScatter={() => setScattered(true)} />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SnapGrid
                  onGather={() => setScattered(false)}
                  onLightbox={setLightbox}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </>
  );
}
