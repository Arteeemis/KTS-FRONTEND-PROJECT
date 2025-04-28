import React from 'react';
import styles from './Card.module.scss';
import Text from '../Text/Text';

export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => (
  <div className={`${styles.card} ${className || ''}`} onClick={onClick}>
    <img src={image} alt="card-image" className={styles['card-image']} />
    <div className={styles['card-content']}>
      <div className={styles['card-body']}>
        {captionSlot && (
          <Text tag="p" color="secondary" view="p-14">
            {captionSlot}
          </Text>
        )}
        {title && (
          <Text tag="p" data-testid="text" className={styles['card-title']} weight="bold" view="p-20" color="primary">
            {title}
          </Text>
        )}
        {subtitle && (
          <Text tag="p" data-testid="text" className={styles['card-subtitle']} color="secondary" view="p-16">
            {subtitle}
          </Text>
        )}
      </div>
      <div className={styles['card-button']}>
        {contentSlot && (
          <Text tag="p" weight="bold" view="p-18" color="primary">
            {contentSlot}
          </Text>
        )}
        {actionSlot && <div>{actionSlot}</div>}
      </div>
    </div>
  </div>
);

export default Card;
