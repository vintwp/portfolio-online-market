/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product, ProductCart } from 'types';
import { wait } from 'utils';

type CartState = {
  cart: ProductCart[];
  loadingId: string | null;
};

const initialCart: CartState = {
  cart: [],
  loadingId: null,
};

export const addDelProductCart = createAsyncThunk(
  'cart/add',
  (item: Product) => {
    return wait(500).then(() => {
      return item;
    });
  },
);

export const increaseProductQty = createAsyncThunk(
  'cart/increase',
  (itemId: Product) => {
    return wait(500).then(() => {
      return itemId;
    });
  },
);

export const decreaseProductQty = createAsyncThunk(
  'cart/decrease',
  (itemId: Product) => {
    return wait(500).then(() => {
      return itemId;
    });
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addDelProductCart.pending, (state, action) => {
      const item = action.meta.arg;

      return {
        ...state,
        loadingId: item.itemId,
      };
    });
    builder.addCase(addDelProductCart.fulfilled, (state, action) => {
      const isItemExists = state.cart.findIndex(cartItem => {
        const { item } = cartItem;

        return item.itemId === action.payload.itemId;
      });

      const modifiedCartList =
        isItemExists === -1
          ? [...state.cart, { item: action.payload, qty: 1 }]
          : [...state.cart].filter(
              cartItem => cartItem.item.itemId !== action.payload.itemId,
            );

      return {
        cart: modifiedCartList,
        loadingId: null,
      };
    });
    builder.addCase(addDelProductCart.rejected, state => {
      return {
        ...state,
        loadingId: null,
      };
    });
    builder.addCase(increaseProductQty.pending, (state, action) => {
      const item = action.meta.arg;

      return {
        ...state,
        loadingId: item.itemId,
      };
    });
    builder.addCase(increaseProductQty.fulfilled, (state, action) => {
      const increasedItemId = action.payload.itemId;
      const modifiedCartList = [...state.cart].map(itemCart => {
        const { item, qty } = itemCart;

        if (item.itemId === increasedItemId) {
          return {
            ...itemCart,
            qty: qty + 1,
          };
        }

        return itemCart;
      });

      return {
        cart: modifiedCartList,
        loadingId: null,
      };
    });
    builder.addCase(increaseProductQty.rejected, state => {
      return {
        ...state,
        loadingId: null,
      };
    });
    builder.addCase(decreaseProductQty.pending, (state, action) => {
      const item = action.meta.arg;

      return {
        ...state,
        loadingId: item.itemId,
      };
    });
    builder.addCase(decreaseProductQty.fulfilled, (state, action) => {
      const decreasedItemId = action.payload.itemId;
      const modifiedCartList = [...state.cart].map(itemCart => {
        const { item, qty } = itemCart;

        if (item.itemId === decreasedItemId) {
          return {
            ...itemCart,
            qty: qty - 1,
          };
        }

        return itemCart;
      });

      return {
        cart: modifiedCartList,
        loadingId: null,
      };
    });
    builder.addCase(decreaseProductQty.rejected, state => {
      return {
        ...state,
        loadingId: null,
      };
    });
  },
});

export default cartSlice.reducer;
