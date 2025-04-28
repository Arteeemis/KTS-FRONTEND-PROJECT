import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider } from 'mobx-react';
import { authStore } from 'store/RootStore/authStore/authStore';
import { routesConfig } from './config/routes';

const router = createBrowserRouter(routesConfig);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <Provider authStore={authStore}>
    <RouterProvider router={router} />
  </Provider>,
);
