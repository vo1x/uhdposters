import Card from './Card';
import CardSkeleton from './CardSkeleton';
export default function SearchResults({ isLoading, isFetched, filteredData, searchResults }) {
  return (
    <>
      <div className="grid grid-cols-3 place-items-center gap-y-6 md:grid-cols-6 md:place-content-center md:place-items-start md:gap-10">
        {isLoading ? (
          Array.from({ length: 12 }, (_, index) => <CardSkeleton key={index} />)
        ) : isFetched && filteredData.length !== 0 ? (
          filteredData.map((result, index) => (
            <Card key={result.id} data={result} index={index} length={searchResults.length} />
          ))
        ) : (
          <span>No results found </span>
        )}
      </div>
    </>
  );
}
