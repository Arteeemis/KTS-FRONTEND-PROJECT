import { Outlet } from 'react-router';
import './App.css';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import { ProductProvider } from '../contexts/ProductContext';

function App() {
  return (
    <ProductProvider>
      <div className="app">
        <Outlet />
      </div>
    </ProductProvider>
  );
}

export default App;
