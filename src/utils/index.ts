import {
  getEnumKeyByEnumValue,
  getEnumValueByKey,
  enumToArrayOfObjects,
  sortNumericField,
  addPropToItemsComparedAnotherItems,
  deleteItemFromArrayByField,
  addItemFromArrayByField,
  addDeleteExistItemFromArray,
  filterArrayByFieldValue,
  isItemInArray,
  capitalize,
  getRandomKey,
} from './utils';

import {
  getSearchWith,
  setSearchWith,
  type SearchParams,
} from './searchHelper';

import {
  getAllProducts,
  getBrandNewProducts,
  getHotPriceProducts,
  getProductsByCategory,
  getProductsQtyByCategory,
  wait,
} from './fetchClient';

export {
  getEnumKeyByEnumValue,
  getEnumValueByKey,
  enumToArrayOfObjects,
  sortNumericField,
  addPropToItemsComparedAnotherItems,
  getAllProducts as getProducts,
  getBrandNewProducts,
  getHotPriceProducts,
  getProductsByCategory,
  deleteItemFromArrayByField,
  addItemFromArrayByField,
  addDeleteExistItemFromArray,
  filterArrayByFieldValue,
  wait,
  isItemInArray,
  getSearchWith,
  setSearchWith,
  SearchParams,
  capitalize,
  getRandomKey,
  getProductsQtyByCategory,
};
