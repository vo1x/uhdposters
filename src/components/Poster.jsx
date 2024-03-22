import { useState } from 'react';

function Poster(props) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

  const posterStyles = {
    maxWidth: '250px',
    width: '100%',
    height: 'auto',
    margin: '0'
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
      <div className="flex flex-col gap-3">
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
            <a href={imageBaseUrl + props.data.file_path} target="_blank">
              <button
                className={
                  'w-max rounded-md border border-sky-500 bg-sky-500 px-2 py-1 text-sm font-bold'
                }
              >
                Download
              </button>
            </a>
          </div> 
        }
      </div>
    </>
  );
}

export default Poster;
