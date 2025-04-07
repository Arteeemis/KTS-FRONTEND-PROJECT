import { Navigate, RouteObject } from 'react-router';
import App from '../App';
import CatalogPage from '../App/pages/CatalogPage';
import ProductPage from '../App/pages/ProductPage';

export const routes = {
  main: {
    mask: '/products',
    create: () => '/products',
  },
  product: {
    mask: '/product/:id',
    create: (id: string) => `/product/${id}`,
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
        path: '*',
        element: <Navigate to={routes.main.mask} replace />,
      },
    ],
  },
];
