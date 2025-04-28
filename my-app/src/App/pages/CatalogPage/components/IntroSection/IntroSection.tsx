import React from 'react';
import Text from 'components/Text';
import styles from '../../CatalogPage.module.scss';

const IntroSection: React.FC = () => (
  <div className={styles.intro}>
    <Text view="title" className={styles.introTitle}>
      Products
    </Text>
    <Text view="p-20" color="secondary" className={styles.introDescription}>
      We display products based on the latest products we have, if you want to see our old products please enter the
      name of the item
    </Text>
  </div>
);

export default IntroSection;
