// src/context/ProductContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { db } from '../firestore';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  Firestore,
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore';
import { Product } from '../types/Product';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: Error | null;
  fetchProductById: (id: string) => Promise<Product | null>;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsCollection = collection(db, 'Products');
      const querySnapshot = await getDocs(productsCollection as CollectionReference<DocumentData>);

      const productList: Product[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      setProducts(productList);
    } catch (e: any) {
      setError(e);
      console.error('Error fetching products:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id: string): Promise<Product | null> => {
    try {
      const productDocRef = doc(db, 'Products', id);
      console.log(id);
      const docSnap: DocumentSnapshot<DocumentData> = await getDoc(productDocRef);

      if (docSnap.exists()) {
        const productData = docSnap.data();
        return { id: docSnap.id, ...productData } as Product;
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (e: any) {
      setError(e);
      console.error('Error fetching product:', e);
      return null;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value: ProductContextType = {
    products,
    loading,
    error,
    fetchProductById,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

// Custom hook to use the product context
export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
