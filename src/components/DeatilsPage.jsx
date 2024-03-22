import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Poster from './Poster';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiExternalLink } from 'react-icons/fi';
import SearchBar from './SearchBar';
import Header from './Header';
import Topbar from './Topbar';
import { FaRegCopy } from 'react-icons/fa';
import Tooltip from './Tooltip';

function DetailsPage() {
  const { mediaType, id } = useParams();
  const [posters, setPosters] = useState([]);
  const [mediaInfo, setMediaInfo] = useState({});
  const [seasonsInfo, setSeasonsInfo] = useState([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const tmdbBaseUrl = 'https://api.themoviedb.org/3';
  const postersUrl = `${tmdbBaseUrl}/${mediaType}/${id}/images?api_key=${apiKey}`;
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

  const thumbnailStyles = {
    maxWidth: '200px',
    minWidth: '200px',
    width: '100%',
    height: 'auto'
  };

  const [imdbID, setImdbID] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(`${tmdbBaseUrl}/${mediaType}/${id}?api_key=${apiKey}`);
        const info = await response.json();
        setMediaInfo(info);
        setSeasonsInfo(info.seasons);
      } catch (error) {
        error.log('Error occurred: ', error);
      }
    };
    const fetchPosters = async () => {
      try {
        const response = await fetch(postersUrl);
        const data = await response.json();
        const sortedPosters = data['posters'].sort((a, b) => {
          return b.width - a.width;
        });
        const filteredResults = sortedPosters.filter((poster) => {
          return poster.iso_639_1 == 'en' || poster.iso_639_1 == mediaInfo.original_language;
        });
        setPosters(filteredResults);
      } catch (error) {
        console.error('Error occurred: ', error);
      }
    };

    const fetchExternalID = async () => {
      try {
        const response = await fetch(
          `${tmdbBaseUrl}/${mediaType}/${id}/external_ids?api_key=${apiKey}`
        );
        const ids = await response.json();
        setImdbID(ids.imdb_id);
      } catch (error) {
        error.log('Error occured: ', error);
      }
    };

    fetchInfo();
    fetchExternalID();
    fetchPosters();
  }, []);

  const [isCopySuccess, setIsCopySuccess] = useState(false);
  const handleCopyAction = () => {
    const genreNames = [];
    mediaInfo.genres &&
      mediaInfo.genres.forEach((genre) => {
        genreNames.push(genre.name);
      });

    try {
      navigator.clipboard.writeText(genreNames).then(() => {
        setIsCopySuccess(true);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleIDCopy = () => {
    if (imdbID != null) {
      navigator.clipboard.writeText(imdbID).then(() => {
        const notify = () => {
          toast.success('IMDB ID copied successfully!', { theme: 'colored', autoClose: 2000 });
        };
        notify();
      });
    }
  };

  const handleURLCopy = () => {
    if (imdbID != null) {
      navigator.clipboard.writeText(`https://www.imdb.com/title/${imdbID}`).then(() => {
        const notify = () => {
          toast.success('IMDB URL copied successfully!', { theme: 'colored', autoClose: 2000 });
        };
        notify();
      });
    }
  };

  const handleItemCopy = (item, type) => {
    try {
      navigator.clipboard.writeText(item).then(() => {
        const notify = () => {
          toast.success(`${type} copied successfully!`, { theme: 'colored', autoClose: 2000 });
        };
        notify();
        setIsCopySuccess(true);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <Topbar></Topbar>
        <div className="min-h-screen bg-slate-900 pb-5 text-slate-100">
          {/* <div>
          <Link to="/">Go back to home</Link>
        </div> */}
          <div className="flex gap-5 p-10">
            <div>
              <img
                src={imageBaseUrl + mediaInfo.poster_path}
                style={thumbnailStyles}
                alt="cover img"
                className="rounded-md ring-2"
              />
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
                        (mediaInfo.release_date || mediaInfo.first_air_date).split('-')[0],
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
                      <Tooltip
                        content={isCopySuccess ? 'Copied!' : 'Click to copy'}
                        onHide={setIsCopySuccess}
                      >
                        <button onClick={handleCopyAction}>
                          <FaRegCopy className="text-slate-400 hover:text-sky-300" />
                        </button>
                      </Tooltip>
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
                      onClick={handleIDCopy}
                    >
                      {imdbID}
                    </span>
                  </p>
                  <p>
                    <span className="text-md font-bold text-slate-400">IMDB URL:</span>{' '}
                    <span
                      className="hover:cursor-pointer hover:text-sky-300"
                      onClick={handleURLCopy}
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
                              <span className="text-slate-300">
                                {season.episode_count} episodes
                              </span>
                            </span>
                          ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap content-center justify-center gap-10">
            {posters && posters.map((poster, index) => <Poster key={index} data={poster} />)}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default DetailsPage;
