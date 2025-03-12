// App.jsx
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MovieDetail from "./pages/MovieDetail";
import Main from "./pages/Main";
import Layout from "./components/Layout";
import Search from "./pages/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/home" element={<Main />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
