import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const API_URL = `${import.meta.env.VITE_TMDB_API_URL}/movie`;

function MovieDetail() {
  const { id } = useParams(); // URL에서 id 받아오기
  const [movieDetailData, setMovieDetailData] = useState(null);
  console.log(movieDetailData);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}?language=ko-KR`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            accept: "application/json",
          },
        });
        const data = await response.json();
        setMovieDetailData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetail();
  }, [id]);
  if (!movieDetailData)
    return <p className="text-center mt-20 text-gray-500">로딩 중...</p>;

  // console.log(movieDetailData);
  return (
    <div className="min-h-screen p-6">
      {movieDetailData && (
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
            <h2 className="text-3xl font-semibold mb-4">
              {movieDetailData.title}
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              평점:{" "}
              {(Math.round(movieDetailData.vote_average * 100) / 100).toFixed(
                2
              )}
            </p>
            {/* 장르 순회하여 새로운 배열로 반환 후 join을 통해 구분할 슬러시 표시 */}
            <p className="text-sm text-gray-500 mb-4">
              <div className="flex flex-wrap gap-2 mt-2">
                {movieDetailData.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 text-sm bg-gray-800 border-gray-400 rounded-lg text-gray-100"
                  >
                    {genre.name}
                  </span>
                )) || "정보 없음"}
              </div>
            </p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mt-5 mb-2 pt-5 border-t-2 border-gray-400">
                줄거리
              </h3>
              <p>{movieDetailData.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
