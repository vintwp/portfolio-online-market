/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { getAllProducts } from 'utils/fetchClient';
import {
  getProductsByCategory,
  filterArrayByFieldValue,
  wait,
} from '../../utils';

import { ProductContext } from '../../context/ProductsContext';
import {
  Product,
  ProductCart,
  Colors,
  ProductCategories,
  ProductDetail,
  SpecificationsPhone,
  SpecificationsPhoneSimplified,
} from '../../types';

import { Slider, SliderItem, ProductCardSlider } from '../../ui/modules';
import {
  ButtonFavourite,
  ButtonAdd,
  ButtonBack,
  Specifications,
  Breadcrumb,
} from '../../ui/components';

import { Loader, Typography } from '../../ui/base';

import './ProductDetailsPage.scss';
import { useScrollToTop } from '../../hooks';

type ProductBySeries = Pick<Product, 'itemId' | 'color' | 'capacity'>;

export const ProductDetailsPage: React.FC = () => {
  const [backToTop] = useScrollToTop();
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    favouriteItems,
    addDelProductFavourite,
    cartItems,
    addDelProductCart,
  } = useContext(ProductContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [productDetailed, setProductDetailed] = useState<ProductDetail>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [productsSameCapacity, setProductsSameCapacity] = useState<
    ProductBySeries[]
  >([]);
  const [productsSameColor, setProductsSameColor] = useState<ProductBySeries[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddingToFav, setIsAddingToFav] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [isAddedToFav, setIsAddedToFav] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const getColorHexByName = (colorName: string): string => {
    const indexOfKey = Object.keys(Colors).indexOf(colorName);

    return `${Object.values(Colors)[indexOfKey]}`;
  };

  const handleAddDelFav = () => {
    setIsAddingToFav(true);
    wait(100)
      .then(() => {
        if (product) {
          addDelProductFavourite(product);
          setIsAddedToFav(currentStatus => !currentStatus);
        }
      })
      .finally(() => setIsAddingToFav(false));
  };

  const handleAddDelCart = () => {
    setIsAddingToCart(true);
    wait(100)
      .then(() => {
        if (product) {
          addDelProductCart(product as ProductCart);
          setIsAddedToCart(currentStatus => !currentStatus);
        }
      })
      .finally(() => setIsAddingToCart(false));
  };

  useEffect(() => {
    if (itemId) {
      const itemCategory = location.pathname.split('/')[1] as ProductCategories;

      const data = Promise.all([
        getAllProducts(),
        getProductsByCategory(itemCategory),
      ]);

      setIsLoading(true);
      data
        .then(result => {
          const allProducts = result[0];
          const itemsByCategory = result[1];

          const currentProduct =
            allProducts.find(item => item.itemId === itemId) || null;
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

            setProduct(currentProduct);
            setProductDetailed(currentProductDetailed);
            setRelatedProducts(allProducts);
            setProductsSameColor(productGroupWithSameColor);
            setProductsSameCapacity(productGroupWithSameStorage);
          }

          if (currentProduct) {
            const isItemInFavourite =
              favouriteItems.findIndex(
                item => item.itemId === currentProduct.itemId,
              ) !== -1;

            const isItemInCart =
              cartItems.findIndex(
                item => item.itemId === currentProduct.itemId,
              ) !== -1;

            setIsAddedToCart(isItemInCart);
            setIsAddedToFav(isItemInFavourite);
          }
        })
        .then(() => backToTop())
        .finally(() => setIsLoading(false));
    }
  }, [itemId]);

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
                  isLoading={isAddingToCart}
                />
                <ButtonFavourite
                  isAdded={isAddedToFav}
                  onClick={handleAddDelFav}
                  isLoading={isAddingToFav}
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
            {relatedProducts.length > 0 && (
              <ProductCardSlider
                title="You may also like"
                products={relatedProducts}
              />
            )}
          </section>
        </div>
      )}
    </>
  );
};
