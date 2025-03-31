import * as React from 'react';
import './Icon.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'disabled' | 'white';
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
  const getColorClass = (color?: 'primary' | 'secondary' | 'accent' | 'disabled' | 'white') => {
    switch (color) {
      case 'primary':
        return 'icon-primary';
      case 'secondary':
        return 'icon-secondary';
      case 'accent':
        return 'icon-accent';
      case 'disabled':
        return 'icon-disabled';
      case 'white':
        return 'icon-white';
      default:
        return 'currentColor';
    }
  };

  const colorClass = getColorClass(color);
  const combinedClassName = ['icon', className, colorClass].filter(Boolean).join(' ');

  return <svg className={combinedClassName} width={width} height={height} {...props} />;
};

export default Icon;
