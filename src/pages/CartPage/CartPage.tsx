/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import { Button, Typography } from 'ui/base';
import { NoProducts, Modal, CartItem, ButtonBack } from 'ui/components';
import { useAppSelector } from 'app/hooks';
import './CartPage.scss';

type Props = {};

export const CartPage: React.FC<Props> = () => {
  const { cart, loadingId } = useAppSelector(state => state.cart);
  const [isOpenErrorMessage, setIsOpenErrorMessage] = useState<boolean>(false);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [totalItems, setTotaltems] = useState<number>(0);

  const itemsQty = cart.length;

  useEffect(() => {
    const total = cart.reduce((totalValue, item) => {
      return totalValue + item.qty * item.item.price;
    }, 0);

    const totalItemsQty = cart.reduce((totalValue, item) => {
      return totalValue + item.qty;
    }, 0);

    setTotalSum(total);
    setTotaltems(totalItemsQty);
  }, [cart]);

  return (
    <div className="cart-page">
      <ButtonBack className="cart-page__back" />
      <Typography type="title" level="1" className="cart-page__title">
        Cart
      </Typography>
      {itemsQty > 0 ? (
        <div className="cart-page__content">
          <div className="cart-page__list">
            {cart.map(item => (
              <CartItem
                key={item.item.itemId}
                item={item.item}
                quantity={item.qty}
                loading={loadingId === item.item.itemId}
              />
            ))}
          </div>
          <div className="cart-page__right">
            <div className="cart-page__checkout">
              <div className="cart-page__summary">
                <Typography type="title" level="2" className="cart-page__sum">
                  {`$ ${totalSum}`}
                </Typography>
                <Typography type="text" className="cart-page__qty">
                  {`Total for ${totalItems !== 1 ? `${totalItems} items` : '1 item'}`}
                </Typography>
              </div>
              <Button
                type="primary"
                onClickHandler={() => setIsOpenErrorMessage(true)}
                fullWidth
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <NoProducts label="Your cart is empty" />
      )}
      <Modal
        text="We are sorry, but this feature is not implemented yet"
        isOpen={isOpenErrorMessage}
        onClose={setIsOpenErrorMessage}
      />
    </div>
  );
};
