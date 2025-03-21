//다양한 모양과 기능을 가진 버튼을 쉽게 만들 수 있도록 해주는 컴포넌트

import classNames from 'classnames';
import styles from './Button.module.css';

function Button({ variant, className, as, ...restProps }) { 
  //as 태그 이용해 버튼을 다양한 태그로 변환할 수 있는 유연성 줌
  if (as === 'div') { 
    //모양만 버튼으로 보이고 싶을 때 사용
    return (
      <div
        {...restProps}
        className={classNames(
          styles.button,
          variant && styles[variant],
          className,
        )}
      />
    );
  }

  return (
    <button
      {...restProps}
      className={classNames(
        styles.button,
        variant && styles[variant],
        className,
      )}
    />
  );
}

export default Button;
