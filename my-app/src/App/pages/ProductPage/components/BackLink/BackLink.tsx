import Text from 'components/Text';
import { Link } from 'react-router';
import { routes } from 'config/routes';
import styles from '../../ProductPage.module.scss';

const BackLink = () => (
  <Link to={routes.main.create()} className={styles['product-page__back-link']}>
    <div className={styles['product-page__back']}>
      <svg
        className={styles['product-page__back-icon']}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
          stroke="black"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Text view="p-20" children="Back" color="primary" />
    </div>
  </Link>
);

export default BackLink;
