import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function PosterSkeleton({ enableAnimation = true }) {
  return (
    <AnimatePresence initial={enableAnimation}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'tween' }}
        exit={{ scale: 0, opacity: 0 }}
      >
        <Skeleton baseColor="#1e293b" highlightColor="#334155" className="w-60 aspect-[2/3]" />
      </motion.div>
    </AnimatePresence>
  );
}
