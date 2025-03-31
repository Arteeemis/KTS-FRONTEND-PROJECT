import { Link } from 'react-router';

const Header = () => (
  <header>
    <Link to="/products">Все товары</Link>
    <Link to="/product">Один товар</Link>
  </header>
);

export default Header;
