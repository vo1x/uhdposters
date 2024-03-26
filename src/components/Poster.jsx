import { useState } from 'react';

function Poster(props) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

  const posterStyles = {
    maxWidth: '250px',
    width: '100%',
    height: 'auto',
    margin: '0'
  };

  const uploadImage = () => {
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
          <div className="grid grid-cols-2 place-self-center">
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
                'w-max rounded-md border border-sky-500 bg-sky-500 px-2 py-1 text-sm font-bold'
              }
            >
              Download
            </button>
          </div>
        }
      </div>
    </>
  );
}

export default Poster;
