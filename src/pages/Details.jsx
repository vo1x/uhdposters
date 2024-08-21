import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Footer from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';

import { motion } from 'framer-motion';

import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';

import Topbar from '../components/Topbar';
import Trailer from '../components/Trailer';
import Hero from '../components/Details/Hero';
import PostersTab from '../components/PostersTab';
import Select from '../components/Select';

import { Settings2, Languages } from 'lucide-react';

import { ToastContainer } from 'react-toastify';

import langCodes from '../components/langCodes.json';

import useClipboard from '../hooks/useClipboard';
import useMediaInfo from '../hooks/useMediaInfo';

function Details() {
  const { mediaType, id } = useParams();
  const [mediaDetails] = useMediaInfo(mediaType, id);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [handleItemCopy] = useClipboard();
  const handleTabClick = useCallback(() => setActiveTabIndex((prev) => 1 - prev), []);

  const [runtime, setRuntime] = useState({
    hours: 0,
    minutes: 0
  });

  const selectOptions =
    mediaDetails?.original_language != 'en'
      ? [
          {
            value: 'en',
            label: 'English'
          },
          {
            value: mediaDetails?.original_language,
            label: `${langCodes[mediaDetails?.original_language]}`
          }
        ]
      : [
          {
            value: 'en',
            label: 'English'
          }
        ];

  const [selectedOption, setSelectedOption] = useState(selectOptions[0]);

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
        <div className="flex flex-col">
          <Hero
            mediaDetails={mediaDetails}
            imdbID={mediaDetails?.external_ids.imdb_id}
            mediaType={mediaType}
          />
          <div className="mx-10 mt-4 flex w-full max-w-screen-xl gap-16 overflow-hidden rounded-md bg-slate-800 p-4 text-slate-200">
            <div className="flex min-w-96 flex-col gap-2">
              <span className="text-2xl font-bold">Details</span>
              <div className="grid grid-cols-3 gap-6">
                <span className="font-semibold text-slate-300">Release Date</span>
                <motion.div
                  whileHover={{ color: '#7DD3FC' }}
                  className="col-span-2 cursor-pointer"
                  onClick={(e) =>
                    handleItemCopy(e.target.innerText.trim().split('-')[0], 'Release Date')
                  }
                >
                  {mediaDetails?.release_date}
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="font-semibold text-slate-300">Genres</span>
                <motion.div
                  whileHover={{ color: '#7DD3FC' }}
                  className="col-span-2 flex cursor-pointer gap-2"
                  onClick={(e) => handleItemCopy(mediaDetails?.genres.join(', '), 'Genres')}
                >
                  {mediaDetails?.genres &&
                    mediaDetails.genres.map((genre, index) => (
                      <span key={index} className="rounded-md bg-slate-700 p-1 text-sm ">
                        {genre}
                      </span>
                    ))}
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-4 ">
                <span className="font-semibold text-slate-300">
                  Runtime{mediaType === 'tv' && <span> (Avg)</span>}
                </span>
                <motion.div
                  className="col-span-2 flex cursor-pointer gap-2"
                  whileHover={{ color: '#7DD3FC' }}
                  onClick={(e) => handleItemCopy(e.target.innerText.trim(), 'Runtime')}
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
                <span className="font-semibold text-slate-300">IMDB ID</span>
                <motion.div
                  className="col-span-2 flex cursor-pointer gap-2"
                  whileHover={{ color: '#7DD3FC' }}
                  onClick={(e) => handleItemCopy(e.target.innerText.trim(), 'IMDB ID')}
                >
                  {mediaDetails?.external_ids.imdb_id}
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-4 ">
                <span className="font-semibold text-slate-300">IMDB URL</span>
                <motion.div
                  className="col-span-2 flex cursor-pointer gap-2"
                  whileHover={{ color: '#7DD3FC' }}
                  onClick={(e) => handleItemCopy(e.target.innerText.trim(), 'IMDB URL')}
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
                onClick={(e) => handleItemCopy(e.target.innerText.trim(), 'Overview')}
              >
                {mediaDetails?.overview}
              </motion.div>
            </div>
            {mediaType === 'tv' && (
              <div className="min-w-80">
                <span className="col-span-3 text-2xl font-bold">Season Info</span>

                <motion.div className="col-span-2 mt-1 flex cursor-pointer flex-wrap gap-2">
                  {mediaDetails?.seasons.map((season, index) => (
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
            <Tabs className="mx-10 my-5 flex gap-5 rounded-md  p-2  ">
              <div className="sticky top-20 z-10 h-max w-full min-w-60 max-w-60 ">
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
                          defaultValue={selectOptions[0]}
                          options={selectOptions}
                          onChange={setSelectedOption}
                          className={`rounded-md bg-slate-700/50`}
                        ></Select>
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <TabPanel>
                <PostersTab
                  posters={mediaDetails?.posters}
                  fileName={
                    mediaDetails && mediaDetails.title
                      ? 'Download ' + mediaDetails.title.replace(/[^a-zA-Z0-9\s]/g, '')
                      : ''
                  }
                  language={selectedOption.value}
                />
              </TabPanel>
              <TabPanel className="flex flex-wrap place-content-center gap-x-2 gap-y-6">
                {mediaDetails?.videos &&
                  mediaDetails?.videos.map((trailer, index) => (
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
