/*
API 요청 관리를 위한 전역 설정을 담당
토큰 갱신과 네트워크 오류 처리를 통해 사용자가 원활하게 이용할 수 있도록 지원
백엔드와의 통신 안정성을 확보하기 위해 다양한 오류를 처리
*/

import axios from "axios"; //라이브러리 불러오기
const BASE_URL = process.env.REACT_APP_BASE_URL; // .env에서 가져온 서버 URL

if (!BASE_URL) { //기본 url 누락 시 처리
  console.error("환경 변수 REACT_APP_BASE_URL이 설정되지 않았습니다.");
  alert("시스템 설정 오류: 기본 URL이 없습니다. 관리자에게 문의하세요.");
  throw new Error("환경 변수 REACT_APP_BASE_URL 누락");
}

const instance = axios.create({ //axios 인스턴스 설정
  baseURL: `${BASE_URL}`,
});

instance.interceptors.request.use((config) => {//모든 요청을 보내기 전에 토큰 추가
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  //로컬 스토리지에 저장된 토큰을 가져와 Authorization 헤더에 추가
  return config;
});

instance.interceptors.response.use(
  //서버에서 데이터가 오면 그 데이터를 중간에 한 번 처리/수정 뒤 사용
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // 네트워크 오류 처리
    if (!navigator.onLine) {
      alert("네트워크 연결이 끊어졌습니다. 인터넷 상태를 확인해주세요.");
      return Promise.reject(new Error("Network Error"));
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await instance.post("/auth/token");
        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return instance(originalRequest);
      } catch (err) {
        console.error("Token refresh failed", err);
        return Promise.reject(err);
      }
    }

    // 기타 상태 코드 처리
    handleHttpError(error.response?.status, error.response?.data);

    return Promise.reject(error);
  }
);
// 상태 코드별 처리 함수
function handleHttpError(status, data) {
  switch (status) {
    case 400:
      console.warn(`요청 오류 (400): ${data?.message || "잘못된 요청입니다."}`);
      break;
    case 403:
      console.warn(`권한 오류 (403): ${data?.message || "권한이 없습니다."}`);
      alert("이 작업을 수행할 권한이 없습니다.");
      break;
    case 404:
      console.warn(
        `리소스 없음 (404): ${
          data?.message || "요청한 리소스를 찾을 수 없습니다."
        }`
      );
      break;
    case 500:
      console.error(
        `서버 오류 (500): ${data?.message || "서버에서 오류가 발생했습니다."}`
      );
      alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      break;
    default:
      console.error(
        `알 수 없는 오류 (${status}): ${
          data?.message || "알 수 없는 오류입니다."
        }`
      );
  }
}

export default instance;
