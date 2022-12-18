import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const appInitialState = {
  isDarkTheme: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setDarkTheme(state, action: PayloadAction<{isDarkTheme: boolean}>) {
      state.isDarkTheme = action.payload.isDarkTheme;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;