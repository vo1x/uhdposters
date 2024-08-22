import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Settings2, Languages } from 'lucide-react';

import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';

import langCodes from '../utils/langCodes.json';

import Topbar from '../components/UI/Topbar';
import Trailer from '../components/Details/Trailer';
import Hero from '../components/Details/Hero';
import Poster from '../components/Details/Poster';
import Select from '../components/UI/Select';
import Footer from '../components/UI/Footer';

import useClipboard from '../hooks/useClipboard';
import useMediaInfo from '../hooks/useMediaInfo';

function Details() {
  const { mediaType, id } = useParams();
  const [mediaDetails] = useMediaInfo(mediaType!, id!);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { copyToClipboard } = useClipboard();
  const handleTabClick = useCallback(() => setActiveTabIndex((prev) => 1 - prev), []);

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
      <div>
        <Topbar></Topbar>
        <div className="flex flex-col items-center md:items-start">
          <Hero mediaDetails={mediaDetails} />
          <div className="mx-2 mt-8 flex w-fit flex-col gap-16 overflow-hidden rounded-md bg-slate-800 p-4 text-slate-200 md:mx-10 md:mt-4 md:w-full md:max-w-screen-xl md:flex-row">
            <div className="flex min-w-96 flex-col gap-2">
              <span className="text-2xl font-bold">Details</span>
              <div className="grid grid-cols-3 gap-6">
                <span className="label">Release Date</span>
                <motion.div
                  whileHover={{ color: '#7DD3FC' }}
                  className="col-span-2 cursor-pointer"
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
              <div className="grid grid-cols-3 gap-4">
                <span className="label">Genres</span>
                <motion.div
                  whileHover={{ color: '#7DD3FC' }}
                  className="col-span-2 flex cursor-pointer gap-2"
                  onClick={() =>
                    copyToClipboard({ text: mediaDetails?.genres.join(', '), item: 'Genres' })
                  }
                >
                  {mediaDetails?.genres &&
                    mediaDetails.genres.map((genre: string, index: number) => (
                      <span key={index} className="rounded-md bg-slate-700 p-1 text-sm ">
                        {genre}
                      </span>
                    ))}
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-4 ">
                <span className="label">Runtime{mediaType === 'tv' && <span> (Avg)</span>}</span>
                <motion.div
                  className="col-span-2 flex cursor-pointer gap-2"
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
              <div className="grid grid-cols-3 gap-4 ">
                <span className="label">IMDB ID</span>
                <motion.div
                  className="col-span-2 flex cursor-pointer gap-2"
                  whileHover={{ color: '#7DD3FC' }}
                  onClick={(e: any) =>
                    copyToClipboard({ text: e.target.innerText.trim(), item: 'IMDB ID' })
                  }
                >
                  {mediaDetails?.external_ids.imdb_id}
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-4 ">
                <span className="label">IMDB URL</span>
                <motion.div
                  className="col-span-2 flex cursor-pointer gap-2"
                  whileHover={{ color: '#7DD3FC' }}
                  onClick={(e: any) =>
                    copyToClipboard({ text: e.target.innerText.trim(), item: 'IMDB URL' })
                  }
                >
                  https://imdb.com/title/{mediaDetails?.external_ids.imdb_id}
                </motion.div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-bold">Overview</span>
              <motion.div
                className="flex cursor-pointer gap-2"
                whileHover={{ color: '#7DD3FC' }}
                onClick={(e: any) =>
                  copyToClipboard({ text: e.target.innerText.trim(), item: 'Overview' })
                }
              >
                {mediaDetails?.overview}
              </motion.div>
            </div>
            {mediaType === 'tv' && (
              <div className="min-w-80">
                <span className="col-span-3 text-2xl font-bold">Season Info</span>

                <motion.div className="col-span-2 mt-1 flex cursor-pointer flex-wrap gap-2">
                  {mediaDetails?.seasons.map((season: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col rounded-lg border border-slate-600 bg-slate-700/50 p-1 px-2"
                    >
                      <span className="text-lg font-bold">{season.name}</span>
                      <span>{season.episode_count} episodes</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
          <div className="min-h-screen  bg-slate-900 pb-5 text-slate-100">
            <Tabs className="mx-10 my-5 flex flex-col gap-5 rounded-md   p-2 md:flex-row">
              <div className="sticky top-20 z-20 h-max w-96 bg-slate-900  md:w-full md:min-w-60 md:max-w-60">
                <TabList className=" flex w-full flex-col self-start rounded-md border border-slate-700 bg-slate-800 p-1">
                  <Tab
                    className={` h-max ${activeTabIndex === 0 ? 'bg-sky-500' : ''} cursor-pointer rounded-[calc(theme(borderRadius.md)-4px)] px-2 py-2 outline-none`}
                    onClick={() => {
                      if (activeTabIndex !== 0) {
                        handleTabClick();
                      }
                    }}
                  >
                    <span
                      className={`relative z-10 text-base ${activeTabIndex === 0 ? 'text-white' : 'text-slate-400'}`}
                    >
                      Posters
                    </span>
                  </Tab>
                  <Tab
                    className={`relative cursor-pointer ${activeTabIndex === 1 ? 'bg-sky-500' : ''} rounded-[calc(theme(borderRadius.md)-4px)] px-2 py-2 outline-none`}
                    onClick={() => {
                      if (activeTabIndex !== 1) {
                        handleTabClick();
                      }
                    }}
                  >
                    <span
                      className={`relative z-10 text-base ${activeTabIndex === 1 ? 'text-white' : 'text-slate-400'}`}
                    >
                      Trailers
                    </span>
                  </Tab>
                </TabList>

                {activeTabIndex === 0 && (
                  <div className="mt-5 rounded-md border border-slate-600 bg-slate-800 p-2">
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
                          className={`rounded-md bg-slate-700/50`}
                        ></Select>
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <TabPanel className="flex flex-wrap place-items-start gap-10">
                {mediaDetails?.posters &&
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
              </TabPanel>
              <TabPanel className="flex flex-wrap place-content-center gap-x-2 gap-y-6">
                {mediaDetails?.videos &&
                  mediaDetails?.videos.map((trailer: any, index: number) => (
                    <Trailer data={trailer} key={index} />
                  ))}
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <Footer></Footer>
      </div>
      <ToastContainer />
    </>
  );
}

export default Details;
