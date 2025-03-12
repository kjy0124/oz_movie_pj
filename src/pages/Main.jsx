import MovieCard from "../components/MovieCard";
import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const API_URL = `${import.meta.env.VITE_TMDB_API_URL}/movie/popular`;

function Main() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${API_URL}?language=ko-KR`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        setMovieList(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovie();
  }, []);

  //데이터가 변경되면 다시 계산하고 데이터를 계산할 떄 못 가져오면 빈 배열로 반환
  //데이터가 변경이 된다면 다시 무비리스트가 실행이 되어서 최신상태로 가져옴
  const filterListData = useMemo(
    () => movieList.filter((item) => item.adult === false) || [],
    [movieList]
  );

  //평점 순 나열
  const sortedListData = useMemo(
    () => [...filterListData].sort((a, b) => b.vote_average - a.vote_average),
    [filterListData]
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // console.log(filterListData);
  return (
    <>
      {/* 평점 높은 순 슬라이드 */}
      <h2 className="text-2xl font-bold mt-8 mb-4">인기순 Top10</h2>
      <Swiper
        className="w-full max-w-xl"
        modules={[Navigation, Pagination]}
        spaceBetween={10} //슬라이드 간 간격 추가
        slidesPerView={1} //한 번에 보여줄 슬라이드 개수
        navigation //이전, 다음 버튼 활성화
        pagination={{ clickable: true }} //슬라이드 하단 점 추가
      >
        {sortedListData.slice(0, 10).map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="flex justify-center h-[330px]">
              <div className="w-full max-w-sm h-full">
                <MovieCard
                  id={movie.id}
                  poster_path={movie.poster_path}
                  title={movie.title}
                  vote_average={movie.vote_average}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <h2 className="text-2xl font-bold mt-8 mb-4">영화 목록</h2>

      {isMobile ? (
        <div className="grid grid-cols-2 gap-4 ">
          {/* 성인 인증 불필요한 영화만 나오게 */}
          {filterListData.map((movie) => (
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
        <div className="grid grid-cols-4 gap-4">
          {/* 성인 인증 불필요한 영화만 나오게 */}
          {filterListData.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      )}
    </>
  );
}
export default Main;
