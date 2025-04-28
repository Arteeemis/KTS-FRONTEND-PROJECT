import * as React from 'react';
import styles from './Icon.module.scss';

export enum IconColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Accent = 'accent',
  Disabled = 'disabled',
  White = 'white',
}

const colorToClassMap: Record<IconColor, string> = {
  [IconColor.Primary]: styles['icon-primary'],
  [IconColor.Secondary]: styles['icon-secondary'],
  [IconColor.Accent]: styles['icon-accent'],
  [IconColor.Disabled]: styles['icon-disabled'],
  [IconColor.White]: styles['icon-white'],
};

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: IconColor;
  width?: number;
  height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className = '',
  color,
  width = 24,
  height = 24,
  stroke,
  ...props
}) => {
  const colorClass = color ? colorToClassMap[color] : 'currentColor';
  const combinedClassName = `${styles.icon} ${className} ${colorClass}`;

  return <svg className={combinedClassName} width={width} height={height} {...props} />;
};

export default Icon;
