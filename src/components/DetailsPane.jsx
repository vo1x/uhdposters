import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { FiCopy } from 'react-icons/fi';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import { useState } from 'react';

function DetailsPane(props) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';
  const { mediaInfo, imdbID, seasonsInfo, mediaType } = props;
  const [isHovered, setIsHovered] = useState(false);
  const handleItemCopy = (item, type) => {
    try {
      navigator.clipboard.writeText(item).then(() => {
        const notify = () => {
          toast.success(`${type} copied successfully!`, { theme: 'colored', autoClose: 2000 });
        };
        notify();
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex gap-5 p-10 text-slate-100">
        <div
          className="relative ring-2"
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <img
            src={imageBaseUrl + mediaInfo.poster_path}
            alt="cover img"
            className={`h-auto w-full min-w-52 max-w-52 rounded-md  transition-opacity ${isHovered ? 'opacity-10' : ''} duration-300`}
          />
          {isHovered && (
            <FaExpandArrowsAlt
              className="absolute bottom-0 left-0 right-0 top-0 m-auto text-3xl"
              style={{ opacity: 1 }} // Set opacity to 1 to ensure it's always fully visible
            />
          )}
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
            <span className="text-lg text-slate-500">
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
              <span className="text-md font-bold text-slate-400">Genres</span>

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
                <span className="text-md font-bold text-slate-400">Overview</span>{' '}
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
                <span className="text-md font-bold text-slate-400">IMDB ID:</span>{' '}
                <span
                  className="hover:cursor-pointer hover:text-sky-300"
                  onClick={() => handleItemCopy(imdbID, 'IMDB ID')}
                >
                  {imdbID}
                </span>
              </p>
              <p>
                <span className="text-md font-bold text-slate-400">IMDB URL:</span>{' '}
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
                  <span className="text-md font-bold text-slate-400">Season Info</span>

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
