/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as cartActions from 'features/cart';
import * as favouritesActions from 'features/favourites';
import * as productsActions from 'features/products';

import { Slider, SliderItem, ProductCardSlider } from 'ui/modules';
import {
  ButtonFavourite,
  ButtonAdd,
  ButtonBack,
  Specifications,
  Breadcrumb,
} from 'ui/components';
import { Loader, Typography } from 'ui/base';

import {
  Product,
  Colors,
  ProductCategories,
  ProductDetail,
  SpecificationsPhone,
  SpecificationsPhoneSimplified,
} from 'types';
import {
  getProductsByCategory,
  filterArrayByFieldValue,
  isItemInArray,
} from 'utils';
import { useScrollToTop } from 'hooks';
import './ProductDetailsPage.scss';

type ProductBySeries = Pick<Product, 'itemId' | 'color' | 'capacity'>;

export const ProductDetailsPage: React.FC = () => {
  const [backToTop] = useScrollToTop();
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart, loadingId: loadingIdCart } = useAppSelector(
    state => state.cart,
  );
  const { favourites, loadingId: loadingIdFavourite } = useAppSelector(
    state => state.favourites,
  );
  const { products } = useAppSelector(state => state.products);

  const currentItem = products.find(item => item.itemId === itemId);

  const [productDetailed, setProductDetailed] = useState<ProductDetail>();

  const [productsSameCapacity, setProductsSameCapacity] = useState<
    ProductBySeries[]
  >([]);

  const [productsSameColor, setProductsSameColor] = useState<ProductBySeries[]>(
    [],
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isAddedToCart = currentItem
    ? isItemInArray(
        currentItem,
        [...cart].map(itm => itm.item),
        'itemId',
      )
    : false;

  const isAddedToFav = currentItem
    ? isItemInArray(currentItem, favourites, 'itemId')
    : false;

  const getColorHexByName = (colorName: string): string => {
    const indexOfKey = Object.keys(Colors).indexOf(colorName);

    return `${Object.values(Colors)[indexOfKey]}`;
  };

  const handleAddDelFav = () => {
    if (currentItem) {
      dispatch(favouritesActions.addDelProductFav(currentItem));
    }
  };

  const handleAddDelCart = () => {
    if (currentItem) {
      dispatch(cartActions.addDelProductCart(currentItem));
    }
  };

  useEffect(() => {
    if (itemId) {
      const itemCategory = location.pathname.split('/')[1] as ProductCategories;

      setIsLoading(true);
      getProductsByCategory(itemCategory)
        .then(result => {
          const itemsByCategory = result;

          const currentProductDetailed = itemsByCategory.find(
            itemByCategory => itemByCategory.id === itemId,
          );

          if (!currentProductDetailed) {
            navigate('../../404');
          }

          if (currentProductDetailed) {
            const currentProductSeriesKey = currentProductDetailed.namespaceId;

            const relatedProductsBySeries = filterArrayByFieldValue(
              itemsByCategory,
              'namespaceId',
              currentProductSeriesKey,
            );

            const productGroupWithSameStorage = filterArrayByFieldValue(
              relatedProductsBySeries,
              'capacity',
              currentProductDetailed.capacity,
            ).map(item => {
              return {
                itemId: item.id,
                color: item.color,
                capacity: item.capacity,
              };
            }) as ProductBySeries[];

            const productGroupWithSameColor = filterArrayByFieldValue(
              relatedProductsBySeries,
              'color',
              currentProductDetailed.color,
            ).map(item => {
              return {
                itemId: item.id,
                color: item.color,
                capacity: item.capacity,
              };
            }) as ProductBySeries[];

            setProductDetailed(currentProductDetailed);
            setProductsSameColor(productGroupWithSameColor);
            setProductsSameCapacity(productGroupWithSameStorage);
          }
        })
        .then(() => backToTop())
        .finally(() => setIsLoading(false));
    }
  }, [itemId]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(productsActions.getProducts());
    }
  }, []);

  return (
    <>
      {isLoading && <Loader fullScreen />}

      {productDetailed && (
        <div className="product-detail">
          <Breadcrumb path={location.pathname} />
          <div className="product-detail__back">
            <ButtonBack path="../" />
          </div>
          <Typography type="title" level="1" className="product-detail__title">
            {productDetailed?.name as string}
          </Typography>

          <section
            className="
            product-detail__section
            product-detail__gallery"
          >
            <Slider
              slidesToShow={1}
              stepBy={1}
              duration={300}
              className="product-detail"
              thumbs={productDetailed.images}
              navDots={false}
              navArrows={false}
            >
              {productDetailed.images.map(image => (
                <SliderItem key={image}>
                  <img src={image} alt={productDetailed.name as string} />
                </SliderItem>
              ))}
            </Slider>
          </section>

          <section
            className="
            product-detail__section
            product-detail__description"
          >
            <Typography
              type="title"
              level="2"
              className="product-detail__description-title"
            >
              About
            </Typography>
            {productDetailed.description.map(paragraph => (
              <div key={paragraph.title}>
                <Typography
                  type="title"
                  level="3"
                  className="product-detail__text-title"
                >
                  {paragraph.title}
                </Typography>
                <Typography
                  type="text"
                  weight="500"
                  className="product-detail__text"
                >
                  {paragraph.text}
                </Typography>
              </div>
            ))}
          </section>

          <section
            className="
              product-detail__section
              product-detail__actions"
          >
            <div
              className="
              product-detail__actions-column
              product-detail__actions-column--main"
            >
              <div className="product-detail__select">
                <Typography
                  type="text"
                  size="sm"
                  weight="600"
                  className="product-detail__select-label"
                >
                  Available colors
                </Typography>
                <div className="product-detail__select-list product-colors">
                  {productsSameCapacity.map(item => (
                    <Link
                      key={item.itemId}
                      to={`../${item.itemId}`}
                      style={{
                        backgroundColor: getColorHexByName(
                          item.color.replace(/ /g, ''),
                        ),
                      }}
                      className={clsx(
                        'product-colors__link',
                        item.color === productDetailed.color && 'active',
                      )}
                      title={item.color}
                      aria-label={item.color}
                    />
                  ))}
                </div>
              </div>
              <div className="product-detail__select">
                <Typography
                  type="text"
                  size="sm"
                  weight="600"
                  className="product-detail__select-label"
                >
                  Select capacity
                </Typography>
                <div className="product-detail__select-list product-capacity">
                  {productsSameColor.map(item => (
                    <Link
                      key={item.itemId}
                      to={`../${item.itemId}`}
                      className={clsx(
                        'product-capacity__link',
                        item.capacity === productDetailed.capacity && 'active',
                      )}
                      title={item.capacity}
                      aria-label={item.capacity}
                    >
                      {item.capacity}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="product-detail__prices">
                <p className="product-detail__price-discount">
                  {productDetailed.priceDiscount}
                </p>
                <p className="product-detail__price-regular">
                  {productDetailed.priceRegular}
                </p>
              </div>
              <div className="product-detail__buttons">
                <ButtonAdd
                  isAdded={isAddedToCart}
                  onClick={handleAddDelCart}
                  isLoading={loadingIdCart === itemId}
                />
                <ButtonFavourite
                  isAdded={isAddedToFav}
                  onClick={handleAddDelFav}
                  isLoading={loadingIdFavourite === itemId}
                />
              </div>
              <div
                className="
                  product-detail__specs
                  product-detail__specs--actions"
              >
                <Specifications
                  type="mini"
                  productInfo={productDetailed}
                  keys={SpecificationsPhoneSimplified}
                />
              </div>
            </div>
            <div
              className="
              product-detail__actions-column
              product-detail__actions-column--secondary
              "
            >
              <Typography
                type="text"
                size="sm"
              >{`ID: ${productDetailed?.id}`}</Typography>
            </div>
          </section>

          <section
            className="
            section
            product-detail__section
            product-detail__specs"
          >
            <Typography
              type="title"
              level="2"
              className="product-detail__description-title"
            >
              Tech Specs
            </Typography>
            <Specifications
              productInfo={productDetailed}
              type="full"
              keys={SpecificationsPhone}
            />
          </section>

          <section
            className="
            product-detail__section
            product-detail__offers"
          >
            {products.length > 0 && (
              <ProductCardSlider
                title="You may also like"
                products={products}
              />
            )}
          </section>
        </div>
      )}
    </>
  );
};
