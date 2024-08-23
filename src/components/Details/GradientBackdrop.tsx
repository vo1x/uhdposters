import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.35, transition: { duration: 0.5 } }
};

const placeholderVariants = {
  visible: { opacity: 0.35 },
  hidden: { opacity: 0, transition: { duration: 0.5 } }
};

export default function GradientBackdrop({ url }: { url: string }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="absolute inset-0 -z-10 hidden overflow-hidden md:block">
      <div className="relative h-[500px] w-full">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-l from-transparent to-slate-900" />
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-slate-900 to-transparent" />

        <AnimatePresence initial={false}>
          <motion.div
            key="placeholder"
            variants={placeholderVariants}
            initial="visible"
            animate={imageLoaded ? 'hidden' : 'visible'}
            className="absolute inset-0 -z-20 bg-slate-800"
          />
          <motion.img
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate={imageLoaded ? 'visible' : 'hidden'}
            src={url}
            alt="Backdrop"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            onLoad={() => setImageLoaded(true)}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
