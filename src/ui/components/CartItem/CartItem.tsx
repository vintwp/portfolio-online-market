import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { Icon, Loader, Typography, Button } from 'ui/base';
import { SelectNumber } from 'ui/components';
import * as cartActions from 'features/cart';
import { Product } from 'types';
import './CartItem.scss';

type Props = {
  item: Product;
  quantity: number;
  loading?: boolean;
};

export const CartItem: React.FC<Props> = ({
  item,
  quantity,
  loading = false,
}) => {
  const dispatch = useAppDispatch();

  const handleAddQuantity = () => {
    dispatch(cartActions.increaseProductQty(item));
  };

  const handleSubQuantity = () => {
    dispatch(cartActions.decreaseProductQty(item));
  };

  const handleOnDeleteItem = () => {
    dispatch(cartActions.addDelProductCart(item));
  };

  return (
    <div className="cart-item">
      {loading && <Loader classModifier="cart-item__loader" />}
      <Button
        type="default"
        borderless
        cypressParam="cartDeleteButton"
        onClickHandler={handleOnDeleteItem}
      >
        <Icon id="cross" width={10} height={10} className="cart-item__close" />
      </Button>
      <Link
        className="cart-item__link"
        aria-label={item.name}
        to={`../${item.category}/${item.itemId}`}
      >
        <div className="cart-item__content">
          <div className="cart-item__image">
            <img src={item.image} alt={item.name} />
          </div>
          <h3 className="cart-item__title">{item.name}</h3>
        </div>
      </Link>
      <SelectNumber
        value={quantity}
        onAdd={handleAddQuantity}
        onSub={handleSubQuantity}
        className="cart-item__select-number"
        cypressParam="productQauntity"
      />
      <Typography type="title" level="2" className="cart-item__price">
        {`$${quantity * item.price}`}
      </Typography>
    </div>
  );
};
