import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Download, Loader2, ClipboardCheck } from 'lucide-react';
import Select from './Select';

import useImageDownloader from '../hooks/useImageDownloader';

function Poster({ posterData, fileName }) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/';

  const [isCopySuccess, setIsCopySuccess] = useState(false);

  const { downloadImage, isDownloading } = useImageDownloader();

  const qualitySelectOptions = [
    {
      value: 'high',
      label: 'HD'
    },
    {
      value: 'medium',
      label: '400 x 600'
    },
    {
      value: 'low',
      label: '200 x 300'
    }
  ];

  const [imageQuality, setImageQuality] = useState(qualitySelectOptions[0]);

  const uploadImage = async (imageQuality) => {
    let downloadUrl = '';
    let imgFileName = fileName;

    if (imageQuality.value === 'high') {
      downloadUrl = `/tmdb/t/p/original${posterData.file_path}`;
    }

    if (imageQuality.value === 'medium') {
      downloadUrl = `/tmdb/t/p/w400${posterData.file_path}`;
    }

    if (imageQuality.value === 'low') {
      downloadUrl = `/tmdb/t/p/w200${posterData.file_path}`;
      imgFileName = fileName + ' MoviesMod';
    }

    await downloadImage(downloadUrl, imgFileName);
  };

  const handleCopyAction = () => {
    let resolution = '';

    if (imageQuality.value === 'high') {
      resolution = 'original';
    }

    if (imageQuality.value === 'medium') {
      resolution = 'w400';
    }

    if (imageQuality.value === 'low') {
      resolution = 'w200';
    }

    navigator.clipboard
      .writeText(`${imageBaseUrl}${resolution}${posterData.file_path}`)
      .then(() => {
        setIsCopySuccess(true);
        setTimeout(() => {
          setIsCopySuccess(false);
        }, 2000);
      })
      .catch((error) => console.error('Error copying text: ', error));
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <img src={`${imageBaseUrl}w200${posterData.file_path}`} alt="" className="h-auto w-full" />
        {
          <div className="flex w-full flex-col items-center gap-2 rounded-md ">
            <div className="flex w-full items-center justify-center gap-2">
              <AnimatePresence initial={false}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopyAction}
                  initial={{ background: '#0ea5e9' }}
                  animate={isCopySuccess ? { background: '#22c55e' } : { background: '#0ea5e9' }}
                  exit={{ background: '#0ea5e9' }}
                  className={`rounded-md p-2 outline-none`}
                >
                  {isCopySuccess ? <ClipboardCheck size={20} /> : <Link size={20} />}
                </motion.button>
              </AnimatePresence>
              <div className="flex">
                <Select
                  defaultValue={qualitySelectOptions[0]}
                  onChange={setImageQuality}
                  options={qualitySelectOptions}
                  className="w-24 rounded-l-md"
                />
                <button
                  onClick={() => uploadImage(imageQuality)}
                  className="rounded-r-md bg-sky-500 px-2"
                >
                  {isDownloading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Download size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default Poster;
