import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { View } from '../types';


interface AppState {
  currentView: View;
  selectedProductId: string | null;
}

const initialState: AppState = {
  currentView: 'list',
  selectedProductId: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<View>) => {
      state.currentView = action.payload;
    },
    setSelectedProductId: (state, action: PayloadAction<string | null>) => {
      state.selectedProductId = action.payload;
    },
    navigateToList: (state) => {
      state.currentView = 'list';
      state.selectedProductId = null;
    },
    navigateToAdd: (state) => {
      state.currentView = 'add';
      state.selectedProductId = null;
    },
    navigateToEdit: (state, action: PayloadAction<string>) => {
      state.currentView = 'edit';
      state.selectedProductId = action.payload;
    },
  },
});

export const {
  setView,
  setSelectedProductId,
  navigateToList,
  navigateToAdd,
  navigateToEdit,
} = appSlice.actions;

export default appSlice.reducer;
