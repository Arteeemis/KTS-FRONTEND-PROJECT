import { makeAutoObservable, runInAction } from 'mobx';
import { collection, query, where, getDocs, Query } from 'firebase/firestore';
import { db } from '../../firestore';
import { Product } from '../../entities/product/types';
import { Option } from 'components/MultiDropdown';

export default class CatalogStore {
  products: Product[] = [];
  loading: boolean = false;
  error: Error | null = null;

  searchValue: string = '';
  selectedOptions: Option[] = [];
  currentPage: number = 1;
  postsPerPage: number = 6;
  showSkeleton: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  get currentPosts(): Product[] {
    const lastIndex = this.currentPage * this.postsPerPage;
    const firstIndex = lastIndex - this.postsPerPage;
    return this.products.slice(firstIndex, lastIndex);
  }

  setSearchValue(value: string) {
    this.searchValue = value;
  }

  setSelectedOptions(options: Option[]) {
    this.selectedOptions = options;
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  setPostsPerPage(count: number) {
    this.postsPerPage = count;
  }

  setShowSkeleton(value: boolean) {
    this.showSkeleton = value;
  }
  async fetchAllProducts(): Promise<void> {
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
    } catch (e: unknown) {
      runInAction(() => {
        this.error = e instanceof Error ? e : new Error('Failed to fetch products');
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async searchProducts(searchValue: string, categoryKeys: string[]): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const productsCollection = collection(db, 'Products');
      let firestoreQuery: Query = query(productsCollection);

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
    } catch (e: unknown) {
      runInAction(() => {
        this.error = e instanceof Error ? e : new Error('Failed to fetch products');
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  destroy(): void {
    // Cleanup logic if needed
  }
}

export const catalogStore = new CatalogStore();
