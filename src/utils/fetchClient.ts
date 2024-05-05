/* eslint-disable prettier/prettier */
import { Product } from '../types/Product';
import { ProductDetail } from '../types/ProductDetail';
import { ProductCategories } from '../types/ProductCategories';

const REACT_APP_BASE_URL = import.meta.env.REACT_APP_BASE_URL || '';
const API_PRODUCT_LIST = import.meta.env.VITE_API_PRODUCT_LIST_ALL || '';
const API_PRODUCT_LIST_BY_CATEGORY =
  import.meta.env.VITE_API_PRODUCT_LIST_BY_CATEGORY || '';

export function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function getFromServer<T>(url: string): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

function makePathForImages<T extends { image?: string }>(data: T[]) {
  const dataProducts = [...data].map(product => {
    return {
      ...product,
      image: `${REACT_APP_BASE_URL}/${product.image}`,
    };
  });

  return dataProducts;
}

export async function getAllProducts() {
  try {
    const products = await getFromServer<Product[]>(API_PRODUCT_LIST);

    return [...products];
  } catch {
    throw new Error();
  }
}

export function getBrandNewProducts(products: Product[]) {
  const productsWithImagePath = makePathForImages(products);
  const latestYear = Math.max(...products.map(product => product.year));

  return productsWithImagePath.filter(product => product.year === latestYear);
}

export function getHotPriceProducts(products: Product[]) {
  const productsWithImagePath = makePathForImages(products);

  return productsWithImagePath.sort((product1, product2) => {
    return (
      product2.fullPrice -
      product2.price -
      (product1.fullPrice - product1.price)
    );
  });
}

export async function getProductsByCategory(type: ProductCategories) {
  try {
    const products = await getFromServer<ProductDetail[]>(
      `${API_PRODUCT_LIST_BY_CATEGORY}/${type}.json`,
    );

    return [...products];
  } catch {
    throw new Error();
  }
}

export async function getProductsQtyByCategory(type: ProductCategories) {
  try {
    const products = await getProductsByCategory(type);
    const productsByCategory = products.filter(
      product => product.category === type,
    );

    return productsByCategory.length;
  } catch {
    return 0;
  }
}
