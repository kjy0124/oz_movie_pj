import { useState } from "react";
import movieDetail from "../assets/data/movieDetailData.json";

function MovieDetail() {
  const [movieDetailData, setMovieDetailData] = useState(movieDetail);
  console.log(movieDetailData.title);
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetailData.poster_path}`}
        alt=""
      />
      <h2>{movieDetail.title}</h2>
      <p>
        평점: {(Math.round(movieDetail.vote_average * 100) / 100).toFixed(1)}
      </p>
      {/* 장르 순회하여 새로운 배열로 반환 후 join을 통해 구분할 슬러시 표시 */}
      <p>장르: {movieDetail.genres.map((genre) => genre.name).join("/")}</p>
      <div>
        영화의 줄거리
        <p>{movieDetail.overview}</p>
      </div>
    </>
  );
}

export default MovieDetail;
