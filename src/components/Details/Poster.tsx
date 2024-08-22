import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Download, Loader2, ClipboardCheck } from 'lucide-react';

import Select from '../UI/Select';

import useImageDownloader from '../../hooks/useImageDownloader';
import useClipboard from '../../hooks/useClipboard';

function Poster({ posterData, fileName }: { posterData: any; fileName: string }) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/';

  const { downloadImage, isDownloading } = useImageDownloader();
  const { copyToClipboard, isCopied } = useClipboard();

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

  const [imageQuality, setImageQuality] = useState<{ value: string; label: string }>(
    qualitySelectOptions[0]
  );

  const handleImageDownload = async () => {
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

    copyToClipboard({
      text: `${imageBaseUrl}${resolution}${posterData.file_path}`,
      toastEnabled: false
    });
  };

  return (
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
                animate={isCopied ? { background: '#22c55e' } : { background: '#0ea5e9' }}
                exit={{ background: '#0ea5e9' }}
                className={`rounded-md p-2 outline-none`}
              >
                {isCopied ? <ClipboardCheck size={20} /> : <Link size={20} />}
              </motion.button>
            </AnimatePresence>
            <div className="flex">
              <Select
                defaultValue={qualitySelectOptions[0]}
                onChange={setImageQuality}
                options={qualitySelectOptions}
                className="w-24 rounded-l-md"
              />
              <button onClick={handleImageDownload} className="rounded-r-md bg-sky-500 px-2">
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
  );
}

export default Poster;
