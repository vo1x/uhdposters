import { useState } from 'react';
import { Link } from 'react-router-dom';

function Card(props) {
  // const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';
  const getReleaseYear = (date) => (date != undefined ? date.split('-')[0] : 'Unknown');
  const [isHovered, setIsHovered] = useState(false);
  const imageSrc =
    props.data['poster_path'] != undefined
      ? imageBaseUrl + props.data['poster_path']
      : 'https://placehold.co/250x375';
  return (
    <>
      <Link to={`/details/${props.data.media_type}/${props.data.id}`}>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={` relative flex h-full w-full max-w-48 flex-col gap-2 overflow-hidden  rounded-md text-slate-400 transition-all duration-300`}
        >
          <div className="relative">
            <img
              className="h-72 w-48 rounded-md object-cover"
              src={imageSrc}
              alt="Media Backdrop"
            />
            {isHovered && (
              <div className="absolute bottom-0 flex w-full justify-center gap-1 bg-gradient-to-t from-black/90 pb-4 pt-72 text-xs text-slate-300">
                <span>{props.data['media_type'].toUpperCase()}</span>
                <span>•</span>
                <span>
                  {getReleaseYear(props.data['release_date'] || props.data['first_air_date'])}
                </span>
              </div>
            )}
          </div>
          <div className=" ">
            <span
              className={`flex flex-col pb-1 text-sm font-bold ${isHovered && 'text-pastelLightBlue'}`}
            >
              {props.data['title'] || props.data['name']}
              {(props.data['original_title'] || props.data['original_name']) != undefined &&
              props.data['original_language'] != 'en' ? (
                <span className="text-sm font-medium">
                  AKA {props.data['original_title'] || props.data['original_name']}
                </span>
              ) : null}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
