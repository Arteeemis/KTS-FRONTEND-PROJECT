import Text from 'components/Text';
import Button from 'components/Button';
import Card from 'components/Card';
import { Product } from 'entities/product/types';

interface RelatedItemsProps {
  products: Product[];
}

const RelatedItems: React.FC<RelatedItemsProps> = ({ products }) => (
  <div className="related-products">
    <Text tag="h2" view="title" className="related-products__title">
      Related Items
    </Text>
    <div className="related-products__grid">
      {products.map((product) => (
        <Card
          key={product.id}
          image={product.image}
          title={product.title}
          subtitle={product.subtitle}
          contentSlot={
            <Text tag="p" weight="bold">
              {product.price}
            </Text>
          }
          actionSlot={<Button>Add to Cart</Button>}
        />
      ))}
    </div>
  </div>
);

export default RelatedItems;
