import React from 'react';
import clsx from 'clsx';
import { Button } from '../../base';

import './SelectNumber.scss';

type Props = {
  value: number;
  onAdd: () => void;
  onSub: () => void;
  className?: string;
  cypressParam?: string | null;
};

export const SelectNumber: React.FC<Props> = ({
  value,
  onAdd,
  onSub,
  className = null,
  cypressParam = null,
}) => {
  return (
    <div className={clsx('number-select', className && className)}>
      <Button
        type="default"
        disabled={value === 1}
        className="number-select__button"
        onClickHandler={onSub}
      >
        <span>-</span>
      </Button>
      <span className="number-select__value" data-cy={cypressParam}>
        {value}
      </span>
      <Button
        type="default"
        className="number-select__button"
        onClickHandler={onAdd}
        disabled={value === 99}
      >
        <span>+</span>
      </Button>
    </div>
  );
};
