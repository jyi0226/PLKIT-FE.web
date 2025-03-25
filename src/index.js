/*
React 애플리케이션의 진입점으로, 앱을 초기화하고 메인 컴포넌트를 렌더링
AuthProvider로 전역 상태 관리를 적용하여 로그인 상태를 어디서든 쉽게 접근 가능하도록 설정
axiosConfig로 전역 API 설정을 미리 적용하여 HTTP 요청과 응답 처리가 중앙에서 이루어지도록 함
*/
import ReactDOM from "react-dom";
import React from "react";
import Main from "./Main";
import "./index.css";
import { AuthProvider } from "./contexts/AuthProvider"; // AuthProvider 가져오기
import "./axiosConfig"; // axios 설정 파일을 import하여 인터셉터 설정 적용

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Main />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
