import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
function Card({ data }) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face';
  const getReleaseYear = (date) => (date != undefined ? date.split('-')[0] : 'Unknown');
  const [isHovered, setIsHovered] = useState(false);
  const imageSrc =
    data['poster_path'] != undefined
      ? imageBaseUrl + data.poster_path
      : 'https://placehold.co/250x375';

  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      <Link to={`/details/${data.media_type}/${data.id}`}>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative flex h-full w-full min-w-28 max-w-28 flex-col gap-2 overflow-hidden rounded-md text-slate-400 transition-all duration-300 md:max-h-80 md:min-h-80 md:min-w-48 md:max-w-48`}
        >
          <div className="relative">
            <AnimatePresence>
              {!imageLoaded && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 h-[168px] w-28 bg-[#1e293b] md:max-h-72 md:min-h-72 md:w-48"
                />
              )}
              <motion.img
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                exit={{ opacity: 0 }}
                className="h-[168px] w-28 rounded-md object-cover md:h-72 md:w-48"
                src={imageSrc}
                alt="Media Backdrop"
                onLoad={() => setImageLoaded(true)}
              />
            </AnimatePresence>

            <AnimatePresence>
              {imageLoaded && isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-0 hidden w-full justify-center gap-1 rounded-b-md bg-gradient-to-t from-black via-transparent to-transparent pb-4 pt-72 text-xs text-slate-300 md:flex"
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
            className={`flex flex-col pb-1 text-xs font-semibold md:text-sm ${isHovered && 'md:text-pastelLightBlue'}`}
          >
            {data.title}
          </motion.span>
        </div>
      </Link>
    </>
  );
}

export default Card;
