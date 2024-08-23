import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { Video } from 'lucide-react';
import useClipboard from '../../hooks/useClipboard';
import { motion } from 'framer-motion';
import GradientBackdrop from './GradientBackdrop';

function Hero({ mediaDetails }: { mediaDetails: any }) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p';
  const { copyToClipboard } = useClipboard();
  const trailerUrl = `https://youtube.com/embed/${mediaDetails?.videos[0].key}`;
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
                <div className="flex flex-col gap-2">
                  <motion.span
                    className="text-2xl md:items-start md:text-3xl font-bold text-slate-100"
                    whileHover={{ color: '#7DD3FC' }}
                    onClick={() => copyToClipboard({ text: mediaDetails.title, item: 'Title' })}
                  >
                    {mediaDetails.title}
                  </motion.span>
                  <motion.span
                    className="text-slate-300 cursor-pointer max-w-4xl [text-shadow:_0_0_5px_rgb(0_0_0_/_75%)]"
                    whileHover={{ color: '#7DD3FC' }}
                    onClick={() =>
                      copyToClipboard({ text: mediaDetails.overview, item: 'Overview' })
                    }
                  >
                    {mediaDetails.overview}
                  </motion.span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex gap-2">
                <Link to={trailerUrl} target="_blank">
                  <button
                    disabled={!trailerUrl || trailerUrl === ''}
                    className={`flex items-center gap-2 rounded-md p-3 font-semibold text-white shadow-md transition-colors ${
                      !trailerUrl || trailerUrl === ''
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    <Video fill="#FFFFFF" stroke="none" />
                    <span>Trailer</span>
                  </button>
                </Link>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`https://www.imdb.com/title/${mediaDetails?.external_ids.imdb_id}`}
                  target="_blank"
                >
                  <button className="flex items-start w-40 justify-center gap-1 rounded-md bg-[#F5B042] py-3 font-semibold text-neutral-900">
                    <span>View on IMDB</span>
                    <FiExternalLink />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
