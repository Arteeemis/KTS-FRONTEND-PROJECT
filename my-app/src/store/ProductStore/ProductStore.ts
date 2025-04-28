import { makeAutoObservable, runInAction } from 'mobx';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firestore';
import { Product } from '../../entities/product/types';
import { CollectionModel, getInitialCollectionModel } from '../models/shared/collection';

export default class ProductStore {
  products: CollectionModel<string, Product> = getInitialCollectionModel();
  currentProduct: Product | null = null;
  loading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProduct(id: string) {
    this.loading = true;
    this.error = null;
    this.currentProduct = null;

    try {
      const docRef = doc(db, 'Products', id);
      const docSnap = await getDoc(docRef);

      runInAction(() => {
        if (docSnap.exists()) {
          this.currentProduct = { id: docSnap.id, ...docSnap.data() } as Product;
        } else {
          this.error = new Error('Product not found');
        }
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e : new Error('Failed to fetch product');
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  get productList(): Product[] {
    return this.products.order.map((id) => this.products.entities[id]);
  }

  destroy() {
    // Cleanup logic if needed
  }
}

export const productStore = new ProductStore();
