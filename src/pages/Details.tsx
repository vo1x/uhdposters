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
    mediaDetails?.original_language != 'en'
      ? [
          {
            value: 'en',
            label: 'English'
          },
          {
            value: mediaDetails?.original_language,
            label: `${langCodes[mediaDetails?.original_language as keyof typeof langCodes]}`
          }
        ]
      : [
          {
            value: 'en',
            label: 'English'
          }
        ];

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
      <Topbar></Topbar>
      <div className="flex flex-col items-center md:items-start">
        <Hero mediaDetails={mediaDetails} />

        <div className="flex mx-10 mt-8 gap-10">
          <div className="flex w-72 flex-col gap-4 h-max p-4 rounded-md bg-slate-800/75">
            <div className="flex flex-col gap-1">
              <span className="label">Release Date</span>
              <motion.div
                whileHover={{ color: '#7DD3FC' }}
                className="col-span-2 cursor-pointer text-slate-400 text-sm"
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
            <div className="flex flex-col gap-1">
              <span className="label">Genres</span>
              <motion.div
                whileHover={{ color: '#7DD3FC' }}
                className="flex flex-col cursor-pointer text-slate-400"
                onClick={() =>
                  copyToClipboard({ text: mediaDetails?.genres.join(', '), item: 'Genres' })
                }
              >
                {mediaDetails?.genres &&
                  mediaDetails.genres.map((genre: string, index: number) => (
                    <span key={index} className="text-inherit text-sm">
                      {genre}
                    </span>
                  ))}
              </motion.div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="label">Runtime{mediaType === 'tv' && <span> (Avg)</span>}</span>
              <motion.div
                className="text-slate-400 text-sm"
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
            <div className="flex flex-col gap-1">
              <span className="label">IMDB ID</span>
              <motion.div
                className="text-slate-400 text-sm cursor-pointer"
                whileHover={{ color: '#7DD3FC' }}
                onClick={(e: any) =>
                  copyToClipboard({ text: e.target.innerText.trim(), item: 'IMDB ID' })
                }
              >
                {mediaDetails?.external_ids.imdb_id}
              </motion.div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="label">IMDB URL</span>
              <motion.div
                className="text-slate-400 text-sm cursor-pointer"
                whileHover={{ color: '#7DD3FC' }}
                onClick={(e: any) =>
                  copyToClipboard({ text: e.target.innerText.trim(), item: 'IMDB URL' })
                }
              >
                https://imdb.com/title/{mediaDetails?.external_ids.imdb_id}
              </motion.div>
            </div>

            {mediaType === 'tv' && (
              <div className="flex flex-col gap-1">
                <span className="label">Season Info</span>

                <motion.div className="flex flex-col gap-4">
                  {mediaDetails?.seasons.map((season: any, index: number) => (
                    <div key={index} className="text-sm text-slate-400 flex flex-col">
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
          <div className="grid grid-cols-4 place-items-start gap-10">
            {!mediaDetails?.posters
              ? Array.from({ length: 6 }, (_, index) => <PosterSkeleton key={index} />)
              : mediaDetails?.posters &&
                mediaDetails?.posters
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
          {mediaDetails && mediaDetails?.original_language != 'en' && (
            <div className="sticky top-20 z-20 rounded-md  bg-slate-800/75 p-4 h-max">
              <span className="flex items-center gap-1 text-slate-300">
                <Settings2 size={15}></Settings2>
                <span>Preferences</span>
              </span>
              <div className="mt-2 pl-2">
                <span className="flex items-center gap-2 text-slate-300">
                  <Languages size={20}></Languages>
                  <Select
                    defaultValue={languageSelectOptions[0]}
                    options={languageSelectOptions}
                    onChange={setSelectedOption}
                    className={`rounded-md`}
                  ></Select>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </>
  );
}

export default Details;
