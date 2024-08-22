import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import useClipboard from '../../hooks/useClipboard';
import { motion } from 'framer-motion';
import GradientBackdrop from './GradientBackdrop';

function Hero({ mediaDetails }: { mediaDetails: any }) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p';
  const { copyToClipboard } = useClipboard();

  return (
    <>
      <div className={`relative flex overflow-hidden md:h-[500px] md:w-full`}>
        <GradientBackdrop url={`${imageBaseUrl}/original${mediaDetails?.backdrop_path}`} />
        <div className="mt-4 flex w-full flex-col items-center px-10 md:mt-0 md:flex-row md:gap-5 md:place-self-end">
          <div className="relative mb-5 flex h-full max-h-96 min-h-80 min-w-52 max-w-52 flex-col gap-1 text-center">
            {mediaDetails && (
              <>
                <img
                  src={`${imageBaseUrl}/w400${mediaDetails.poster_path}`}
                  alt="cover img"
                  className={`h-auto w-full min-w-52 max-w-52 rounded-md shadow-2xl shadow-slate-950 transition-opacity duration-300`}
                />
                <motion.span
                  whileHover={{ color: '#7DD3FC' }}
                  className="cursor-pointer text-slate-300"
                  onClick={(e: any) =>
                    copyToClipboard({ text: e.target.innerText, item: 'Name & Date String' })
                  }
                >
                  {`${mediaDetails.title} (${mediaDetails.release_date.split('-')[0]})`}
                </motion.span>
              </>
            )}
          </div>

          <div className="flex flex-col justify-center gap-4 ">
            <div className="flex  flex-col justify-center gap-2">
              {mediaDetails && (
                <div className="flex flex-col items-center text-2xl md:items-start md:text-3xl ">
                  <div
                    className="flex items-start  gap-1 font-bold text-slate-100  hover:cursor-pointer"
                    onClick={() => copyToClipboard({ text: mediaDetails.title, item: 'Title' })}
                  >
                    <motion.span whileHover={{ color: '#7DD3FC' }}>
                      {mediaDetails.title}
                    </motion.span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Link
                to={`https://www.imdb.com/title/${mediaDetails?.external_ids.imdb_id}`}
                target="_blank"
              >
                <button className="flex items-start gap-1 rounded-md bg-sky-400 p-2 font-semibold text-neutral-900">
                  <span>View on IMDB</span>
                  <FiExternalLink />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
