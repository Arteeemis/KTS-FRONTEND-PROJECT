import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from 'store/RootStore/authStore/authStore';
import { db } from '../../../firestore';
import { doc, getDoc } from 'firebase/firestore';
import Header from 'components/Header';
import Text from 'components/Text';
import Button from 'components/Button';
import styles from './CartPage.module.scss';

const CartPage: React.FC = observer(() => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!authStore.user) return;
      const cartDoc = doc(db, 'carts', authStore.user.uid);
      const cartSnapshot = await getDoc(cartDoc);
      if (cartSnapshot.exists()) {
        const productIds = cartSnapshot.data().items || [];
        const productDetails = await Promise.all(
          productIds.map(async (id: string) => {
            const productDoc = doc(db, 'Products', id);
            const productSnapshot = await getDoc(productDoc);
            return { id, ...productSnapshot.data() };
          }),
        );
        setProducts(productDetails);
      }
    };

    fetchCartProducts();
  }, [authStore.user]);

  const handleRemoveFromCart = async (productId: string) => {
    await authStore.removeFromCart(productId);
    setProducts(products.filter((product) => product.id !== productId));
  };

  if (!authStore.user) {
    return (
      <>
        <Header />
        <div className={styles['cart-page']}>
          <Text view="title">Please log in to view your cart.</Text>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles['cart-page']}>
        <div className="cart-page__content">
          <Text view="title">Your Cart:</Text>
          {products.length === 0 ? (
            <Text view="p-20">Your cart is empty.</Text>
          ) : (
            products.map((product) => (
              <div key={product.id} className={styles['cart-item']}>
                <img src={product.image} alt={product.title} className={styles['cart-item__image']} />
                <Text view="p-20" weight="bold" className={styles['cart-item__title']}>
                  {product.title}
                </Text>
                <Text view="p-20" weight="bold">
                  {product.price}
                </Text>
                <Button onClick={() => handleRemoveFromCart(product.id)}>Remove</Button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
});

export default CartPage;
