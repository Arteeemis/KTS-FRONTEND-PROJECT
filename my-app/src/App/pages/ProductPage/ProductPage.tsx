// src/pages/ProductPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import Headerr from 'components/Headerr';
import Card from 'components/Card/Card';
import Button from 'components/Button/Button';
import Text from 'components/Text/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import './ProductPage.scss';
import { useProductContext } from '../../../contexts/ProductContext';
import { Product } from '../../../types/Product';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchProductById } = useProductContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      console.error('ID is undefined!');
      return;
    }

    console.log('ID from URL:', id);

    const getProduct = async () => {
      setLoading(true);
      try {
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct);

        if (!fetchedProduct) {
          console.warn(`Product with ID ${id} not found!`); // Важное предупреждение
        }
      } catch (e: any) {
        setError(e);
        console.error('Error fetching product:', e);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id, fetchProductById]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="page">
      <Headerr />
      <div className="container">
        <Link to="/" className="backLink">
          <ArrowDownIcon style={{ transform: 'rotate(90deg)' }} />
          <Text tag="span" weight="medium">
            Назад
          </Text>
        </Link>

        <div className="productDetails">
          <div className="productImage">
            <img src={product.image} alt={product.title} />
            <div className="imageControls">
              <button className="imageButton">
                <ArrowDownIcon style={{ transform: 'rotate(90deg)' }} width={30} height={40} color="white" />
              </button>
              <button className="imageButton">
                <ArrowDownIcon style={{ transform: 'rotate(-90deg)' }} width={30} height={40} color="white" />
              </button>
            </div>
          </div>

          <div className="productInfo">
            <Text tag="h1" view="title">
              {product.title}
            </Text>
            <Text tag="p">{product.description}</Text>
            <Text tag="p" view="p-20">
              {product.price}
            </Text>
            <div className="productActions">
              <Button>Buy Now</Button>
              <Button>Add to Cart</Button>
            </div>
          </div>
        </div>

        <div className="relatedItems">
          <Text tag="h2" view="title">
            Related Items
          </Text>
          <div className="cardGrid">
            {/*  Т.к. логика похожих товаров отсутствует стоят мок данные */}
            <Card
              image="https://s3-alpha-sig.figma.com/img/8471/6a9f/a3d3ee62b367357b71eec92436996e70?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OX3F8pQKxtFiwCRzZEOy42tlsHB5H1SaHJqRH3cAPCNJmVle4CrrUz6BDiXp1ZEM8aPrrhiXcH8h7245RBoJ7JjT~SllFrvozLn-MvMb-ZmE7HAn9FAYrdFeHU1~JfWIRKgH4YbLFxbbYuVc9SZNrK2JM43VFGJ1IDnLTD2EttA9V0DAUZyXDzKPN3qiQLJT4jTWejXmxvDlPAaoZOMnzAdyDfQ-oWJ9HyvDSmI5gApB9A8zqwC2tfy964fWbh5PqTMdC19aEXLDxwVPhJq2MPomYfxwRATywz5nssNv63rp3r6vZIIL5QZ6HH-2MzXp8GcU3MbDTKL8fGHbPQJ11g__"
              title="White Aesthetic Chair"
              subtitle="Combination of wood and wool"
              contentSlot={<Text tag="p">$63.47</Text>}
              actionSlot={<Button>Add to Cart</Button>}
            />
            <Card
              image="https://s3-alpha-sig.figma.com/img/8471/6a9f/a3d3ee62b367357b71eec92436996e70?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OX3F8pQKxtFiwCRzZEOy42tlsHB5H1SaHJqRH3cAPCNJmVle4CrrUz6BDiXp1ZEM8aPrrhiXcH8h7245RBoJ7JjT~SllFrvozLn-MvMb-ZmE7HAn9FAYrdFeHU1~JfWIRKgH4YbLFxbbYuVc9SZNrK2JM43VFGJ1IDnLTD2EttA9V0DAUZyXDzKPN3qiQLJT4jTWejXmxvDlPAaoZOMnzAdyDfQ-oWJ9HyvDSmI5gApB9A8zqwC2tfy964fWbh5PqTMdC19aEXLDxwVPhJq2MPomYfxwRATywz5nssNv63rp3r6vZIIL5QZ6HH-2MzXp8GcU3MbDTKL8fGHbPQJ11g__"
              title="Wooden Cupboard 3 Row"
              subtitle="Combination of wood and wool"
              contentSlot={<Text tag="p">$79.88</Text>}
              actionSlot={<Button>Add to Cart</Button>}
            />
            <Card
              image="https://s3-alpha-sig.figma.com/img/8471/6a9f/a3d3ee62b367357b71eec92436996e70?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OX3F8pQKxtFiwCRzZEOy42tlsHB5H1SaHJqRH3cAPCNJmVle4CrrUz6BDiXp1ZEM8aPrrhiXcH8h7245RBoJ7JjT~SllFrvozLn-MvMb-ZmE7HAn9FAYrdFeHU1~JfWIRKgH4YbLFxbbYuVc9SZNrK2JM43VFGJ1IDnLTD2EttA9V0DAUZyXDzKPN3qiQLJT4jTWejXmxvDlPAaoZOMnzAdyDfQ-oWJ9HyvDSmI5gApB9A8zqwC2tfy964fWbh5PqTMdC19aEXLDxwVPhJq2MPomYfxwRATywz5nssNv63rp3r6vZIIL5QZ6HH-2MzXp8GcU3MbDTKL8fGHbPQJ11g__"
              title="Minimalist Lounge Chair"
              subtitle="Combination of wood and wool"
              contentSlot={<Text tag="p">$14.74</Text>}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
