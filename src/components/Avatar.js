/*
프로필 이미지를 표시하는 컴포넌트
이미지가 없으면 기본 이미지를 이용하여 다양한 크기와 스타일 지원
*/
import styles from "./Avatar.module.css";
import defaultAvatarImage from "../assets/default-avatar.svg";

function Avatar({ className, size = "medium", src, alt, ...props }) {
  const avatarSrc = src || defaultAvatarImage; // 서버 URL을 그대로 사용
  return (
    <img
      className={`${styles.Avatar} ${styles[size]} ${className}`}
      src={avatarSrc}
      alt={alt}
      {...props}
    />
  );
}

export default Avatar;
