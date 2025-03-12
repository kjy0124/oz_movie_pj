import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

function NavBar() {
  // 사용자가 입력한 검색어 상태
  //searchTerm은 input에 입력한 text값의 상태 변경을 가리킴
  const [searchTerm, setSearchTerm] = useState("");
  console.log("searchTerm:", searchTerm);

  //searchTerm이 마지막으로 변경된 뒤 500ms 지나야 업데이트
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 페이지 이동을 위한 navigate 함수
  const nav = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goHome = () => {
    nav("/home");
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 검색 버튼 클릭 시 바로 검색 실행
  const handleSearch = () => {
    if (searchTerm) {
      nav(`/search?query=${searchTerm}`);
    }
  };

  // 디바운스된 검색어가 변경될 때마다 자동으로 검색 실행
  useEffect(() => {
    if (debouncedSearchTerm) {
      nav(`/search?query=${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm, nav]);

  return (
    <div className="w-full h-[40px] px-6 flex mb-3 justify-between">
      <h2 onClick={goHome} className="font-bold cursor-pointer text-2xl">
        Oz_KJY
      </h2>

      {/* 모바일 */}
      {isMobile ? (
        <div className="flex justify-evenly items-center space-x-4">
          <input
            type="text"
            placeholder="영화 검색..."
            value={searchTerm}
            onChange={handleInputChange}
            className="w-3/5 p-2 mb-2 rounded-lg text-black"
          />
          <button
            className="w-1/5 p-2 mb-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
      ) : (
        // {/* 검색창과 버튼 - flex로 중앙 정렬 */}
        // {/* space-x-2 x축으로 간격 8px 추가 */}
        <div className="flex w-1/2 justify-center items-center space-x-2">
          <input
            type="text"
            placeholder="영화 검색..."
            value={searchTerm}
            onChange={handleInputChange}
            className="w-2/3 p-2 rounded-lg text-black"
          />
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
      )}

      {/* flexbox, 요소 간 간격 4, 자동 마진으로 우측 정렬 */}
      <div className="flex space-x-4">
        <button>Login</button>
        <button>SignUp</button>
      </div>
    </div>
  );
}

export default NavBar;
