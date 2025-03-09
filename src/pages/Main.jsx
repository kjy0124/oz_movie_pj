import MovieCard from "../components/MovieCard";

function Main({ movieList }) {
  console.log(movieList);

  if (movieList.length === 0) {
    return <p>영화 목록 없음</p>;
  }
  return (
    <>
      <h2 className="text-">영화 목록</h2>
      <div className="grid grid-cols-4 gap-4">
        {movieList.map((movie) => (
          <MovieCard
            key={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
    </>
  );
}
export default Main;
