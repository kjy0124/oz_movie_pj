import MovieCard from "../components/MovieCard";
import movieListData from "../assets/data/movieListData.json";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Main() {
  const [movieList, setMovieList] = useState(movieListData.results);
  const sortedMovies = [...movieList].sort(
    (a, b) => b.vote_average - a.vote_average
  );
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
        {sortedMovies.slice(0, 10).map((movie) => (
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
