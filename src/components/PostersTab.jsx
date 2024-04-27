import Poster from './Poster';

function PostersTab(props) {
  const { posters, fileName, language } = props;

  return (
    <>
      <div className="flex flex-wrap place-items-start gap-10">
        {posters &&
          posters
            .filter((poster) => {
              return poster.iso_639_1 === language;
            })
            .map((poster, index) => <Poster key={index} data={poster} fileName={fileName} />)}
      </div>
    </>
  );
}

export default PostersTab;
