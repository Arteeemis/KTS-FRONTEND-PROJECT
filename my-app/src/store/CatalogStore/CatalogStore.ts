import { makeAutoObservable, runInAction } from 'mobx';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firestore';
import { Product } from '../../entities/product/types';

export default class CatalogStore {
  products: Product[] = [];
  loading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchAllProducts();
  }

  async fetchAllProducts() {
    this.loading = true;
    this.error = null;

    try {
      const productsCollection = collection(db, 'Products');
      const querySnapshot = await getDocs(productsCollection);
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      runInAction(() => {
        this.products = productList;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e : new Error('Failed to fetch products');
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async searchProducts(searchValue: string, categoryKeys: string[]) {
    this.loading = true;
    this.error = null;

    try {
      const productsCollection = collection(db, 'Products');
      let firestoreQuery = query(productsCollection);

      if (searchValue) {
        firestoreQuery = query(
          productsCollection,
          where('title', '>=', searchValue),
          where('title', '<=', searchValue + '\uf8ff'),
        );
      }

      if (categoryKeys.length > 0) {
        firestoreQuery = query(firestoreQuery, where('subtitle', 'in', categoryKeys));
      }

      const querySnapshot = await getDocs(firestoreQuery);
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      runInAction(() => {
        this.products = productList;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e : new Error('Failed to fetch products');
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const catalogStore = new CatalogStore();
