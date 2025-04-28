import React from 'react';
import styles from './Button.module.scss';
import Text from '../Text/Text';
import Loader from '../Loader/Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading = false, disabled = false, children, className, ...props }) => {
  return (
    <button
      className={`
        ${styles.button} 
        ${className || ''} 
        ${loading ? styles['button-loading'] : ''} 
        ${disabled ? styles['button-disabled'] : ''}
      `}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader size="s" color="#FFFFFF" />
          <Text tag="div" view="button">
            {children}
          </Text>
        </>
      ) : (
        <Text tag="div" view="button">
          {children}
        </Text>
      )}
    </button>
  );
};

export default Button;
