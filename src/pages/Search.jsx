import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const SEARCH_API_URL = `${import.meta.env.VITE_TMDB_API_URL}/search/movie`;

function Search() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL에서 검색어(query) 추출
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${SEARCH_API_URL}?query=${query}`, {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }
  }, [query]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">'{query}' 검색 결과</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default Search;
