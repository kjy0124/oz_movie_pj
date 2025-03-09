import { useNavigate } from "react-router-dom";

//id = 영화 번호
function MovieCard({ id, poster_path, title, vote_average }) {
  const nav = useNavigate();

  //navigate를 사용해 포스터 클릭 시 다른 페이지로 이동하게
  const goToDetail = () => nav("/details");
  console.log("MovieCard props:", { poster_path, title, vote_average });
  return (
    <>
      {/* 영화 랜더링할 때 id / 영화 포스터 클릭 시 상세페이지로 이동*/}
      <div key={id} onClick={goToDetail}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <h3>제목: {title}</h3>
        <p>평점: {(Math.round(vote_average * 100) / 100).toFixed(1)}</p>
      </div>
    </>
  );
}

export default MovieCard;
