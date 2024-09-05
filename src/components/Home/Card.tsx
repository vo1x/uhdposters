import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CardTag from '../UI/CardTag';

import { lightPastelColors } from '../../utils/colorHexCodes.json';
const imageVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.5 }
  },
  hover: {
    translateY: -5,
    transition: { duration: 0.2 }
  }
};
function Card({ data }: { data: any }) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face';
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const [randomLightPastelColor, setRandomLightPastelColor] = useState('');

  const generateRandomLightPastelColor = useCallback(() => {
    setRandomLightPastelColor(
      lightPastelColors[Math.floor(Math.random() * lightPastelColors.length)]
    );
  }, []);

  useEffect(() => {
    generateRandomLightPastelColor();
  }, []);
  const getReleaseYear = useCallback((date: string) => (date ? date.split('-')[0] : 'Unknown'), []);

  const imageSrc = data.poster_path
    ? `${imageBaseUrl}${data.poster_path}`
    : 'https://placehold.co/250x375';

  return (
    <Link to={`/details/${data.media_type}/${data.id}`}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex h-auto w-28 flex-col gap-2 overflow-hidden rounded-md text-slate-400 transition-all duration-300 md:w-40 lg:w-48"
      >
        <div className="relative aspect-[2/3]">
          <AnimatePresence>
            {!imageLoaded && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-md  bg-[#1e293b]"
              />
            )}
          </AnimatePresence>
          <motion.img
            variants={imageVariants}
            initial="initial"
            animate={imageLoaded ? 'animate' : 'initial'}
            whileHover={'hover'}
            className="absolute inset-0 h-full w-full rounded-md object-cover"
            src={imageSrc}
            alt={data.title || 'Media poster'}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="overflow-hidden flex flex-col gap-2">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold md:text-sm truncate "
            style={{ color: isHovered ? randomLightPastelColor : '#e2e8f0' }}
          >
            {data.title}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <CardTag>{data.media_type.toUpperCase()}</CardTag>
            <CardTag>{getReleaseYear(data.release_date)}</CardTag>
          </motion.span>
        </div>
      </div>
    </Link>
  );
}

export default Card;
