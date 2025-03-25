/*
화면에 잠깐 표시되는 알림 메시지를 전역으로 관리
토스트 추가, 삭제, 자동 삭제 기능 제공
BE와 직접 통신하지 않고, 사용자 피드백을 제공하는 용도로 활용
*/


import React, { createContext, useContext, useState } from 'react';
import checkImage from '../assets/check.svg';
import useIsMounted from '../hooks/useIsMounted';
import styles from './ToasterProvider.module.css';

const ICONS = {
  info: checkImage,
  warn: null,
};

function Toast({ type, message, onClick }) {
  const isMounted = useIsMounted(100); //애니메이션 효과 관리
  const icon = ICONS[type]; //아이콘 관리
  const className = `${styles.Toast} ${styles[type]} ${
    isMounted ? styles.mounted : ''
  }`;

  return (
    <div className={className} onClick={onClick}> 
      {icon && <img className={styles.Icon} src={icon} alt={type} />}
      {message}
    </div>
  );//클릭하면 사라지도록 onclick 속성 추가
}

const ToasterContext = createContext(); //어디서든 토스트 메세지를 사용할 수 있게 함

function ToasterProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function addToast(type, message) {
    const newToast = {
      id: Date.now(),
      type,
      message,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);
    return newToast;

    /*
    타입과 메시지를 받아서 새로운 토스트 객체 만듬
    고유한 id를 생성하기 위해 Date.now() 사용
    상태를 업데이트하여 토스트 목록에 추가
    */
  }

  function removeToast(id) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    //id 받아서 해당 토스트 삭제
  }

  function toaster(type, message) {
    const newToast = addToast(type, message);
    setTimeout(() => removeToast(newToast.id), 2000);
    //토스트를 추가한 후 2초 뒤에 자동으로 사라지게 설정
  }

  return (
    <ToasterContext.Provider value={{ toaster }}>
      {children}
      <div className={styles.ToastContainer}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClick={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToasterContext.Provider>
  );
}

export function useToaster() {//커스텀 훅으로 전역에서 사용
  const { toaster } = useContext(ToasterContext);
  if (!toaster) {
    throw new Error('ToastContext 안에서만 사용할 수 있습니다.');
  }
  return toaster;
}

export default ToasterProvider;
