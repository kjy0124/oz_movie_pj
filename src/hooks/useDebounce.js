import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  // 디바운스된 값을 저장하는 상태 변수
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // dealy 시간 지난 . 후 value 값을 debounceValue에 반영
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      //마지막 debounce됐던 값 제외 초기 값 clear
      clearTimeout(handler);
    };
  }, [value, delay]); //value와 delay가 변경될 때마다 실행

  // 디바운스된 최종 값 반환
  return debouncedValue;
}

export default useDebounce;
