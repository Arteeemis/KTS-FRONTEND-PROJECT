import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from 'store/RootStore/authStore/authStore';
import Card from 'components/Card';
import Button from 'components/Button';
import { Product } from 'entities/product/types';
import { Link } from 'react-router';
import { routes } from 'config/routes';
import styles from '../../CatalogPage.module.scss';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = observer(({ products }) => {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification((prev) => (prev ? { ...prev, visible: false } : null));
    }, 2000);
  };

  const handleAddToCart = async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation(); // Stop event from bubbling to the Link
    e.preventDefault(); // Prevent default link behavior
    if (!authStore.user) {
      showNotification('Please log in to add items to your cart.', 'error');
      return;
    }
    try {
      await authStore.addToCart(productId);
      showNotification('Product added to cart!', 'success');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      showNotification('Failed to add product to cart.', 'error');
    }
  };

  return (
    <div className={styles.productGrid}>
      {notification?.visible && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>{notification.message}</div>
      )}
      {products.map((product) => (
        <Link key={product.id} className={styles.productGridLink} to={routes.product.create(product.id)}>
          <Card
            key={product.id}
            image={product.image}
            title={product.title}
            subtitle={product.description}
            contentSlot={product.price}
            actionSlot={<Button onClick={(e) => handleAddToCart(e, product.id)}>Add to Cart</Button>}
          />
        </Link>
      ))}
    </div>
  );
});

export default ProductGrid;
