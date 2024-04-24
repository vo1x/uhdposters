import { useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion, AnimatePresence } from 'framer-motion';
function Card(props) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face';
  const getReleaseYear = (date) => (date != undefined ? date.split('-')[0] : 'Unknown');
  const [isHovered, setIsHovered] = useState(false);
  const imageSrc =
    props.data['poster_path'] != undefined
      ? imageBaseUrl + props.data['poster_path']
      : 'https://placehold.co/250x375';

  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      <Link to={`/details/${props.data.media_type}/${props.data.id}`}>
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
                  <span>{props.data['media_type'].toUpperCase()}</span>
                  <span>•</span>
                  <span>
                    {getReleaseYear(props.data['release_date'] || props.data['first_air_date'])}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex flex-col pb-1 text-xs font-semibold md:text-sm ${isHovered && 'md:text-pastelLightBlue'}`}
          >
            {props.data['title'] || props.data['name']}
          </motion.span>
        </div>
      </Link>
    </>
  );
}

export default Card;
