/*
React 애플리케이션의 진입점으로, 앱을 초기화하고 Main을 렌더링하는 역할
인증 상태 관리(AuthProvider), API 설정(axiosConfig), 
글로벌 스타일(index.css)을 적용하여 전체 앱의 기본 환경 설정
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
