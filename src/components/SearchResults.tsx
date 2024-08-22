import Card from './Card';
import CardSkeleton from './CardSkeleton';
export default function SearchResults({
  isFetched,
  filteredData,
  searchResults,
  searchTerm,
  isFetching
}) {
  return (
    <>
      <div className="grid grid-cols-3 place-items-center gap-y-6 md:grid-cols-4 lg:grid-cols-6 lg:place-content-center lg:place-items-start lg:gap-10">
        {isFetching ? (
          Array.from({ length: 12 }, (_, index) => <CardSkeleton key={index} />)
        ) : isFetched && searchResults.length !== 0 ? (
          filteredData.map((result, index) => <Card key={result.id} data={result} />)
        ) : (
          <span className="w-max text-2xl font-bold text-slate-400">
            No results found for "<span className="text-sky-300">{searchTerm}</span>"
          </span>
        )}
      </div>
    </>
  );
}
