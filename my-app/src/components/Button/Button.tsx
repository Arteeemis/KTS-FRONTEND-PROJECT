import React from 'react';
import classNames from 'classnames';
import './Button.scss';
import Text from '../Text/Text';
import Loader from '../Loader/Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading = false, disabled = false, children, className, ...props }) => {
  const buttonClass = classNames('button', className, {
    'button-loading': loading,
    'button-disabled': disabled,
  });

  const buttonText = (
    <Text tag="div" view="button">
      {children}
    </Text>
  );

  return (
    <button className={buttonClass} disabled={loading || disabled} {...props}>
      {loading ? (
        <>
          <Loader size="s" color="#FFFFFF" />
          {buttonText}
        </>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default Button;
