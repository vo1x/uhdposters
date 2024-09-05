import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Card({ data }: { data: any }) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face';
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const getReleaseYear = (date: string) => (date ? date.split('-')[0] : 'Unknown');

  const imageSrc = data.poster_path
    ? `${imageBaseUrl}${data.poster_path}`
    : 'https://placehold.co/250x375';

  const darkPastelColors = [
    '#C48F65',
    '#A67B5B',
    '#8E6C4E',

    '#A39364',
    '#8A7E55',
    '#716A47',

    '#4A5D6B',
    '#3D4F5D',
    '#2F3F4A',

    '#8C4646',
    '#723A3A',
    '#5C2E2E',

    '#5D4E6D',
    '#46594C',
    '#615C4B',
    '#614C4C',
    '#4D5D4E',
    '#5B4D5D'
  ];

  const randomDarkPastelColor =
    darkPastelColors[Math.floor(Math.random() * darkPastelColors.length)];

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
                key="placeholder"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 rounded-md"
                style={{ backgroundColor: randomDarkPastelColor }}
              />
            )}
          </AnimatePresence>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            className="absolute inset-0 h-full w-full rounded-md object-cover"
            src={imageSrc}
            alt={data.title || 'Media poster'}
            onLoad={() => setImageLoaded(true)}
          />
          <AnimatePresence>
            {imageLoaded && isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 hidden w-full justify-center gap-2 rounded-b-md bg-gradient-to-t from-black via-transparent to-transparent pb-4 pt-72 text-xs text-slate-300 md:flex"
              >
                <span>{data.media_type.toUpperCase()}</span>
                <span>•</span>
                <span>{getReleaseYear(data.release_date)}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold md:text-sm truncate"
        >
          {data.title}
        </motion.span>
      </div>
    </Link>
  );
}

export default Card;
