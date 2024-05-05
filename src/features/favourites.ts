import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from 'types';
import { addDeleteExistItemFromArray, wait } from 'utils';

type FavouritesState = {
  favourites: Product[];
  loadingId: string | null;
};

const initialFavourite: FavouritesState = {
  favourites: [],
  loadingId: null,
};

export const addDelProductFav = createAsyncThunk(
  'favourites/add-del',
  (item: Product) => {
    return wait(500).then(() => {
      return item;
    });
  },
);

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: initialFavourite,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addDelProductFav.pending, (state, action) => {
      const item = action.meta.arg;

      return {
        ...state,
        loadingId: item.itemId,
      };
    });
    builder.addCase(addDelProductFav.fulfilled, (state, action) => {
      const modifiedFavList = addDeleteExistItemFromArray(
        action.payload,
        state.favourites,
        'itemId',
      );

      return {
        favourites: modifiedFavList,
        loadingId: null,
      };
    });
    builder.addCase(addDelProductFav.rejected, state => {
      return {
        ...state,
        loadingId: null,
      };
    });
  },
});

export default favouritesSlice.reducer;
