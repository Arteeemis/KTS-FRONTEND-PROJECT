import React from 'react';

const Pagination: React.FC = () => (
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
    <span className="pagination__item pagination__item--active">1</span>
    <span className="pagination__item">2</span>
    <span className="pagination__item">3</span>
    <span className="pagination__item">...</span>
    <span className="pagination__item">10</span>
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

export default Pagination;
