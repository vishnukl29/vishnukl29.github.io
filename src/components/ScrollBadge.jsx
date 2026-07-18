import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollBadge() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handler = () => setShow(window.scrollY < 200);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="scroll-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          SCROLL
          <span className="scroll-badge-arrow">↓</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
