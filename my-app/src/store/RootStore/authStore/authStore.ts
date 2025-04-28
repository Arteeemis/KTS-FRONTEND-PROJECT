import { makeAutoObservable } from 'mobx';
import { auth, db } from '../../../firestore';
import { onAuthStateChanged, User, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

class AuthStore {
  user: User | null = null;
  cart: string[] = [];

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  init() {
    onAuthStateChanged(auth, async (user) => {
      this.user = user;
      if (user) {
        await this.loadCart();
      } else {
        this.cart = [];
      }
    });
  }

  setUser(user: User | null) {
    this.user = user;
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    this.user = userCredential.user;
    return userCredential;
  }

  logout() {
    auth.signOut();
    this.user = null;
  }

  async loadCart() {
    if (!this.user) return;
    const cartDoc = doc(db, 'carts', this.user.uid);
    const cartSnapshot = await getDoc(cartDoc);
    if (cartSnapshot.exists()) {
      this.cart = cartSnapshot.data().items || [];
    } else {
      this.cart = [];
    }
  }

  async addToCart(productId: string) {
    if (!this.user) throw new Error('User not logged in');
    const cartDoc = doc(db, 'carts', this.user.uid);
    await updateDoc(cartDoc, { items: arrayUnion(productId) }).catch(async (error) => {
      if (error.code === 'not-found') {
        await setDoc(cartDoc, { items: [productId] });
      }
    });
    this.cart.push(productId);
  }

  async removeFromCart(productId: string) {
    if (!this.user) throw new Error('User not logged in');
    const cartDoc = doc(db, 'carts', this.user.uid);
    await updateDoc(cartDoc, { items: arrayRemove(productId) });
    this.cart = this.cart.filter((id) => id !== productId);
  }
}

export const authStore = new AuthStore();
