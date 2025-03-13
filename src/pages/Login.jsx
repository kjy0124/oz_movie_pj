import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../supabase";
import { localStorageUtils } from "../supabase/utilities/localStorage";
// import SignUp from "./SignUp";

function Login() {
  const nav = useNavigate();
  const { login } = useSupabaseAuth(); //supabase 로그인 함수 사용
  const { setItemToLocalStorage, getItemFromLocalStorage } =
    localStorageUtils();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  //로그인 상태 확인
  const [isLoggedIn, setIsLoggedIn] = useState("");

  //초기 로딩 시 로그인 상태 체크
  useEffect(() => {
    const userInfo = getItemFromLocalStorage("userInfo");
    if (userInfo) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    try {
      //로그인 호출
      const { error, user } = await login({
        email: userData.email,
        password: userData.password,
      });
      console.log("error:", error); // 여기에 로그 추가
      console.log("user:", user);
      if (error) {
        console.error("Login error:", error); // 에러 콘솔에 출력
        return; // 여기! throw 대신 return 사용
      }

      //로그인 성공 시 유저 정보 localStorage에 저장
      setItemToLocalStorage("userInfo", user);
      window.dispatchEvent(new Event("loginStateChange"));
      alert("로그인 성공!");
      nav("/home");
    } catch (error) {
      console.log(error);
      alert("이메일 또는 비밀번호를 확인해주세요");
    }
  };

  const loginButtonText = isLoggedIn ? "Logout" : "Login";
  const SignUpButton = isLoggedIn ? null : (
    <p>
      <span
        onClick={() => nav("/signup")}
        className="text-blue-500 cursor-pointer hover:underline"
      >
        {" "}
        아이디가 없으신가요?
      </span>
    </p>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {loginButtonText}
        </h2>

        {!isLoggedIn && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-xl"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              className="w-full p-2 mb-6 border rounded-xl"
              required
            />
          </>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-600 transition"
        >
          {loginButtonText}
        </button>
        {SignUpButton}
      </form>
    </div>
  );
}

export default Login;
