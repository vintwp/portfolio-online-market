import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAllProducts,
  getBrandNewProducts,
  getHotPriceProducts,
} from 'utils/fetchClient';
import { Product } from 'types';

type ProductsState = {
  products: Product[];
  hotPriceProducts: Product[];
  brandNewProducts: Product[];
  loading: boolean;
  error: boolean;
};

const initialProducts: ProductsState = {
  products: [],
  hotPriceProducts: [],
  brandNewProducts: [],
  loading: false,
  error: false,
};

export const getProducts = createAsyncThunk('products/fetch', () => {
  return getAllProducts();
});

export const productsSlice = createSlice({
  name: 'products',
  initialState: initialProducts,
  reducers: {
    set: (state, action: PayloadAction<Product[]>) => {
      return {
        ...state,
        products: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(getProducts.pending, state => {
      return {
        ...state,
        products: [],
        hotPriceProducts: [],
        brandNewProducts: [],
        loading: true,
      };
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      const allProducts = action.payload;
      const hotPriceProducts = getHotPriceProducts(allProducts);
      const brandNewProducts = getBrandNewProducts(allProducts);

      return {
        ...state,
        products: allProducts,
        hotPriceProducts,
        brandNewProducts,
        loading: false,
      };
    });
    builder.addCase(getProducts.rejected, state => {
      return {
        ...state,
        error: true,
        loading: true,
      };
    });
  },
});

export default productsSlice.reducer;
