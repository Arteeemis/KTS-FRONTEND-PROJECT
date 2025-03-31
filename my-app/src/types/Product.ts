// src/types/Product.ts
export interface Product {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string; // Сделаем description необязательным
  price: string;
}
