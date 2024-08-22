import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function CardSkeleton({ textSkeleton = true, initialAnimation = true }) {
  return (
    <AnimatePresence initial={initialAnimation}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'tween' }}
        exit={{ scale: 0, opacity: 0 }}
        className="flex h-full flex-col gap-1 md:max-h-80 md:min-h-80"
      >
        <Skeleton
          baseColor="#1e293b"
          highlightColor="#334155"
          className="block h-full max-h-[168px] min-h-[168px] w-full min-w-28 max-w-28 md:max-h-72 md:min-h-72 md:min-w-48 md:max-w-48"
        />
        {textSkeleton && (
          <Skeleton
            count={1}
            baseColor="#1e293b"
            highlightColor="#334155"
            className="block h-5 w-24 md:bottom-5 md:min-w-40 md:max-w-40"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
