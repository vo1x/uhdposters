import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../components/Topbar';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import Trailer from '../components/Trailer';
import DetailsPane from '../components/DetailsPane';
import PostersTab from '../components/PostersTab';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <>
      <div>
        <Topbar></Topbar>
        <DetailsPane
          mediaInfo={mediaInfo}
          imdbID={imdbID}
          seasonsInfo={seasonsInfo}
          mediaType={mediaType}
        />
        <div className="min-h-screen bg-slate-900 pb-5 text-slate-100">
          <Tabs className="  mx-5 flex flex-col items-center gap-5 rounded-md pt-5">
            <TabList className="flex w-max items-center rounded-md border border-slate-700 bg-slate-800 p-1">
              <Tab
                className={`relative cursor-pointer rounded-[calc(theme(borderRadius.md)-4px)] px-2 py-1 outline-none`}
                onClick={() => {
                  if (activeTabIndex !== 0) {
                    handleTabClick();
                  }
                }}
              >
                <span
                  className={`relative z-10 text-lg ${activeTabIndex === 0 ? 'text-white' : 'text-slate-400'}`}
                >
                  Posters
                </span>
                {activeTabIndex === 0 && (
                  <motion.div
                    layoutId="indicator"
                    transition={{ type: 'tween' }}
                    className="absolute inset-0 rounded-[calc(theme(borderRadius.md)-4px)] bg-slate-700"
                  ></motion.div>
                )}
              </Tab>
              <Tab
                className={`relative cursor-pointer  px-2 py-1 outline-none`}
                onClick={() => {
                  if (activeTabIndex !== 1) {
                    handleTabClick();
                  }
                }}
              >
                <span
                  className={`relative z-10 text-lg ${activeTabIndex === 1 ? 'text-white' : 'text-slate-400'}`}
                >
                  Trailers
                </span>
                {activeTabIndex === 1 && (
                  <motion.div
                    transition={{ type: 'tween' }}
                    layoutId="indicator"
                    className="absolute inset-0 rounded-[calc(theme(borderRadius.md)-4px)] bg-slate-700"
                  ></motion.div>
                )}
              </Tab>
            </TabList>

            <TabPanel>
              <PostersTab
                posters={posters}
                fileName={
                  mediaInfo && (mediaInfo.title || mediaInfo.name)
                    ? 'Download ' +
                      (mediaInfo.title || mediaInfo.name).replace(/[^a-zA-Z0-9\s]/g, '')
                    : ''
                }
                secondLang={secondLang}
              />
            </TabPanel>
            <TabPanel className="flex flex-wrap place-content-center gap-x-2 gap-y-5">
              {trailers && trailers.map((trailer, index) => <Trailer data={trailer} key={index} />)}
            </TabPanel>
          </Tabs>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default DetailsPage;
