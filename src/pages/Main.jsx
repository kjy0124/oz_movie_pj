import MovieCard from "../components/MovieCard";
import movieListData from "../assets/data/movieListData.json";
import { useState } from "react";

function Main() {
  const [movieList, setMovieList] = useState(movieListData.results);
  return (
    <>
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
