import { useState } from 'react';
import { FiLoader } from 'react-icons/fi';
function Poster(props) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

  const posterStyles = {
    maxWidth: '250px',
    width: '100%',
    height: 'auto',
    margin: '0'
  };

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const uploadOptimizedImage = () => {
    setLoading2(true);
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
        const width = 200;
        const height = 300;
        const finalURL = `https://res.cloudinary.com/dqvyyissy/image/upload/w_${width},h_${height},c_scale/fl_attachment:${props.fileName} MoviesMod/v${Date.now()}/${fileID}`;
        window.location.href = finalURL;
        setLoading2(false);
      })
      .catch((err) => console.log(err));
  };

  const uploadImage = () => {
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
        const finalURL = `https://res.cloudinary.com/dqvyyissy/image/upload/fl_attachment:${props.fileName}/v${Date.now()}/${fileID}`;
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
      <div className="flex flex-col gap-3 rounded-md border border-slate-700 bg-slate-800 p-2">
        <img src={imageBaseUrl + props.data.file_path} alt="" style={posterStyles} />
        {
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center gap-2">
              <button
                onClick={handleCopyAction}
                className={
                  'w-max rounded-md border border-sky-500 px-2 py-1 text-sm ' +
                  (isCopySuccess ? 'bg-sky-500 font-bold text-slate-100' : '')
                }
              >
                {isCopySuccess ? 'Copied' : 'Copy Link'}
              </button>
              <button
                onClick={uploadImage}
                className={
                  'flex w-28 items-center justify-center gap-2 rounded-md border border-sky-500 bg-sky-500 px-2 py-1 text-sm font-bold'
                }
              >
                {loading ? <FiLoader className="animate-spin" /> : null} <span>Download</span>
              </button>
            </div>
            <button
              onClick={uploadOptimizedImage}
              className={
                ' w-42 col-span-2 flex items-center justify-center gap-2 rounded-md border border-sky-500 bg-sky-500 px-2 py-1 text-sm font-bold'
              }
            >
              {loading2 ? <FiLoader className="animate-spin" /> : null}{' '}
              <span>Download Optimized</span>
            </button>
          </div>
        }
      </div>
    </>
  );
}

export default Poster;
