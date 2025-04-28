import * as React from 'react';
import styles from './Text.module.scss';

export type TextProps = {
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className = '', view, tag = 'p', weight, children, color, maxLines }) => {
  const Component = tag;
  const style = maxLines ? { WebkitLineClamp: maxLines } : undefined;

  return (
    <Component
      data-testid="text"
      className={`
        ${styles.text} 
        ${className} 
        ${view ? styles[`text-${view}`] : ''} 
        ${weight ? styles[`text-weight-${weight}`] : ''} 
        ${color ? styles[`text-color-${color}`] : ''}
      `}
      style={style}
    >
      {children}
    </Component>
  );
};

export default Text;
