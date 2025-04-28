import React, { useEffect } from 'react';
import styles from './AboutPage.module.scss';
import Header from 'components/Header';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('page-loaded');
    return () => {
      document.body.classList.remove('page-loaded');
    };
  }, []);

  return (
    <>
      <Header />
      <div className={styles['about-container']}>
        <div className={`${styles.about} ${styles['animate-drop']}`}>Lalasia</div>
        <h1 className={`${styles.title} ${styles['animate-fade-in']}`} style={{ animationDelay: '0.2s' }}>
          Redefining Your Space, One Piece at a Time
        </h1>

        <p className={`${styles.message} ${styles['animate-fade-in']}`} style={{ animationDelay: '0.4s' }}>
          At Lalasia, we believe your home should tell your story. Founded in 2020, we've grown from a small boutique to
          a premier destination for quality furniture and home decor. Our carefully curated collections blend timeless
          design with modern functionality, offering pieces that inspire and transform spaces.
          <br />
          <br />
          We're committed to sustainable practices, working with artisans and manufacturers who share our values of
          ethical production and environmental responsibility. Every item in our collection is chosen for its quality,
          durability, and ability to elevate your everyday life.
          <br />
          <br />
          Whether you're furnishing your first apartment or refreshing your forever home, Lalasia is here to help you
          create spaces that feel uniquely you.
        </p>
      </div>
    </>
  );
};

export default AboutPage;
