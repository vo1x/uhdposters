import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../components/Topbar';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import Trailer from '../components/Trailer';
import DetailsPane from '../components/HeroSection';
import PostersTab from '../components/PostersTab';
import { motion, AnimatePresence } from 'framer-motion';
import Select from '../components/Select';
import { Settings2, Languages } from 'lucide-react';
import useClipboard from '../hooks/useClipboard';
import langCodes from '../components/langCodes.json';

function DetailsPage() {
  const { mediaType, id } = useParams();
  const [posters, setPosters] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [mediaInfo, setMediaInfo] = useState({});
  const [seasonsInfo, setSeasonsInfo] = useState([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const tmdbBaseUrl = 'https://api.themoviedb.org/3';
  const postersUrl = `${tmdbBaseUrl}/${mediaType}/${id}/images?api_key=${apiKey}&include_image_language=en,`;
  const trailersURL = `${tmdbBaseUrl}/${mediaType}/${id}/videos?api_key=${apiKey}&language=en-US`;

  const [imdbID, setImdbID] = useState(null);
  const [secondLang, setSecondLang] = useState('en');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [handleItemCopy] = useClipboard();
  const handleTabClick = useCallback(() => setActiveTabIndex((prev) => 1 - prev), []);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(`${tmdbBaseUrl}/${mediaType}/${id}?api_key=${apiKey}`);
        const info = await response.json();
        setMediaInfo(info);
        setSeasonsInfo(info.seasons);
        setSecondLang(info.original_language);
        fetchExternalID();
        fetchPosters(info);
        fetchTrailers();
      } catch (error) {
        error.log('Error occurred: ', error);
      }
    };
    const fetchPosters = async (mediaInfo) => {
      try {
        const response = await fetch(postersUrl + (mediaInfo ? mediaInfo.original_language : ''));
        const data = await response.json();
        const sortedPosters = data['posters'].sort((a, b) => {
          return b.width - a.width;
        });
        setPosters(sortedPosters);
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

    const fetchTrailers = async () => {
      var embedID = [];

      try {
        const response = await fetch(trailersURL);
        const data = await response.json();
        const filteredTrailers = data['results'].filter((result) => result.type === 'Trailer');
        console.log(embedID);
        setTrailers(filteredTrailers);
      } catch (error) {
        console.error('Error occured:', error);
      }
    };

    fetchInfo();
  }, [id]);

  const [runtime, setRuntime] = useState({
    hours: 0,
    minutes: 0
  });

  const selectOptions =
    secondLang != 'en'
      ? [
          {
            value: 'en',
            label: 'English'
          },
          {
            value: secondLang,
            label: `${langCodes[secondLang]}`
          }
        ]
      : [
          {
            value: 'en',
            label: 'English'
          }
        ];

  const [selectedOption, setSelectedOption] = useState({
    value: 'en',
    label: 'English'
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
      <div className="">
        <Topbar></Topbar>
        <div className="flex flex-col pt-0">
          <DetailsPane
            mediaInfo={mediaInfo}
            imdbID={imdbID}
            seasonsInfo={seasonsInfo}
            mediaType={mediaType}
          />
          <div className="mx-10 mt-5 flex w-full max-w-screen-xl gap-3 overflow-hidden rounded-md bg-slate-800 p-5 text-slate-200">
            <div className="flex min-w-96 flex-col gap-2">
              <span className="col-span-3 text-2xl font-bold">Details</span>
              <div className="grid grid-cols-3 gap-5">
                <span className="font-semibold text-slate-300">Release Date</span>
                <motion.div
                  whileHover={{ color: '#7DD3FC' }}
                  className="col-span-2 cursor-pointer"
                  onClick={(e) =>
                    handleItemCopy(e.target.innerText.trim().split('-')[0], 'Release Date')
                  }
                >
                  {mediaInfo?.release_date || mediaInfo?.first_air_date}
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-5 ">
                <span className="font-semibold text-slate-300">Genres</span>
                <motion.div
                  whileHover={{ color: '#7DD3FC' }}
                  className="col-span-2 flex cursor-pointer gap-2"
                  onClick={(e) =>
                    handleItemCopy(
                      mediaInfo?.genres.map((genre) => genre.name).join(', '),
                      'Genres'
                    )
                  }
                >
                  {mediaInfo?.genres &&
                    mediaInfo.genres.map((genre, index) => (
                      <span key={index} className="rounded-md bg-slate-700 p-1 text-sm ">
                        {genre.name}
                      </span>
                    ))}
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-5 ">
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
              <div className="grid grid-cols-3 gap-5 ">
                <span className="font-semibold text-slate-300">IMDB ID</span>
                <motion.div
                  className="col-span-2 flex cursor-pointer gap-2"
                  whileHover={{ color: '#7DD3FC' }}
                  onClick={(e) => handleItemCopy(e.target.innerText.trim(), 'IMDB ID')}
                >
                  {imdbID}
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-5 ">
                <span className="font-semibold text-slate-300">IMDB URL</span>
                <motion.div
                  className="col-span-2 flex cursor-pointer gap-2"
                  whileHover={{ color: '#7DD3FC' }}
                  onClick={(e) => handleItemCopy(e.target.innerText.trim(), 'IMDB URL')}
                >
                  https://imdb.com/title/{imdbID}
                </motion.div>
              </div>
            </div>
            <div>
              <span className="col-span-3 text-2xl font-bold">Overview</span>

              <motion.div
                className="col-span-2 flex cursor-pointer gap-2"
                whileHover={{ color: '#7DD3FC' }}
                onClick={(e) => handleItemCopy(e.target.innerText.trim(), 'Overview')}
              >
                {mediaInfo?.overview}
              </motion.div>
            </div>
            {mediaType === 'tv' && (
              <div className="min-w-80">
                <span className="col-span-3 text-2xl font-bold">Season Info</span>

                <motion.div className="col-span-2 mt-1 flex cursor-pointer flex-wrap gap-2">
                  {seasonsInfo.map((season, index) => (
                    <div className="flex flex-col rounded-lg border border-slate-600 bg-slate-700/50 p-1 px-2">
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
                        {/* <span>Language</span> */}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <TabPanel>
                <PostersTab
                  posters={posters}
                  fileName={
                    mediaInfo && (mediaInfo.title || mediaInfo.name)
                      ? 'Download ' +
                        (mediaInfo.title || mediaInfo.name).replace(/[^a-zA-Z0-9\s]/g, '')
                      : ''
                  }
                  language={selectedOption.value}
                />
              </TabPanel>
              <TabPanel className="flex flex-wrap place-content-center gap-x-2 gap-y-5">
                {trailers &&
                  trailers.map((trailer, index) => <Trailer data={trailer} key={index} />)}
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default DetailsPage;
