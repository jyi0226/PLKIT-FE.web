/*
웹앱 전체를 감싸는 틀을 만들고, 
상단 메뉴(Nav) - 메인 화면(Outlet) - 하단 정보(Footer) 구조를 잡아줌
앱 전반에서 로그인 정보와 알림 관리를 할 수 있도록 지원
*/
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import styles from "./App.module.css";
import "./App.font.css";
import { AuthProvider } from "../contexts/AuthProvider"; // 사용자 인증 정보를 애플리케이션 전역에서 사용
import ToasterProvider from "../contexts/ToasterProvider"; //알림(토스트 메시지)을 관리

function Providers({ children }) {
  return (
    <ToasterProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToasterProvider>
  );
}
/*
provider 패턴: 전역 상태나 기능을 앱 전체에 쉽게 제공
상위 컴포넌트에서 상태를 관리하고, 하위 컴포넌트에게 공유
*/
function App() {
  return (
    <Providers> 
      <Nav className={styles.nav} />
      <div className={styles.body}>
        <Outlet />
      </div>
      <Footer className={styles.footer} />
    </Providers>
  ); 
  //JSX 문법: JS 코드 안에서 HTML 태그를 직접 사용
}
/*
함수형 컴포넌트를 사용
간단하고 직관적이여서 코드가 깔끔하고,
클래스형 컴포넌트보나 성능 최적화에 유리
*/
export default App;
