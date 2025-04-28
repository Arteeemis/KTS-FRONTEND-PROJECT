import React from 'react';
import { Option } from 'components/MultiDropdown';
import { CATEGORY_OPTIONS } from './constants';
import styles from './CategoriesPage.module.scss';
import Header from 'components/Header';
import { Link } from 'react-router';
import { routes } from 'config/routes';

interface CategoryOption extends Option {
  imageUrl?: string;
}

const CategoryPage: React.FC = () => {
  const categories: CategoryOption[] = CATEGORY_OPTIONS.map((option) => ({
    ...option,
    imageUrl: getCategoryImageUrl(option.key),
  }));

  return (
    <>
      <Header />
      <div className={styles['category-page']}>
        <h1 className={`${styles['category-page__title']} ${styles['animate-drop']}`}>Our Furniture Categories</h1>
        <p className={`${styles['category-page__subtitle']} ${styles['animate-fade-in']}`}>
          Browse our wide selection of furniture
        </p>

        <div className={`${styles['category-grid']} ${styles['animate-fade-in']}`}>
          {categories.map((category) => (
            <Link
              key={category.key}
              to={`${routes.main.create()}?category=${category.key}`}
              className={styles['category-page__link']}
            >
              <div className={styles['category-card']}>
                {category.imageUrl && (
                  <div className={styles['category-card__image-container']}>
                    <img
                      src={category.imageUrl}
                      alt={category.value}
                      className={styles['category-card__image']}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
                      }}
                    />
                  </div>
                )}
                <h3 className={styles['category-card__title']}>{category.value}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

function getCategoryImageUrl(key: string): string {
  const imageMap: Record<string, string> = {
    '1': 'https://res.litfad.net/site/img/item/2024/01/24/11613615/600x600.jpg',
    '2': 'https://images.thdstatic.com/productImages/517c863d-cd3f-48db-9d0f-e754a7475947/svn/brown-byblight-kitchen-dining-tables-bb-f1889yf-31_600.jpg',
    '3': 'https://media.diy.com/is/image/KingfisherDigital/costway-183cm-tall-storage-cabinet-2-doors-display-organizer-freestanding-pantry-cupboard~7984702358092_01c_MP?$MOB_PREV$&$width=600&$height=600',
    '4': 'https://media.diy.com/is/image/KingfisherDigital/wild-privet-led-xmas-decoration-table-garland-decorative-christmas-garland-180cm~5060633946675_01c_MP?$MOB_PREV$&$width=600&$height=600',
  };
  return imageMap[key] || 'https://via.placeholder.com/300x200?text=No+Image';
}

export default CategoryPage;
