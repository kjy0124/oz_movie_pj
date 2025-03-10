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
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden w-full h-70"
        key={id}
        onClick={goToDetail}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-full h-60 object-cover"
        />
        <div className="p-1 flex-col h-full text-center">
          {/*line-clamp02 : 글자가 2줄까지 보이게 제한*/}
          <h3 className="text-[14px] font-semibold mb-2 line-clamp-2 text-black">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-auto">
            평점: {(Math.round(vote_average * 100) / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
}

export default MovieCard;
