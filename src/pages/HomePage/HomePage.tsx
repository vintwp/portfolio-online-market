/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Typography } from 'ui/base';
import { ShopByCategory } from 'ui/components';
import { Banner, ProductCardSlider } from 'ui/modules';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as productsActions from 'features/products';

import './HomePage.scss';

type Props = {};

export const HomePage: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { hotPriceProducts, brandNewProducts, loading } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    dispatch(productsActions.getProducts());
  }, []);

  return (
    <div className="home">
      <Typography type="title" level="1" className="home__title">
        Welcome to Nice Gadgets store!
      </Typography>
      <section className="home__section">
        <Banner />
      </section>
      <section className="home__section">
        <ProductCardSlider
          title="Hot prices"
          products={hotPriceProducts}
          isLoadProducts={loading}
        />
      </section>
      <section className="home__section">
        <ShopByCategory />
      </section>
      <section className="home__section">
        <ProductCardSlider
          title="Brand new models"
          products={brandNewProducts}
          isLoadProducts={loading}
        />
      </section>
    </div>
  );
};
