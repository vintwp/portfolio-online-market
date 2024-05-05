import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSearch } from 'hooks';
import { NoProducts, ProductCard, Counter, Breadcrumb } from 'ui/components';
import { Typography } from 'ui/base';

import './FavouritesPage.scss';
import { useAppSelector } from 'app/hooks';

type Props = {};

export const FavouritesPage: React.FC<Props> = () => {
  const { favourites } = useAppSelector(state => state.favourites);
  const searchItems = useSearch(favourites, 'name');
  const location = useLocation();
  const itemsQty = searchItems.length;

  return (
    <div className="favourites">
      <Breadcrumb path={location.pathname} />
      <Typography type="title" level="1" className="favourites__title">
        Favourites
      </Typography>
      {itemsQty > 0 ? (
        <div className="favourites__content">
          <Counter qty={itemsQty} className="favourites__counter" />
          <ul className="favourites__list">
            {searchItems.map(product => (
              <li key={product.id} className="favourites__item">
                <ProductCard
                  id={product.id}
                  item={product}
                  name={product.name}
                  productUrl={`../${product.category}/${product.itemId}`}
                  price={product.price}
                  fullPrice={product.fullPrice}
                  image={product.image}
                  screen={product.screen}
                  capacity={product.capacity}
                  ram={product.ram}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <NoProducts />
      )}
    </div>
  );
};
