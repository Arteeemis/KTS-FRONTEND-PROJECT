import React, { useMemo } from 'react';
import styles from '../../CatalogPage.module.scss';

export type PaginationProps = {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPosts, postsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.pagination}>
      <svg
        onClick={() => {
          if (currentPage > 1) handlePageChange(currentPage - 1);
        }}
        className={`${styles.paginationArrow} ${styles.paginationArrowPrev}`}
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.0062 5.95005L12.4979 15.4584C11.375 16.5813 11.375 18.4188 12.4979 19.5417L22.0062 29.05"
          stroke="black"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div>
        {pageNumbers.map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={
                page == currentPage ? `${styles.paginationItem} ${styles.paginationItemActive}` : styles.paginationItem
              }
            >
              {page}
            </button>
          );
        })}
      </div>
      <svg
        onClick={() => {
          if (currentPage < pageNumbers.length) handlePageChange(currentPage + 1);
        }}
        className={`${styles.paginationArrow} ${styles.paginationArrowNext}`}
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.0062 5.95005L12.4979 15.4584C11.375 16.5813 11.375 18.4188 12.4979 19.5417L22.0062 29.05"
          stroke="black"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="rotate(180 17.5 17.5)"
        />
      </svg>
    </div>
  );
};

export default Pagination;
