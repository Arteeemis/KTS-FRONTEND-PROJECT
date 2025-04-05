import React, { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firestore';
import { Product } from 'entities/product/types';

interface ProductContextType {
  product: Product | null;
  loading: boolean;
  error: Error | null;
  fetchProduct: (id: string) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProduct = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, 'Products', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
      } else {
        setError(new Error('Product not found'));
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to fetch product'));
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      product,
      loading,
      error,
      fetchProduct,
    }),
    [product, loading, error],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
