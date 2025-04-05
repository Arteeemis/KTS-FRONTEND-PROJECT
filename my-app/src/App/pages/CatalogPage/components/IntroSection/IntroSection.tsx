import React from 'react';
import Text from 'components/Text';

const IntroSection: React.FC = () => (
  <div className="main-page__intro">
    <Text view="title" className="main-page__title">
      Products
    </Text>
    <Text view="p-20" color="secondary" className="main-page__description">
      We display products based on the latest products we have, if you want to see our old products please enter the
      name of the item
    </Text>
  </div>
);

export default IntroSection;
