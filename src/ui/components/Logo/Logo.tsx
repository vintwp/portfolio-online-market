import React from 'react';
import logo from 'assets/img/logo.png';
import './Logo.scss';

type Props = {};

export const Logo: React.FC<Props> = () => {
  return (
    <div className="logo">
      <img src={logo} alt="Phone and Accessories Catalog" />
    </div>
  );
};
