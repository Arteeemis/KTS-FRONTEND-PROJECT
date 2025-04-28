import { Navigate, RouteObject } from 'react-router';
import App from '../App';
import CatalogPage from '../App/pages/CatalogPage';
import ProductPage from '../App/pages/ProductPage';
import AboutPage from '../App/pages/AboutPage';
import CategoriesPage from '../App/pages/CategoriesPage';
import ProfilePage from '../App/pages/ProfilePage';
import RegisterPage from '../App/pages/RegisterPage';
import CartPage from '../App/pages/CartPage';

export const routes = {
  main: {
    mask: '/products',
    create: () => '/products',
  },
  product: {
    mask: '/product/:id',
    create: (id: string) => `/product/${id}`,
  },
  about: {
    mask: '/about',
    create: () => '/about',
  },
  categories: {
    mask: '/categories',
    create: () => '/categories',
  },
  profile: {
    mask: '/profile',
    create: () => '/profile',
  },
  register: {
    mask: '/register',
    create: () => '/register',
  },
  cart: {
    mask: '/cart',
    create: () => '/cart',
  },
};

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={routes.main.mask} replace />,
      },
      {
        path: routes.main.mask,
        element: <CatalogPage />,
      },
      {
        path: routes.product.mask,
        element: <ProductPage />,
      },
      {
        path: routes.about.mask,
        element: <AboutPage />,
      },
      {
        path: routes.categories.mask,
        element: <CategoriesPage />,
      },
      {
        path: routes.profile.mask,
        element: <ProfilePage />,
      },
      {
        path: routes.register.mask,
        element: <RegisterPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '*',
        element: <Navigate to={routes.main.mask} replace />,
      },
    ],
  },
];
