import Poster from './Poster';

function PostersTab({
  posters,
  fileName,
  language
}: {
  posters: any;
  fileName: string;
  language: string;
}) {
  return (
    <div className="flex flex-wrap place-items-start gap-10">
      {posters &&
        posters
          .filter((poster: any) => {
            return poster.iso_639_1 === language;
          })
          .map((poster: any, index: number) => (
            <Poster key={index} posterData={poster} fileName={fileName} />
          ))}
    </div>
  );
}

export default PostersTab;
