import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Poster from './Poster';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiExternalLink } from 'react-icons/fi';
import Topbar from './Topbar';
import { FaRegCopy } from 'react-icons/fa';
import Tooltip from './Tooltip';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import Trailer from './Trailer';



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

  // const postersUrl = `${tmdbBaseUrl}/${mediaType}/${id}/images?api_key=${apiKey}`;
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';
  const langCodes = {
    aa: 'Afar',
    ab: 'Abkhazian',
    ae: 'Avestan',
    af: 'Afrikaans',
    ak: 'Akan',
    am: 'Amharic',
    an: 'Aragonese',
    ar: 'Arabic',
    'ar-ae': 'Arabic (U.A.E.)',
    'ar-bh': 'Arabic (Bahrain)',
    'ar-dz': 'Arabic (Algeria)',
    'ar-eg': 'Arabic (Egypt)',
    'ar-iq': 'Arabic (Iraq)',
    'ar-jo': 'Arabic (Jordan)',
    'ar-kw': 'Arabic (Kuwait)',
    'ar-lb': 'Arabic (Lebanon)',
    'ar-ly': 'Arabic (Libya)',
    'ar-ma': 'Arabic (Morocco)',
    'ar-om': 'Arabic (Oman)',
    'ar-qa': 'Arabic (Qatar)',
    'ar-sa': 'Arabic (Saudi Arabia)',
    'ar-sy': 'Arabic (Syria)',
    'ar-tn': 'Arabic (Tunisia)',
    'ar-ye': 'Arabic (Yemen)',
    as: 'Assamese',
    av: 'Avaric',
    ay: 'Aymara',
    az: 'Azeri',
    ba: 'Bashkir',
    be: 'Belarusian',
    bg: 'Bulgarian',
    bh: 'Bihari',
    bi: 'Bislama',
    bm: 'Bambara',
    bn: 'Bengali',
    bo: 'Tibetan',
    br: 'Breton',
    bs: 'Bosnian',
    ca: 'Catalan',
    ce: 'Chechen',
    ch: 'Chamorro',
    co: 'Corsican',
    cr: 'Cree',
    cs: 'Czech',
    cu: 'Church Slavonic',
    cv: 'Chuvash',
    cy: 'Welsh',
    da: 'Danish',
    de: 'German',
    'de-at': 'German (Austria)',
    'de-ch': 'German (Switzerland)',
    'de-de': 'German (Germany)',
    'de-li': 'German (Liechtenstein)',
    'de-lu': 'German (Luxembourg)',
    div: 'Divehi',
    dv: 'Divehi',
    dz: 'Bhutani',
    ee: 'Ewe',
    el: 'Greek',
    en: 'English',
    'en-au': 'English (Australia)',
    'en-bz': 'English (Belize)',
    'en-ca': 'English (Canada)',
    'en-cb': 'English (Caribbean)',
    'en-gb': 'English (United Kingdom)',
    'en-ie': 'English (Ireland)',
    'en-jm': 'English (Jamaica)',
    'en-nz': 'English (New Zealand)',
    'en-ph': 'English (Philippines)',
    'en-tt': 'English (Trinidad and Tobago)',
    'en-us': 'English (United States)',
    'en-za': 'English (South Africa)',
    'en-zw': 'English (Zimbabwe)',
    eo: 'Esperanto',
    es: 'Spanish',
    'es-ar': 'Spanish (Argentina)',
    'es-bo': 'Spanish (Bolivia)',
    'es-cl': 'Spanish (Chile)',
    'es-co': 'Spanish (Colombia)',
    'es-cr': 'Spanish (Costa Rica)',
    'es-do': 'Spanish (Dominican Republic)',
    'es-ec': 'Spanish (Ecuador)',
    'es-es': 'Spanish (Spain)',
    'es-gt': 'Spanish (Guatemala)',
    'es-hn': 'Spanish (Honduras)',
    'es-mx': 'Spanish (Mexico)',
    'es-ni': 'Spanish (Nicaragua)',
    'es-pa': 'Spanish (Panama)',
    'es-pe': 'Spanish (Peru)',
    'es-pr': 'Spanish (Puerto Rico)',
    'es-py': 'Spanish (Paraguay)',
    'es-sv': 'Spanish (El Salvador)',
    'es-us': 'Spanish (United States)',
    'es-uy': 'Spanish (Uruguay)',
    'es-ve': 'Spanish (Venezuela)',
    et: 'Estonian',
    eu: 'Basque',
    fa: 'Farsi',
    ff: 'Fulah',
    fi: 'Finnish',
    fj: 'Fiji',
    fo: 'Faroese',
    fr: 'French',
    'fr-be': 'French (Belgium)',
    'fr-ca': 'French (Canada)',
    'fr-ch': 'French (Switzerland)',
    'fr-fr': 'French (France)',
    'fr-lu': 'French (Luxembourg)',
    'fr-mc': 'French (Monaco)',
    fy: 'Frisian',
    ga: 'Irish',
    gd: 'Gaelic',
    gl: 'Galician',
    gn: 'Guarani',
    gu: 'Gujarati',
    gv: 'Manx',
    ha: 'Hausa',
    he: 'Hebrew',
    hi: 'Hindi',
    ho: 'Hiri Motu',
    hr: 'Croatian',
    'hr-ba': 'Croatian (Bosnia and Herzegovina)',
    'hr-hr': 'Croatian (Croatia)',
    ht: 'Haitian',
    hu: 'Hungarian',
    hy: 'Armenian',
    hz: 'Herero',
    ia: 'Interlingua',
    id: 'Indonesian',
    ie: 'Interlingue',
    ig: 'Igbo',
    ii: 'Sichuan Yi',
    ik: 'Inupiak',
    in: 'Indonesian',
    io: 'Ido',
    is: 'Icelandic',
    it: 'Italian',
    'it-ch': 'Italian (Switzerland)',
    'it-it': 'Italian (Italy)',
    iu: 'Inuktitut',
    iw: 'Hebrew',
    ja: 'Japanese',
    ji: 'Yiddish',
    jv: 'Javanese',
    jw: 'Javanese',
    ka: 'Georgian',
    kg: 'Kongo',
    ki: 'Kikuyu',
    kj: 'Kuanyama',
    kk: 'Kazakh',
    kl: 'Greenlandic',
    km: 'Cambodian',
    kn: 'Kannada',
    ko: 'Korean',
    kok: 'Konkani',
    kr: 'Kanuri',
    ks: 'Kashmiri',
    ku: 'Kurdish',
    kv: 'Komi',
    kw: 'Cornish',
    ky: 'Kirghiz',
    kz: 'Kyrgyz',
    la: 'Latin',
    lb: 'Luxembourgish',
    lg: 'Ganda',
    li: 'Limburgan',
    ln: 'Lingala',
    lo: 'Laothian',
    ls: 'Slovenian',
    lt: 'Lithuanian',
    lu: 'Luba-Katanga',
    lv: 'Latvian',
    mg: 'Malagasy',
    mh: 'Marshallese',
    mi: 'Maori',
    mk: 'FYRO Macedonian',
    ml: 'Malayalam',
    mn: 'Mongolian',
    mo: 'Moldavian',
    mr: 'Marathi',
    ms: 'Malay',
    'ms-bn': 'Malay (Brunei Darussalam)',
    'ms-my': 'Malay (Malaysia)',
    mt: 'Maltese',
    my: 'Burmese',
    na: 'Nauru',
    nb: 'Norwegian (Bokmal)',
    nd: 'North Ndebele',
    ne: 'Nepali (India)',
    ng: 'Ndonga',
    nl: 'Dutch',
    'nl-be': 'Dutch (Belgium)',
    'nl-nl': 'Dutch (Netherlands)',
    nn: 'Norwegian (Nynorsk)',
    no: 'Norwegian',
    nr: 'South Ndebele',
    ns: 'Northern Sotho',
    nv: 'Navajo',
    ny: 'Chichewa',
    oc: 'Occitan',
    oj: 'Ojibwa',
    om: '(Afan)/Oromoor/Oriya',
    or: 'Oriya',
    os: 'Ossetian',
    pa: 'Punjabi',
    pi: 'Pali',
    pl: 'Polish',
    ps: 'Pashto/Pushto',
    pt: 'Portuguese',
    'pt-br': 'Portuguese (Brazil)',
    'pt-pt': 'Portuguese (Portugal)',
    qu: 'Quechua',
    'qu-bo': 'Quechua (Bolivia)',
    'qu-ec': 'Quechua (Ecuador)',
    'qu-pe': 'Quechua (Peru)',
    rm: 'Rhaeto-Romanic',
    rn: 'Kirundi',
    ro: 'Romanian',
    ru: 'Russian',
    rw: 'Kinyarwanda',
    sa: 'Sanskrit',
    sb: 'Sorbian',
    sc: 'Sardinian',
    sd: 'Sindhi',
    se: 'Sami',
    'se-fi': 'Sami (Finland)',
    'se-no': 'Sami (Norway)',
    'se-se': 'Sami (Sweden)',
    sg: 'Sangro',
    sh: 'Serbo-Croatian',
    si: 'Singhalese',
    sk: 'Slovak',
    sl: 'Slovenian',
    sm: 'Samoan',
    sn: 'Shona',
    so: 'Somali',
    sq: 'Albanian',
    sr: 'Serbian',
    'sr-ba': 'Serbian (Bosnia and Herzegovina)',
    'sr-sp': 'Serbian (Serbia and Montenegro)',
    ss: 'Siswati',
    st: 'Sesotho',
    su: 'Sundanese',
    sv: 'Swedish',
    'sv-fi': 'Swedish (Finland)',
    'sv-se': 'Swedish (Sweden)',
    sw: 'Swahili',
    sx: 'Sutu',
    syr: 'Syriac',
    ta: 'Tamil',
    te: 'Telugu',
    tg: 'Tajik',
    th: 'Thai',
    ti: 'Tigrinya',
    tk: 'Turkmen',
    tl: 'Tagalog',
    tn: 'Tswana',
    to: 'Tonga',
    tr: 'Turkish',
    ts: 'Tsonga',
    tt: 'Tatar',
    tw: 'Twi',
    ty: 'Tahitian',
    ug: 'Uighur',
    uk: 'Ukrainian',
    ur: 'Urdu',
    us: 'English',
    uz: 'Uzbek',
    ve: 'Venda',
    vi: 'Vietnamese',
    vo: 'Volapuk',
    wa: 'Walloon',
    wo: 'Wolof',
    xh: 'Xhosa',
    yi: 'Yiddish',
    yo: 'Yoruba',
    za: 'Zhuang',
    zh: 'Chinese',
    'zh-cn': 'Chinese (China)',
    'zh-hk': 'Chinese (Hong Kong SAR)',
    'zh-mo': 'Chinese (Macau SAR)',
    'zh-sg': 'Chinese (Singapore)',
    'zh-tw': 'Chinese (Taiwan)',
    zu: 'Zulu'
  };

  const [imdbID, setImdbID] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabClick = useCallback(() => setActiveTabIndex((prev) => 1 - prev));
  const [activeSubTabIndex, setActiveSubTabIndex] = useState(0);

  const handleSubTabClick = useCallback(() => setActiveSubTabIndex((prev) => 1 - prev));

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(`${tmdbBaseUrl}/${mediaType}/${id}?api_key=${apiKey}`);
        const info = await response.json();
        setMediaInfo(info);
        setSeasonsInfo(info.seasons);
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
        // const filteredResults = sortedPosters.filter((poster) => {
        //   return poster.iso_639_1 == 'en' || poster.iso_639_1 == mediaInfo.original_language;
        // });
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
          <div className="flex gap-5 p-10">
            <div>
              <img
                src={imageBaseUrl + mediaInfo.poster_path}
                alt="cover img"
                className="h-auto w-full min-w-52 max-w-52 rounded-md ring-2"
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
          <Tabs className="  mx-5 flex flex-col items-center gap-5 rounded-md pt-5">
            <TabList className="grid grid-flow-col gap-2 rounded-md border-2 border-slate-700 bg-slate-800 p-1 text-xl outline-none">
              <Tab
                className={` cursor-pointer rounded-[calc(theme(borderRadius.md)-4px)] ${activeTabIndex === 0 ? 'bg-slate-700' : ''} p-1 outline-none`}
                onClick={activeTabIndex != 0 && handleTabClick}
              >
                Posters
              </Tab>
              <Tab
                className={`cursor-pointer rounded-[calc(theme(borderRadius.md)-4px)] ${activeTabIndex === 1 ? 'bg-slate-700' : ''} p-1 outline-none`}
                onClick={activeTabIndex != 1 && handleTabClick}
              >
                Trailers
              </Tab>
            </TabList>

            <TabPanel>
              <Tabs className="flex  flex-col items-center gap-5">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-lg font-bold">Poster language</span>

                  <TabList className="grid grid-flow-col gap-2 rounded-md border-2 border-slate-700 bg-slate-800 p-1 text-sm">
                    <Tab
                      onClick={activeSubTabIndex != 0 && handleSubTabClick}
                      className={`cursor-pointer rounded-[calc(theme(borderRadius.md)-4px)] ${activeSubTabIndex === 0 ? 'bg-slate-700' : ''} p-1`}
                    >
                      English
                    </Tab>
                    {mediaInfo.original_language != 'en' ? (
                      <Tab
                        onClick={activeSubTabIndex != 1 && handleSubTabClick}
                        className={`cursor-pointer rounded-[calc(theme(borderRadius.md)-4px)] ${activeSubTabIndex === 1 ? 'bg-slate-700' : ''} p-1`}
                      >
                        {langCodes[mediaInfo.original_language]}
                      </Tab>
                    ) : null}
                  </TabList>
                </div>
                <TabPanel>
                  <div className="flex flex-wrap content-center justify-center gap-10">
                    {posters &&
                      posters
                        .filter((poster) => {
                          return poster.iso_639_1 === 'en';
                        })
                        .map((poster, index) => <Poster key={index} data={poster} />)}
                  </div>
                </TabPanel>
                {mediaInfo.original_language != 'en' ? (
                  <TabPanel>
                    <div className="flex flex-wrap content-center justify-center gap-10">
                      {posters
                        .filter((poster) => {
                          return poster.iso_639_1 === mediaInfo.original_language;
                        })
                        .map((poster, index) => (
                          <Poster key={index} data={poster} />
                        ))}
                    </div>
                  </TabPanel>
                ) : null}
              </Tabs>
            </TabPanel>
            <TabPanel className="flex flex-wrap place-content-center gap-x-2 gap-y-5">
              {trailers && trailers.map((trailer, index) => <Trailer data={trailer} key={index} />)}
            </TabPanel>
          </Tabs>

          {/* <div>
            <iframe src={`https://www.youtube.com/embed/${embedID}`} frameborder="0"></iframe>
            <button
              onClick={() =>
                navigator.clipboard.writeText(`https://www.youtube.com/embed/${embedID}`)
              }
            >
              copy
            </button>
          </div> */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default DetailsPage;
