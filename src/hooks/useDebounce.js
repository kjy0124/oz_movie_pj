import { useEffect, useState } from "react";

function useDebounce({ value, delay }) {
  // 디바운스된 값을 저장하는 상태 변수
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // dealy 시간 지난 . 후 value 값을 debounceValue에 반영
    const handler = setTimeout(() => {
      setDebounceValue(value); // delay 시간 끝난 후 최종적으로 value 업데이트
    }, delay);
    return () => {
      //마지막 debounce됐던 값 제외 초기 값 clear
      clearTimeout(handler);
    };
  }, [value, delay]); //value와 delay가 변경될 때마다 실행

  // 디바운스된 최종 값 반환
  return debounceValue;
}

export default useDebounce;
