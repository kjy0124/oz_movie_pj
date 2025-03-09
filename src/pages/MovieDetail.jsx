import { useState } from "react";
import movieDetail from "../assets/data/movieDetailData.json";

function MovieDetail() {
  const [movieDetailData, setMovieDetailData] = useState(movieDetail);
  console.log(movieDetailData.title);
  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-row max-w-screen-lg mx-auto space-x-8">
        {/* 왼쪽 포스터 이미지 */}
        <div className="flex-shrink-0 w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetailData.poster_path}`}
            alt=""
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* 오른쪽: 영화 정보 */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-4">{movieDetail.title}</h2>
          <p className="text-sm text-gray-400 mb-4">
            평점:{" "}
            {(Math.round(movieDetail.vote_average * 100) / 100).toFixed(2)}
          </p>
          {/* 장르 순회하여 새로운 배열로 반환 후 join을 통해 구분할 슬러시 표시 */}
          <p className="text-sm text-gray-500 mb-4">
            장르: {movieDetail.genres.map((genre) => genre.name).join("/")}
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">영화의 줄거리</h3>
            <p>{movieDetail.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
