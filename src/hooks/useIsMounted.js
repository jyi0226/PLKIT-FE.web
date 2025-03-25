/*
React의 커스텀 훅(React의 내장 훅을 조합하여 재사용 가능한 기능을 만든 함수)
애니메이션 효과나 지연 동작 처리를 할 때 유용하게 사용
ToasterProvider.js에서 토스트 애니메이션 효과를 주는 데 사용
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
