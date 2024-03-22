import { Link } from 'react-router-dom';

function Card(props) {
  const movieCardStyle = {
    width: '250px',
    height: 'auto',
    border: '2px solid #333',
    borderRadius: '5px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out'
  };

  const posterStyle = {
    maxWidth: '250px',
    width: 'max-content',
    height: 'auto',
    objectFit: 'cover'
  };

  const movieDetailStyles = {
    padding: '10px',
    textAlign: 'left',
    fontSize: '1rem',
    fontWeight: 'bold'
  };

  const cardDetailStyles = {
    color: '#999',
    fontSize: '14px'
  };

  // const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

  const getReleaseYear = (date) => (date != undefined ? date.split('-')[0] : 'Unknown');

  const imageSrc =
    props.data['poster_path'] != undefined
      ? imageBaseUrl + props.data['poster_path']
      : 'https://placehold.co/250x375';
  return (
    <>
      <Link to={`/details/${props.data.media_type}/${props.data.id}`}>
        <div className="max-w-64 rounded-md bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <img className="rounded-md object-cover" src={imageSrc} alt="Media Backdrop" />
          <div className="px-3 py-2 font-bold text-slate-100">
            <span className="flex flex-col pb-1 text-xl">
              {props.data['title'] || props.data['name']}
              {(props.data['original_title'] || props.data['original_name']) != undefined &&
              props.data['original_language'] != 'en' ? (
                <span className="text-sm font-medium text-slate-400">
                  AKA {props.data['original_title'] || props.data['original_name']}
                </span>
              ) : null}
            </span>
            <p className="mt-1 flex flex-col text-sm text-slate-400">
              <span>
                Type: <span>{props.data['media_type'].toUpperCase()}</span>{' '}
              </span>
              <span>
                Release:{' '}
                <span>
                  {getReleaseYear(props.data['release_date'] || props.data['first_air_date'])}
                </span>
              </span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
