// App.jsx
import { useState } from "react";
import movieListData from "./assets/data/movieListData.json";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MovieDetail from "./pages/MovieDetail";
import Main from "./pages/Main";
import Layout from "./components/Layout";

function App() {
  //json파일을 통해 가져온 데이터를 사용하여 movieList의 상태를 관리
  //초기 값울 movieListData의 영화 목록 데이터로 설정
  const [movieList, setMovieList] = useState(movieListData.results);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Main movieList={movieList} />} />
        <Route path="/details" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
