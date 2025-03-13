import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const SEARCH_API_URL = `${import.meta.env.VITE_TMDB_API_URL}/search/movie`;

function Search() {
  // 현재 URL 정보 가져오기
  const location = useLocation();
  // 영화 데이터를 저장할 상태 변수
  const [movies, setMovies] = useState([]);
  // 로딩 상태를 저장할 변수
  const [loading, setLoading] = useState(true);

  // URL에서 검색어(query) 추출
  const query = new URLSearchParams(location.search).get("query");
  console.log("query", query);

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        //데이터 요청 시작 전 로딩 상태 true
        setLoading(true);
        try {
          const response = await fetch(
            `${SEARCH_API_URL}?query=${query}&language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          setMovies(data.results || []); //검색 결과 movies에 저장
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false); // 데이터가 불러와지면 로딩 상태 false
        }
      };

      fetchMovies();
    }
  }, [query]);
  console.log(movies);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">'{query}' 검색 결과</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : movies.length > 0 ? (
        <div
          className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-5"} gap-4`}
        >
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
