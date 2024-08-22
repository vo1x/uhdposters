import { FiCopy } from 'react-icons/fi';

import useClipboard from '../hooks/useClipboard';

function Trailer({ data }) {
  const { copyToClipboard } = useClipboard();

  return (
    <>
      <div className="relative flex max-w-80 flex-col content-center rounded-md border border-slate-700 bg-slate-800 p-3">
        <iframe src={`https://youtube.com/embed/${data.key}`}></iframe>
        <span className="my-2 w-full border border-slate-700 "></span>

        <div className="flex items-center justify-between">
          <div>
            <span className="w-max content-center rounded-md border  border-slate-700 bg-slate-900/75  p-1 px-2 text-sm text-slate-400 ">
              {data.official ? 'Official' : 'Unofficial'}
            </span>
          </div>
          <button
            onClick={() =>
              copyToClipboard({
                text: `https://youtube.com/embed/${data.key}`,
                item: 'Trailer link'
              })
            }
            className=" rounded-md text-lg text-slate-400  hover:text-slate-100"
          >
            <FiCopy></FiCopy>
          </button>
        </div>
      </div>
    </>
  );
}

export default Trailer;
