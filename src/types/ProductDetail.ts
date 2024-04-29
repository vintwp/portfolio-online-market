import { DescriptionParagraph } from './DescriptionParagraph';
import { Colors } from './Color';
import { ProductCategories } from './ProductCategories';

// interface ProductDetail extends Omit<Product, 'itemId'> {
//   id: string;
//   images: string[];
//   description: DescriptionParagraph[];
//   capacity: string;
//   priceDiscount: number;
//   priceRegular: number;
//   color: Colors;
// }

interface ProductDetail {
  id: string;
  category: ProductCategories;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: Colors[];
  color: Colors;
  images: string[];
  description: DescriptionParagraph[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
}

export { type DescriptionParagraph, type ProductDetail };
