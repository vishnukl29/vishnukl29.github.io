import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onEnter = (e) => {
      const tag = e.target?.tagName;
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(tag) ||
          e.target?.closest('a, button, input, textarea')) {
        setIsHovering(true);
      }
    };

    const onLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="custom-cursor"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="cursor-dot"
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="cursor-ring"
        animate={{
          width: isHovering ? 52 : 36,
          height: isHovering ? 52 : 36,
          borderColor: isHovering ? '#e63229' : '#1a1a1a',
          borderRadius: isHovering ? '0%' : '50%',
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
