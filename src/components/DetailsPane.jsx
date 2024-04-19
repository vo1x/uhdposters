import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { FiCopy } from 'react-icons/fi';
// import { FaExpandArrowsAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useClipboard from '../hooks/useClipboard';
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
        className={`relative flex h-[500px] items-center gap-5 overflow-hidden p-10 text-slate-100 `}
      >
        <div className=" absolute inset-0 -z-10 bg-gradient-to-r from-slate-900 object-cover"></div>

        <div className=" absolute inset-0 -z-10 bg-gradient-to-t from-slate-900 object-cover"></div>
        <div className=" absolute inset-0 -z-10 bg-gradient-to-b from-slate-900 object-cover"></div>
        <img
          src={`${imageBaseUrl + mediaInfo.backdrop_path}`}
          alt=""
          className="absolute inset-0 -z-20 w-screen object-cover"
        />
        <div className="relative flex h-max flex-col items-center gap-2">
          <img
            src={imageBaseUrl + mediaInfo.poster_path}
            alt="cover img"
            className={`h-auto w-full min-w-52 max-w-52 rounded-md shadow-2xl shadow-slate-950  transition-opacity duration-300`}
          />
          {mediaInfo && (
            <span
              className="cursor-pointer text-slate-300 hover:text-sky-300"
              onClick={(e) =>
                handleItemCopy(
                  e.target.innerText,
                  'Name & Date String'
                )
              }
            >{`${mediaInfo.name||mediaInfo.title} (${mediaType === 'tv' && mediaInfo.first_air_date ? mediaInfo.first_air_date.split('-')[0] : mediaInfo.release_date.split('-')[0]})`}</span>
          )}
          {/* {isHovered && (
            <FaExpandArrowsAlt
              className="absolute bottom-0 left-0 right-0 top-0 m-auto text-3xl"
              style={{ opacity: 1 }} // Set opacity to 1 to ensure it's always fully visible
            />
          )} */}
        </div>

        <div>
          <div className="flex flex-col gap-2">
            <div className="flex content-center gap-2 text-5xl font-bold ">
              <span
                className="hover:cursor-pointer  hover:text-sky-300"
                onClick={() => handleItemCopy(mediaInfo.title || mediaInfo.name, 'Title')}
              >
                {mediaInfo.title || mediaInfo.name}{' '}
              </span>
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
              <span
                className="font-bold hover:cursor-pointer hover:text-sky-300"
                onClick={() =>
                  handleItemCopy(
                    mediaInfo.release_date || mediaInfo.first_air_date.split('-')[0],
                    'Date'
                  )
                }
              >
                {mediaInfo.release_date || mediaInfo.first_air_date}
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-3">
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
                <span
                  className="text-slate-100 hover:cursor-pointer  hover:text-sky-300"
                  onClick={() => {
                    handleItemCopy(mediaInfo['overview'], 'Overview');
                  }}
                >
                  {mediaInfo.overview}
                </span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <p>
                <span className="text-md font-bold text-slate-300/80">
                  Runtime {`${mediaType === 'tv' ? '(Avg)' : ''}`}:
                </span>{' '}
                <span
                  className="hover:cursor-pointer hover:text-sky-300"
                  onClick={() =>
                    handleItemCopy(
                      `${runtime.hours === 0 ? `${runtime.hours}h` : ''} ${runtime.minutes}m`,
                      'Runtime'
                    )
                  }
                >
                  {`${runtime.hours === 0 ? '' : `${runtime.hours}h`} ${runtime.minutes}m`}
                </span>
              </p>
              <p>
                <span className="text-md font-bold text-slate-300/80">IMDB ID:</span>{' '}
                <span
                  className="hover:cursor-pointer hover:text-sky-300"
                  onClick={() => handleItemCopy(imdbID, 'IMDB ID')}
                >
                  {imdbID}
                </span>
              </p>
              <p>
                <span className="text-md font-bold text-slate-300/80">IMDB URL:</span>{' '}
                <span
                  className="hover:cursor-pointer hover:text-sky-300"
                  onClick={() => handleItemCopy(`https://www.imdb.com/title/${imdbID}`, 'IMDB URL')}
                >
                  https://www.imdb.com/title/{imdbID}
                </span>
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
