import React from 'react';
import style from './SkeletonLoader.module.scss';

const SkeletonCard: React.FC = () => (
  <div className={style['skeleton-card']}>
    <div className={style['skeleton-card__image']}></div>
    <div className={style['skeleton-card__content']}>
      <div className={style['skeleton-card__title']}></div>
      <div className={style['skeleton-card__subtitle']}></div>
      <div className={style['skeleton-card__description']}></div>
      <div className={style['skeleton-card__description']}></div>
      <div className={style['skeleton-card__description']}></div>
      <div className={style['skeleton-card__button']}></div>
    </div>
  </div>
);

export default SkeletonCard;
