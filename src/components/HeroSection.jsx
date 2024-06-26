import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import useClipboard from '../hooks/useClipboard';
import { motion } from 'framer-motion';
import GradientBackdrop from './GradientBackdrop';
function DetailsPane(props) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';
  const imagePrevUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face';
  const { mediaDetails, imdbID, seasonsInfo, mediaType } = props;
  const [handleItemCopy] = useClipboard();

  return (
    <>
      <div className={`relative flex h-[500px] overflow-hidden `}>
        <GradientBackdrop url={imageBaseUrl + mediaDetails?.backdrop_path} />
        <div className=" flex gap-5 place-self-end px-10">
          <div className="relative mb-5 flex h-full max-h-96 min-h-80 min-w-52 max-w-52 flex-col gap-1 text-center">
            {mediaDetails && (
              <>
                <img
                  src={imagePrevUrl + mediaDetails?.poster_path}
                  alt="cover img"
                  className={`h-auto w-full min-w-52 max-w-52 rounded-md shadow-2xl shadow-slate-950 transition-opacity duration-300`}
                />
                <motion.span
                  whileHover={{ color: '#7DD3FC' }}
                  className="cursor-pointer text-slate-300"
                  onClick={(e) => handleItemCopy(e.target.innerText, 'Name & Date String')}
                >
                  {`${mediaDetails?.name || mediaDetails?.title} (${mediaType === 'tv' && mediaDetails?.first_air_date ? mediaDetails?.first_air_date.split('-')[0] : mediaDetails?.release_date ? mediaDetails?.release_date.split('-')[0] : ''})`}
                </motion.span>
              </>
            )}
          </div>

          <div className="flex flex-col justify-center gap-4 ">
            <div className="flex  flex-col justify-center gap-2">
              <div className="flex flex-col text-3xl ">
                <div
                  className="flex items-start  gap-1 font-bold text-slate-100  hover:cursor-pointer"
                  onClick={() => handleItemCopy(mediaDetails?.title || mediaDetails?.name, 'Title')}
                >
                  <motion.span whileHover={{ color: '#7DD3FC' }}>
                    {mediaDetails?.title || mediaDetails?.name}{' '}
                  </motion.span>
                </div>
                {(mediaDetails?.original_title || mediaDetails?.original_name) != undefined &&
                mediaDetails['original_language'] != 'en' ? (
                  <span
                    className="w-max text-xl text-slate-400 hover:cursor-pointer hover:text-sky-300"
                    onClick={() => {
                      handleItemCopy(
                        mediaDetails?.original_title || mediaDetails?.original_name,
                        'Original Name'
                      );
                    }}
                  >
                    {mediaDetails?.original_title || mediaDetails?.original_name}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`https://www.imdb.com/title/${imdbID}`} target="_blank">
                <button className="flex items-start gap-1 rounded-md bg-sky-400 px-2 py-2 font-semibold text-neutral-900">
                  <span>View on IMDB</span>
                  <FiExternalLink className="" />
                </button>
              </Link>
              {/* <button
                disabled
                className="flex cursor-not-allowed items-center gap-1 rounded-md bg-slate-100 px-2 py-2 font-semibold text-neutral-900"
              >
                <Video size={20}></Video>
                <span>Trailer</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsPane;
