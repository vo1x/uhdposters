import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Download, Loader2, ClipboardCheck } from 'lucide-react';
import Select from './Select';
function Poster(props) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';
  const imagePrevUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face';

  const [loading, setLoading] = useState(false);
  const qualitySelectOptions = [
    { value: 'high', label: 'HD' },
    { value: 'medium', label: '400 x 600' },
    { value: 'low', label: '200 x 300' }
  ];

  const [imageQuality, setImageQuality] = useState(qualitySelectOptions[0]);

  const uploadImage = (imageQuality) => {
    setLoading(true);
    const data = new FormData();
    data.append('file', imageBaseUrl + props.data.file_path);
    data.append('upload_preset', 'uhdposters');
    data.append('cloud_name', 'dqvyyissy');

    fetch('https://api.cloudinary.com/v1_1/dqvyyissy/image/upload', {
      method: 'POST',
      body: data
    })
      .then((resp) => resp.json())
      .then((data) => {
        const fileID = data.secure_url.split('/').pop();
        let finalURL = '';
        let width, height;
        if (imageQuality.value !== 'high') {
          if (imageQuality.value !== 'low') {
            width = 400;
            height = 600;
            finalURL = `https://res.cloudinary.com/dqvyyissy/image/upload/w_${width},h_${height},c_scale/fl_attachment:${props.fileName}/v${Date.now()}/${fileID}`;
          } else {
            width = 200;
            height = 300;
            finalURL = `https://res.cloudinary.com/dqvyyissy/image/upload/w_${width},h_${height},c_scale/fl_attachment:${props.fileName} MoviesMod/v${Date.now()}/${fileID}`;
          }
        } else {
          finalURL = `https://res.cloudinary.com/dqvyyissy/image/upload/fl_attachment:${props.fileName}/v${Date.now()}/${fileID}`;
        }
        window.location.href = finalURL;
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const [isCopySuccess, setIsCopySuccess] = useState(false);

  const handleCopyAction = () => {
    navigator.clipboard
      .writeText(imageBaseUrl + props.data.file_path)
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
      <div className="relative flex flex-col items-center gap-3 rounded-md">
        <img src={imagePrevUrl + props.data.file_path} alt="" className="h-auto w-full max-w-60" />
        <AnimatePresence>
          {
            <motion.div
              initial={{}}
              animate={{}}
              exit={{}}
              className="flex w-full flex-col items-center gap-2 rounded-md "
            >
              <div className="flex w-full items-center justify-center gap-2">
                <AnimatePresence initial={false}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyAction}
                    initial={{ background: '#0ea5e9' }}
                    animate={isCopySuccess ? { background: '#22c55e' } : { background: '#0ea5e9' }}
                    exit={{ background: '#0ea5e9' }}
                    className={`rounded-md  p-2 outline-none `}
                  >
                    {isCopySuccess ? <ClipboardCheck size={20} /> : <Link size={20} />}
                  </motion.button>
                </AnimatePresence>
                <div className="flex">
                  <Select
                    defaultValue={qualitySelectOptions[0]}
                    onChange={setImageQuality}
                    options={qualitySelectOptions}
                    className="w-24 rounded-l-md "
                  />
                  <button
                    onClick={() => uploadImage(imageQuality)}
                    className="rounded-r-md bg-sky-500 px-2"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Download size={20} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </>
  );
}

export default Poster;
