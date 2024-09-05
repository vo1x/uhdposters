import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Download, Loader2, ClipboardCheck } from 'lucide-react';

import Select from '../UI/Select';
import useImageDownloader from '../../hooks/useImageDownloader';
import useClipboard from '../../hooks/useClipboard';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const QUALITY_OPTIONS = [
  { value: 'original', label: 'HD' },
  { value: 'w400', label: '400 x 600' },
  { value: 'w200', label: '200 x 300' }
];

const posterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5 } }
};

const placeholderVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0, transition: { duration: 1.5 } }
};

const posterActionsVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};
const DARK_PASTEL_COLORS = [
  '#C48F65',
  '#A67B5B',
  '#8E6C4E',
  '#A39364',
  '#8A7E55',
  '#716A47',
  '#4A5D6B',
  '#3D4F5D',
  '#2F3F4A',
  '#8C4646',
  '#723A3A',
  '#5C2E2E',
  '#5D4E6D',
  '#46594C',
  '#615C4B',
  '#614C4C',
  '#4D5D4E',
  '#5B4D5D'
];

const Poster = memo(function Poster({
  posterData,
  fileName
}: {
  posterData: any;
  fileName: string;
}) {
  const [imageQuality, setImageQuality] = useState(QUALITY_OPTIONS[0]);
  const [imgLoaded, setImageLoaded] = useState(false);
  const { downloadImage, isDownloading } = useImageDownloader();
  const { copyToClipboard, isCopied } = useClipboard();
  console.log(posterData)
  const randomColor = useMemo(() => {
    return DARK_PASTEL_COLORS[Math.floor(Math.random() * DARK_PASTEL_COLORS.length)];
  }, []);

  const handleImageDownload = async () => {
    const downloadUrl = `/tmdb/t/p/${imageQuality.value}${posterData.file_path}`;
    const imgFileName = imageQuality.value === 'w200' ? `${fileName} MoviesMod` : fileName;
    await downloadImage(downloadUrl, imgFileName);
  };

  const handleCopyAction = () => {
    copyToClipboard({
      text: `${IMAGE_BASE_URL}${imageQuality.value}${posterData.file_path}`,
      toastEnabled: false
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence initial={false}>
        <div className="relative aspect-[2/3] w-60 z-10">
          <motion.div
            key="placeholder"
            variants={placeholderVariants}
            initial="visible"
            animate={imgLoaded ? 'hidden' : 'visible'}
            className="absolute inset-0 rounded-md "
            style={{ backgroundColor: randomColor }}
          />
          <motion.img
            key={'poster'}
            variants={posterVariants}
            initial="hidden"
            animate={imgLoaded ? 'visible' : 'hidden'}
            className="absolute inset-0 h-full w-full rounded-md object-cover"
            src={`${IMAGE_BASE_URL}w400${posterData.file_path}`}
            alt={fileName || 'Media poster'}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <motion.div
          key={'controls'}
          variants={posterActionsVariants}
          initial="hidden"
          animate={imgLoaded ? 'visible' : 'hidden'}
          className="flex w-full flex-col items-center gap-2 rounded-md "
        >
          <div className="flex w-full items-center justify-center gap-2 text-slate-100">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopyAction}
              initial={{ background: '#0ea5e9' }}
              animate={{ background: isCopied ? '#22c55e' : '#0ea5e9' }}
              className="rounded-md p-2 outline-none"
            >
              {isCopied ? <ClipboardCheck size={20} /> : <Link size={20} />}
            </motion.button>
            <div className="flex">
              <Select
                defaultValue={QUALITY_OPTIONS[0]}
                onChange={setImageQuality}
                options={QUALITY_OPTIONS}
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export default Poster;
