/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { isItemInArray } from 'utils';
import { Typography } from 'ui/base';
import { ButtonFavourite, ButtonAdd } from 'ui/components';
import * as cartActions from 'features/cart';
import * as favouritesActions from 'features/favourites';
import { Product } from 'types';
import './ProductCard.scss';

type Props = {
  id: number;
  item: Product;
  name: string;
  productUrl: string;
  price: number;
  fullPrice: number;
  image: string;
  [key: string]: unknown;
};

const MemoProductCard: React.FC<Props> = ({
  item,
  id,
  name,
  productUrl,
  price,
  fullPrice = 0,
  image,
  onAddToFav,
  ...rest
}) => {
  const dispatch = useAppDispatch();
  const { cart, loadingId: loadingIdCart } = useAppSelector(
    state => state.cart,
  );
  const { favourites, loadingId: loadingIdFavourite } = useAppSelector(
    state => state.favourites,
  );
  const isAddedToCart = isItemInArray(
    item,
    [...cart].map(itm => itm.item),
    'itemId',
  );
  const isAddedToFav = isItemInArray(item, favourites, 'id');

  const handleAddDelFav = () =>
    dispatch(favouritesActions.addDelProductFav(item));

  const handleAddDelCart = () => dispatch(cartActions.addDelProductCart(item));

  return (
    <div className="card" data-cy="cardsContainer">
      <div className="card__content">
        <div className="card__image">
          <img src={image} alt={name} />
        </div>
        <Typography type="text" className="card__title">
          {name}
        </Typography>
        <div className="card__prices">
          <div className="card__price">{price}</div>
          <div className="card__price card__price--full">{fullPrice}</div>
        </div>
        <table className="card__specs specs">
          <tbody>
            {Object.keys(rest).map(spec => (
              <tr className="card__specs-row" key={spec}>
                <td className="card__specs-cell card__specs-cell--left">
                  {spec}
                </td>
                <td className="card__specs-cell card__specs-cell--right">
                  {rest[spec] as string | number}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="card__controls">
          <ButtonAdd
            isAdded={isAddedToCart}
            onClick={handleAddDelCart}
            isLoading={loadingIdCart === item.itemId}
          />
          <ButtonFavourite
            isAdded={isAddedToFav}
            onClick={handleAddDelFav}
            isLoading={loadingIdFavourite === item.itemId}
          />
        </div>
        <Link
          className="card__link"
          to={productUrl}
          aria-label={name}
          title={name}
          state={{
            category: item.category,
          }}
        />
      </div>
    </div>
  );
};

export const ProductCard = React.memo(MemoProductCard);
