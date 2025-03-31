import { Navigate, RouteObject } from 'react-router';
import App from '../App';
import CatalogPage from '../App/pages/CatalogPage';
import ProductPage from '../App/pages/ProductPage';

export const routes = {
  main: {
    mask: '/',
    create: () => '/products',
  },
  product: {
    mask: '/product/:id',
    create: (id: string) => `/product/${id}`,
  },
};

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: routes.main.mask,
        element: <CatalogPage />,
      },
      {
        path: routes.product.mask,
        element: <ProductPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.main.mask} replace />,
  },
];
