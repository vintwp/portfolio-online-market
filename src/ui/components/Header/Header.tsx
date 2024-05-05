/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { Burger, Icon } from 'ui/base';
import { MenuNav, HeaderLink, Search, Logo } from 'ui/components';

import './Header.scss';

const menuItems = ['home', 'phones', 'tablets', 'accessories'];

type Props = {
  isShowFav: boolean;
  isShowSearch: boolean;
  location?: string;
};

const MemoHeader: React.FC<Props> = ({ isShowFav, isShowSearch, location }) => {
  const [isOpenedMenu, setIsOpenedMenu] = useState<boolean>(false);
  const { cart } = useAppSelector(state => state.cart);
  const { favourites } = useAppSelector(state => state.favourites);

  useEffect(() => {
    if (isOpenedMenu) {
      setIsOpenedMenu(false);
    }
  }, [location]);

  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__content">
          <Link to="/">
            <Logo />
          </Link>
          <MenuNav
            menuItems={menuItems}
            block="header"
            isOpened={isOpenedMenu}
          />
          <div className="header__actions">
            {isShowSearch && (
              <Search
                placeholder={`Search in ${location}...`}
                className="header__action header__action--search"
              />
            )}
            {isShowFav && (
              <HeaderLink
                to="favorites"
                className="header__action header__action--icon"
              >
                <Icon
                  id="heart"
                  width={16}
                  height={14}
                  counter={favourites.length}
                  className="header__icon header__icon--fav"
                />
              </HeaderLink>
            )}
            <HeaderLink
              to="cart"
              className="header__action header__action--icon"
            >
              <Icon
                id="cart"
                width={14}
                height={14}
                counter={cart.length}
                className="header__icon"
              />
            </HeaderLink>
          </div>
          <Burger
            isOpenedMenu={isOpenedMenu}
            openMenu={() => setIsOpenedMenu(isOpened => !isOpened)}
          />
        </div>
      </div>
    </header>
  );
};

export const Header = React.memo(MemoHeader);
