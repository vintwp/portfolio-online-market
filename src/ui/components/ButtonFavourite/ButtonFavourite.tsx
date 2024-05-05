import clsx from 'clsx';
import React from 'react';
import { Icon, Button } from 'ui/base';

import './ButtonFavourite.scss';

type Props = {
  isAdded: boolean;
  isLoading?: boolean;
  onClick: () => void;
};

export const ButtonFavourite: React.FC<Props> = ({
  isAdded,
  onClick,
  isLoading,
}) => {
  return (
    <Button
      type="default"
      onClickHandler={onClick}
      cypressParam="addToFavorite"
      className={clsx('button-fav', isAdded && 'button-fav--added')}
      isLoading={isLoading}
    >
      <Icon id="heart" width={20} height={20} className="button-fav-icon" />
    </Button>
  );
};
