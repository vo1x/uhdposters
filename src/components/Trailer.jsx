import { ToastContainer, toast } from 'react-toastify';
import { FiCopy } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';

function Trailer(props) {
  const handleCopyClick = () => {
    try {
      navigator.clipboard
        .writeText(`https://youtube.com/embed/${props.data.key}`)
        .then(() => toast.success('Trailer link copied', { theme: 'colored', autoClose: 2000 }));
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <div className="relative flex max-w-80 flex-col content-center rounded-md border border-slate-700 bg-slate-800 p-3">
        <iframe src={`https://youtube.com/embed/${props.data.key}`}></iframe>
        <span className="my-2 w-full border border-slate-700 "></span>

        <div className="flex justify-between items-center">
          <div className="">
            <span className='w-max content-center rounded-md border  border-slate-700 bg-slate-900/75  p-1 px-2 text-sm text-slate-400 '>{props.data.official ? 'Official' : 'Unofficial'}</span>
          </div>
          <button
            onClick={handleCopyClick}
            className=" rounded-md text-lg text-slate-400  hover:text-slate-100"
          >
            <FiCopy></FiCopy>
          </button>
          {/* <div className="flex gap-1 border h-max">
            <span className="font-bold">Title:</span>
            <span> {props.data.name}</span>
          </div> */}

          {/* {JSON.stringify(props.data,null,2)} */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Trailer;
