import React from 'react';
import clsx from 'clsx';
import { Slider, SliderItem } from 'ui/modules';
import './Banner.scss';

type Props = { className?: string };

export const Banner: React.FC<Props> = ({ className = '' }) => {
  return (
    <div className={clsx('banner', className && className)}>
      <Slider
        slidesToShow={1}
        stepBy={1}
        autoplayInterval={5000}
        duration={1000}
        autoplay
        infinite
        navArrows
        navDots
        className="banner"
      >
        <SliderItem>
          <img src="img/banner-tablets.png" alt="Tablets" />
        </SliderItem>
        <SliderItem>
          <img src="img/banner-phones.png" alt="Mobile Phones" />
        </SliderItem>
        <SliderItem>
          <img src="img/banner-accessories.png" alt="Mobile Accessories" />
        </SliderItem>
      </Slider>
    </div>
  );
};
