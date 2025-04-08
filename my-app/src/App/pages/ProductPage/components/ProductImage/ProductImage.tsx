import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { IconColor } from 'components/icons/Icon';
import { Product } from 'entities/product/types';

interface ProductImageProps {
  product: Product;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => (
  <div className="product-details__image">
    <img className="product-details__image-img" src={product.image} />
    <div className="product-details__controls">
      <button className="product-details__control-button">
        <ArrowDownIcon
          className="product-details__control-icon product-details__control-icon--prev"
          width={30}
          height={40}
          color={IconColor.White}
        />
      </button>
      <button className="product-details__control-button">
        <ArrowDownIcon
          className="product-details__control-icon product-details__control-icon--next"
          width={30}
          height={40}
          color={IconColor.White}
        />
      </button>
    </div>
  </div>
);

export default ProductImage;
