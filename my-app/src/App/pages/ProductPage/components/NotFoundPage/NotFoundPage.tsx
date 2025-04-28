import React, { useEffect } from 'react';
import styles from './NotFoundPage.module.scss';
import Button from 'components/Button';
import { Link } from 'react-router';
import { routes } from 'config/routes';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('page-loaded');
    return () => {
      document.body.classList.remove('page-loaded');
    };
  }, []);

  return (
    <div className={styles['not-found-container']}>
      <div className={`${styles['error-code']} ${styles['animate-drop']}`}>404</div>

      <h1 className={`${styles.title} ${styles['animate-fade-in']}`} style={{ animationDelay: '0.2s' }}>
        Oops! Product not found
      </h1>

      <p className={`${styles.message} ${styles['animate-fade-in']}`} style={{ animationDelay: '0.4s' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link to={routes.main.create()} className={styles['product-page__back-link']}>
        <Button className={`${styles['home-button']} ${styles['animate-fade-in']} `} style={{ animationDelay: '0.6s' }}>
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
