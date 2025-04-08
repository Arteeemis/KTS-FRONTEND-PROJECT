import React, { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firestore';
import { Product } from 'entities/product/types';

interface CatalogContextType {
  products: Product[];
  loading: boolean;
  error: Error | null;
}

export const CatalogContext = createContext<CatalogContextType | null>(null);

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'Products');
        const querySnapshot = await getDocs(productsCollection);

        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(productList);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to fetch products'));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
    }),
    [products, loading, error],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export const useCatalogContext = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalogContext must be used within a CatalogProvider');
  }
  return context;
};
