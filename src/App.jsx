// App.jsx
import { useState } from "react";
import movieListData from "./assets/data/movieListData.json";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MovieDetail from "./pages/MovieDetail";
import Main from "./pages/Main";
import Layout from "./components/Layout";

function App() {
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
