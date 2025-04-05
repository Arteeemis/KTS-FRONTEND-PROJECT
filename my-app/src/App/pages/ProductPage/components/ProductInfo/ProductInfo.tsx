import Text from 'components/Text';
import { Product } from 'entities/product/types';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => (
  <>
    <Text view="title">{product.title}</Text>
    <Text tag="p" color="secondary" className="product-details__description">
      {product.description}
    </Text>
  </>
);

export default ProductInfo;
