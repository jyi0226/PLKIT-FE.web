/*
React의 커스텀 훅(React의 내장 훅을 조합하여 재사용 가능한 기능을 만든 함수)
애니매이션 효과, 지연 동작을 구현
*/


import { useEffect, useState } from 'react';

function useIsMounted(delay) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsMounted(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return isMounted;
}

export default useIsMounted;
