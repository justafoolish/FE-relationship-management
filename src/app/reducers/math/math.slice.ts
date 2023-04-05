import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface IMathState {
  a: number;
  b: number;
}

const initMathState: IMathState = {
  a: 2,
  b: 3,
};

export const mathSlice = createSlice({
  name: 'math',
  initialState: initMathState,
  reducers: {
    updateNum: (state, { payload }: PayloadAction<IMathState>) => {
      state.a = payload.a;
      state.b = payload.b;
    },
  },
});

// math selector
const mathSelector = (state: RootState) => state.math;

export { mathSelector };

// math actions
export const { updateNum } = mathSlice.actions;

// math reducer
const mathReducer = mathSlice.reducer;
export default mathReducer;
