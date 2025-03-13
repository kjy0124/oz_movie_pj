// App.jsx
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MovieDetail from "./pages/MovieDetail";
import Main from "./pages/Main";
import Layout from "./components/Layout";
import Search from "./pages/Search";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/home" element={<Main />} />
        <Route path="/home/details/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
