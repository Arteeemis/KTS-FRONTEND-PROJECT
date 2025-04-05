import * as React from 'react';
import classNames from 'classnames';
import './Icon.scss';

// Выносим enum цветов
export enum IconColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Accent = 'accent',
  Disabled = 'disabled',
  White = 'white',
}

// Конфигурация соответствия цветов классам
const colorToClassMap: Record<IconColor, string> = {
  [IconColor.Primary]: 'icon-primary',
  [IconColor.Secondary]: 'icon-secondary',
  [IconColor.Accent]: 'icon-accent',
  [IconColor.Disabled]: 'icon-disabled',
  [IconColor.White]: 'icon-white',
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
  const combinedClassName = classNames('icon', className, colorClass);

  return <svg className={combinedClassName} width={width} height={height} {...props} />;
};

export default Icon;
