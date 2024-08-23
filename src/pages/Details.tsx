import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Settings2, Languages } from 'lucide-react';
import PosterSkeleton from '../components/UI/PosterSkeleton';
import langCodes from '../utils/langCodes.json';
import Topbar from '../components/UI/Topbar';
import Hero from '../components/Details/Hero';
import Poster from '../components/Details/Poster';
import Select from '../components/UI/Select';
import Footer from '../components/UI/Footer';
import useClipboard from '../hooks/useClipboard';
import useMediaInfo from '../hooks/useMediaInfo';

function Details() {
  const { mediaType, id: mediaID } = useParams();
  const { mediaDetails } = useMediaInfo({ mediaType, mediaID });
  const { copyToClipboard } = useClipboard();

  const [runtime, setRuntime] = useState({
    hours: 0,
    minutes: 0
  });

  const languageSelectOptions =
    mediaDetails?.original_language !== 'en'
      ? [
          { value: 'en', label: 'English' },
          {
            value: mediaDetails?.original_language,
            label: `${langCodes[mediaDetails?.original_language as keyof typeof langCodes]}`
          }
        ]
      : [{ value: 'en', label: 'English' }];

  const [selectedOption, setSelectedOption] = useState(languageSelectOptions[0]);

  const convertToHours = () => {
    const minutes = mediaDetails?.runtime;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    setRuntime({ hours: hours, minutes: remainingMinutes });
  };

  useEffect(() => {
    convertToHours();
  }, [mediaDetails]);

  return (
    <>
      <Topbar />
      <div className="flex flex-col items-center md:items-start">
        <Hero mediaDetails={mediaDetails} />

        <div className="flex flex-col md:flex-row gap-8 md:gap-10 my-8 px-4 md:px-8 lg:px-16">
          <div className="flex flex-col w-80 h-max gap-4 p-4 bg-slate-800/75 rounded-md">
            {mediaDetails && mediaDetails?.original_language !== 'en' && (
              <>
                <div>
                  <span className="flex items-center gap-1 text-slate-300 text-sm md:text-base">
                    <Settings2 size={15} />
                    <span>Preferences</span>
                  </span>
                  <div className="mt-2 pl-2">
                    <span className="flex items-center gap-2 text-slate-300 text-sm md:text-base">
                      <Languages size={20} />
                      <Select
                        defaultValue={languageSelectOptions[0]}
                        options={languageSelectOptions}
                        onChange={setSelectedOption}
                        className="rounded-md"
                      />
                    </span>
                  </div>
                </div>
                <div className="my-4 border-b-2 border-slate-700" />
              </>
            )}

            <div className="flex flex-col gap-2">
              <span className="label text-sm md:text-base">Release Date</span>
              <motion.div
                whileHover={{ color: '#7DD3FC' }}
                className="cursor-pointer text-slate-400 text-sm md:text-base"
                onClick={(e: any) =>
                  copyToClipboard({
                    text: e.target.innerText.trim().split('-')[0],
                    item: 'Release Date'
                  })
                }
              >
                {mediaDetails?.release_date}
              </motion.div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="label text-sm md:text-base">Genres</span>
              <motion.div
                whileHover={{ color: '#7DD3FC' }}
                className="flex flex-col cursor-pointer text-slate-400 text-sm md:text-base"
                onClick={() =>
                  copyToClipboard({ text: mediaDetails?.genres.join(', '), item: 'Genres' })
                }
              >
                {mediaDetails?.genres &&
                  mediaDetails.genres.map((genre: string, index: number) => (
                    <span key={index} className="text-inherit">
                      {genre}
                    </span>
                  ))}
              </motion.div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="label text-sm md:text-base">
                Runtime{mediaType === 'tv' && <span> (Avg)</span>}
              </span>
              <motion.div
                className="text-slate-400 text-sm md:text-base"
                whileHover={{ color: '#7DD3FC' }}
                onClick={(e: any) =>
                  copyToClipboard({ text: e.target.innerText.trim(), item: 'Runtime' })
                }
              >
                {runtime.hours > 0 ? (
                  <span>
                    {runtime.hours}h {runtime.minutes}m
                  </span>
                ) : (
                  <span>{runtime.minutes}m</span>
                )}
              </motion.div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="label text-sm md:text-base">IMDB ID</span>
              <motion.div
                className="text-slate-400 text-sm md:text-base cursor-pointer"
                whileHover={{ color: '#7DD3FC' }}
                onClick={(e: any) =>
                  copyToClipboard({ text: e.target.innerText.trim(), item: 'IMDB ID' })
                }
              >
                {mediaDetails?.external_ids.imdb_id}
              </motion.div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="label text-sm md:text-base">IMDB URL</span>
              <motion.div
                className="text-slate-400 text-sm md:text-base cursor-pointer"
                whileHover={{ color: '#7DD3FC' }}
                onClick={(e: any) =>
                  copyToClipboard({ text: e.target.innerText.trim(), item: 'IMDB URL' })
                }
              >
                https://imdb.com/title/{mediaDetails?.external_ids.imdb_id}
              </motion.div>
            </div>

            {mediaType === 'tv' && (
              <div className="flex flex-col gap-2">
                <span className="label text-sm md:text-base">Season Info</span>
                <motion.div className="flex flex-col gap-4">
                  {mediaDetails?.seasons.map((season: any, index: number) => (
                    <div key={index} className="text-sm md:text-base text-slate-400 flex flex-col">
                      <span className="font-semibold truncate overflow-hidden whitespace-nowrap">
                        {season.name}
                      </span>
                      <span>{season.episode_count} episodes</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 place-items-center md:place-items-start md:grid-cols-4 lg:grid-cols-5 gap-10">
            {!mediaDetails?.posters
              ? Array.from({ length: 6 }, (_, index) => <PosterSkeleton key={index} />)
              : mediaDetails?.posters
                  .filter((poster: any) => poster.iso_639_1 === selectedOption.value)
                  .map((poster: any, index: number) => (
                    <Poster
                      key={index}
                      posterData={poster}
                      fileName={
                        mediaDetails && mediaDetails.title
                          ? 'Download ' + mediaDetails.title.replace(/[^a-zA-Z0-9\s]/g, '')
                          : ''
                      }
                    />
                  ))}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Details;
