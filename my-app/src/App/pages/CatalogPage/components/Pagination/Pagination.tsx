import React from 'react';

export type PaginationProps = {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  let pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="pagination">
      <svg
        className="pagination__arrow pagination__arrow--prev"
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
              className={page == currentPage ? 'pagination__item pagination__item--active' : 'pagination__item'}
            >
              {page}
            </button>
          );
        })}
      </div>
      <svg
        className="pagination__arrow pagination__arrow--next"
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.9938 29.05L22.5021 19.5416C23.625 18.4187 23.625 16.5812 22.5021 15.4583L12.9938 5.94995"
          stroke="#151411"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Pagination;
