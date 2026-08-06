import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STAGES = [
  'Loading please wait...',
  'Setting Up...',
];

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onDone, 600);
        }, 400);
      }
      setProgress(Math.min(current, 100));
      setStageIdx(Math.min(Math.floor((current / 100) * STAGES.length), STAGES.length - 1));
    }, 280);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Starburst logo */}
          <motion.div
            className="loading-starburst starburst"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
          >
            <span style={{ fontSize: '2rem' }}>⚡</span>
          </motion.div>

          <motion.div
            className="loading-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Melcow
          </motion.div>

          {/* Inking meter */}
          <div>
            <div className="loading-bar-track">
              <div
                className="loading-bar-fill"
                style={{ width: `${progress}%` }}
              />
              <span className="loading-percent">{Math.round(progress)}%</span>
            </div>
          </div>

          <motion.div
            className="loading-status"
            key={stageIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            style={{ fontFamily: "'DynaPuff', cursive", fontWeight: 600 }}
          >
            {STAGES[stageIdx]}
          </motion.div>

          {/* Decorative dots row */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[0, 1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                style={{
                  width: 10, height: 10,
                  borderRadius: '50%',
                  background: ['#e63229', '#6b21a8', '#ea580c', '#16a34a', '#fbbf24'][i],
                  border: '2px solid #1a1a1a',
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
