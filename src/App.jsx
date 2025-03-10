// App.jsx
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MovieDetail from "./pages/MovieDetail";
import Main from "./pages/Main";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Main />} />
        <Route path="/details/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
