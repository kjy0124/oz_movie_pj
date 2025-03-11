import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const nav = useNavigate();

  const goHome = () => {
    nav("/home");
  };

  // 검색어 변경 시 상태 업데이트
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      nav(`/search?query=${searchTerm}`);
    }
  };

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

      {/* 검색창과 버튼 - flex로 중앙 정렬 */}
      {/* space-x-2 x축으로 간격 8px 추가 */}
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
      {/* flexbox, 요소 간 간격 4, 자동 마진으로 우측 정렬 */}
      <div className="flex space-x-4">
        <button>Login</button>
        <button>SignUp</button>
      </div>
    </div>
  );
}

export default NavBar;
