import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../supabase";
import { localStorageUtils } from "../supabase/utilities/localStorage";

function SignUp() {
  const navigate = useNavigate(); // navigate로 회원 가입 시 login페이지 이동을 위해

  // 회원가입 상태 생성
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // useSupabaseAuth에서 signUp 함수 가져오기
  const { signUp, getUserInfo } = useSupabaseAuth();

  const { setItemToLocalStorage } = localStorageUtils();

  // 입력 값 변경 시 호출되는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value }); // 상태 변경 시 업데이트
  };

  // 폼 제출 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    if (userData.password !== userData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const { error } = await signUp({
        email: userData.email,
        password: userData.password,
        username: userData.username,
      });

      if (error) throw error;

      // 회원가입 성공 시 유저 정보 localStorage에 저장
      const userInfo = await getUserInfo();
      console.log("userInfo : ", userInfo);
      if (userInfo) {
        setItemToLocalStorage("userInfo", userInfo);
        console.log("userInfo 저장 완료");
      } else {
        console.log("저장안됨");
      }
      alert("회원가입 성공!");
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-xl"
          required
        />
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
          className="w-full p-2 mb-4 border rounded-xl"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={userData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 mb-6 border rounded-xl"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
