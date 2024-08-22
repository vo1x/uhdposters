import Poster from './Poster';

function PostersTab({ posters, fileName, language }) {
  return (
    <>
      <div className="flex flex-wrap place-items-start gap-10">
        {posters &&
          posters
            .filter((poster) => {
              return poster.iso_639_1 === language;
            })
            .map((poster, index) => <Poster key={index} posterData={poster} fileName={fileName} />)}
      </div>
    </>
  );
}

export default PostersTab;
