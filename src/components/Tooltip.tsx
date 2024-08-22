import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tooltip({ infoText, children }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const slideSpring = {
    visible: {
      opacity: 1,
      top: -25,
      right: 0,
      transition: {
        type: 'spring',
      }
    },
    hidden: {
      opacity: 0,
      left: 0
    }
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            key="tip"
            variants={slideSpring}
            initial={{ opacity: 0, left: 0 }}
            animate="visible"
            exit="hidden"
            className="absolute inset-0 text-sm bg-slate-700 text-slate-300 min-w-10 text-center h-max p-1 rounded-md"
          >
            <span>{infoText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
