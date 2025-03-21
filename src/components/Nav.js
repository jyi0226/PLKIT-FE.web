/*
네비게이션 바를 만들고, 로그인 여부에 따라 메뉴 구성을 다르게 보여줌
axios 라이브러리를 사용해 서버와 통신

*/
import { Link, NavLink, useNavigate } from "react-router-dom";//페이지 이동과 링크 처리
import { useEffect, useState } from "react";
import Container from "./Container";
import axios from "../lib/axios";//서버로부터 데이터 가져오기

//import UserMenu from "./UserMenu";
import logoImg from "../assets/logo.svg";
import styles from "./Nav.module.css";
import { useAuth } from "../contexts/AuthProvider"; // 예시로 useAuth 훅을 사용
import LogButton from "./LogButton";
import Avatar from "./Avatar";
import "../axiosConfig"; // axios 설정 파일을 import하여 인터셉터 설정 적용

function getLinkStyle({ isActive }) {
  return {
    textDecoration: isActive ? "underline" : "",
  };
}

export function PublicNav() {
  return (
    <header className={styles.Container}>
      <nav className={`${styles.Nav} ${styles.public}`}>
        <Link to="/">
          <img className={styles.Logo} src={logoImg} alt="logo" />
        </Link>
      </nav>
    </header>
  );
}

function Nav() {
  const { user, logout } = useAuth(); // user와 logout 가져오기
  const navigate = useNavigate(); // useNavigate 훅으로 페이지 이동
  const [avatarUrl, setAvatarUrl] = useState(null); // 아바타 이미지 상태 추가

  /*
  user과 logout을 전역 상태로 관리하여 어디서든 접근 가능하게 함
  navigate()로 페이지를 이동할 수 있음
  */

  // 아바타 이미지를 가져오는 함수
  async function fetchAvatar() {
    try {
      const res = await axios.get("/users/me/avatar", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          //Authorization 헤더를 통해 로그인 토큰 전달
        },
        responseType: "blob", // Blob 형식으로 응답
      });
      const imageUrl = URL.createObjectURL(res.data); // Blob을 URL로 변환
      setAvatarUrl(imageUrl); // 상태에 저장
    } catch (error) {
      console.error("아바타 이미지 가져오기 오류:", error);
    }
  }

  // user 정보가 업데이트될 때 아바타 이미지 불러오기
  useEffect(() => {
    if (user && user.avatar) {
      fetchAvatar();
    }
  }, [user]);

  // 프로필 아바타를 눌렀을 때 홈으로 이동
  const handleAvatarClick = () => {
    navigate("/"); // "/" 경로로 이동 (HomePage)
  };

  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to="/">
          <img src={logoImg} alt="PLKIT Logo" />
        </Link>
        <ul className={styles.menu}>
          <li>
            <NavLink style={getLinkStyle} to="/markets">
              Market
            </NavLink>
          </li>
          <li>
            <NavLink style={getLinkStyle} to="/communities">
              Community
            </NavLink>
          </li>
          <div className={styles.Menu}>
            {user ? (
              <>
                {user.name}
                {/* 아바타를 클릭하면 홈 페이지로 이동 */}
                <Avatar
                  src={avatarUrl}
                  size="small"
                  onClick={handleAvatarClick}
                />
                <div className={styles.Divider} />
                <LogButton as={Link} appearance="secondary" onClick={logout}>
                  로그아웃
                </LogButton>
              </>
            ) : (
              <>
                <LogButton as={Link} appearance="secondary" to="/login">
                  로그인
                </LogButton>
                <LogButton as={Link} to="/register">
                  회원가입
                </LogButton>
              </>
            )}
          </div>
        </ul>
      </Container>
    </div>
  );
}
/*
user가 있을 때: 아바타와 로그아웃 버튼
user가 없을 때: 로그인/ 회원가입 버튼
로고 클릭하면 홈 화면으로 이동 / market과 community로 이동하는 메뉴 링크 제공
*/

export default Nav;
