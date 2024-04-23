import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { FiCopy } from 'react-icons/fi';
// import { FaExpandArrowsAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useClipboard from '../hooks/useClipboard';
import { motion } from 'framer-motion';
function DetailsPane(props) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';
  const { mediaInfo, imdbID, seasonsInfo, mediaType } = props;

  // const [isHovered, setIsHovered] = useState(false);
  const [handleItemCopy] = useClipboard();
  const [runtime, setRuntime] = useState({
    hours: 0,
    minutes: 0
  });
  useEffect(() => {
    const convertToHours = () => {
      const minutes = mediaInfo?.runtime || mediaInfo?.last_episode_to_air?.runtime;
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      setRuntime({ hours: hours, minutes: remainingMinutes });
    };
    convertToHours();
  }, [mediaInfo]);

  return (
    <>
      <div
        className={`relative flex flex-col items-center gap-5 overflow-hidden p-10 text-slate-100 md:h-[500px] md:flex-row `}
      >
        <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-slate-900 object-cover md:block"></div>

        <div className="absolute inset-0 -z-10 hidden bg-gradient-to-t from-slate-900 object-cover md:block"></div>
        <div className="absolute inset-0 -z-10 hidden bg-gradient-to-b from-slate-900 object-cover md:block"></div>
        <img
          src={`${imageBaseUrl + mediaInfo.backdrop_path}`}
          alt=""
          className="absolute inset-0 -z-20 hidden w-screen object-cover md:block"
        />
        <div className="relative flex h-max flex-col items-center gap-2">
          <img
            src={imageBaseUrl + mediaInfo.poster_path}
            alt="cover img"
            className={`h-auto w-full min-w-52 max-w-52 rounded-md shadow-2xl shadow-slate-950  transition-opacity duration-300`}
          />
          {mediaInfo && (
            <motion.span
              whileHover={{ color: '#7DD3FC' }}
              className="cursor-pointer text-slate-300 "
              onClick={(e) => handleItemCopy(e.target.innerText, 'Name & Date String')}
            >
              {`${mediaInfo.name || mediaInfo.title} (${mediaType === 'tv' && mediaInfo.first_air_date ? mediaInfo.first_air_date.split('-')[0] : mediaInfo.release_date ? mediaInfo.release_date.split('-')[0] : ''})`}
            </motion.span>
          )}

          {/* {isHovered && (
            <FaExpandArrowsAlt
              className="absolute bottom-0 left-0 right-0 top-0 m-auto text-3xl"
              style={{ opacity: 1 }} // Set opacity to 1 to ensure it's always fully visible
            />
          )} */}
        </div>

        <div>
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2 text-center text-2xl font-bold md:text-5xl ">
              <motion.div
                whileHover={{ color: '#7DD3FC' }}
                className="hover:cursor-pointer  "
                onClick={() => handleItemCopy(mediaInfo.title || mediaInfo.name, 'Title')}
              >
                {mediaInfo.title || mediaInfo.name}{' '}
              </motion.div>
              {(mediaInfo['original_title'] || mediaInfo['original_name']) != undefined &&
              mediaInfo['original_language'] != 'en' ? (
                <span
                  className="text-slate-400 hover:cursor-pointer hover:text-sky-300"
                  onClick={() => {
                    handleItemCopy(
                      mediaInfo['original_title'] || mediaInfo['original_name'],
                      'Original Name'
                    );
                  }}
                >
                  [{mediaInfo['original_title'] || mediaInfo['original_name']}]
                </span>
              ) : null}
              <span className="flex flex-col justify-end">
                <Link to={`https://www.imdb.com/title/${imdbID}`} target="_blank">
                  <FiExternalLink className="text-xl text-slate-400 hover:text-sky-300" />
                </Link>
              </span>
            </div>
            <span className="text-lg text-slate-400">
              Relased on{' '}
              <motion.span
                whileHover={{ color: '#7DD3FC' }}
                className="font-bold hover:cursor-pointer "
                onClick={() =>
                  handleItemCopy(
                    mediaInfo.release_date || mediaInfo.first_air_date.split('-')[0],
                    'Date'
                  )
                }
              >
                {mediaInfo.release_date || mediaInfo.first_air_date}
              </motion.span>
            </span>
          </div>
          <div className="flex w-screen flex-col gap-3 px-2  md:w-full">
            <div className="mt-3">
              <span className="text-md font-bold text-slate-300/80">Genres</span>

              <div className="flex gap-3">
                <ul className="flex gap-2">
                  {mediaInfo.genres &&
                    mediaInfo.genres.map((genre) => (
                      <li
                        key={genre.id}
                        className="rounded-md bg-slate-800 px-2 py-1 text-sm font-bold text-slate-300"
                      >
                        {genre.name}
                      </li>
                    ))}
                </ul>
                <div>
                  <button
                    onClick={() => {
                      var genreList = [];
                      mediaInfo.genres.forEach((genre) => genreList.push(genre.name));
                      handleItemCopy(genreList.join(', '), 'Genres');
                    }}
                  >
                    <FiCopy className="text-slate-400 hover:text-sky-300" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="flex flex-col">
                <span className="text-md font-bold text-slate-300/80">Overview</span>{' '}
                <motion.div
                  whileHover={{ color: '#7DD3FC' }}
                  className="text-slate-100 hover:cursor-pointer  "
                  onClick={() => {
                    handleItemCopy(mediaInfo['overview'], 'Overview');
                  }}
                >
                  {mediaInfo.overview}
                </motion.div>
              </p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <p className="flex gap-1">
                <span className="text-md font-bold text-slate-300/80">
                  Runtime {`${mediaType === 'tv' ? '(Avg)' : ''}`}:
                </span>{' '}
                <motion.div
                  whileHover={{ color: '#7DD3FC' }}
                  className="hover:cursor-pointer "
                  onClick={() =>
                    handleItemCopy(
                      `${runtime.hours === 0 ? `${runtime.hours}h` : ''} ${runtime.minutes}m`,
                      'Runtime'
                    )
                  }
                >
                  {`${runtime.hours === 0 ? '' : `${runtime.hours}h`} ${runtime.minutes}m`}
                </motion.div>
              </p>
              <p className="flex gap-1">
                <span className="text-md font-bold text-slate-300/80">IMDB ID:</span>{' '}
                <motion.div
                  whileHover={{ color: '#7DD3FC' }}
                  className="hover:cursor-pointer "
                  onClick={() => handleItemCopy(imdbID, 'IMDB ID')}
                >
                  {imdbID}
                </motion.div>
              </p>
              <p className="flex gap-1">
                <span className="text-md font-bold text-slate-300/80">IMDB URL:</span>{' '}
                <motion.div
                  whileHover={{ color: '#7DD3FC' }}
                  className="hover:cursor-pointer "
                  onClick={() => handleItemCopy(`https://www.imdb.com/title/${imdbID}`, 'IMDB URL')}
                >
                  https://www.imdb.com/title/{imdbID}
                </motion.div>
              </p>
            </div>
            <div>
              {mediaType == 'tv' ? (
                <div>
                  <span className="text-md font-bold text-slate-300/80">Season Info</span>

                  <div className="flex flex-wrap gap-3">
                    {seasonsInfo &&
                      seasonsInfo.map((season) => (
                        <span
                          key={season.id}
                          className="flex w-max flex-col rounded-md bg-slate-800 p-2"
                        >
                          <span className="font-bold text-slate-300">{season.name}</span>{' '}
                          <span className="text-slate-300">{season.episode_count} episodes</span>
                        </span>
                      ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsPane;
