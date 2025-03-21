//화면에 표시할 내용을 감싸주는 카드 컴포넌트

import classNames from 'classnames';
import styles from './Card.module.css';

function Card({ className, children }) {
  return <div className={classNames(styles.card, className)}>{children}</div>;
}

export default Card;
