import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import DIALOG_WIZARDS from 'app/domains/dialog/dialog.e';
import { isEmpty } from 'lodash';
import { RootState } from '..';

export type DialogType = 'modal' | 'drawer';

export interface IDialogState {
  visible?: boolean;
  dialogWizard?: DIALOG_WIZARDS;
  options: {
    type?: DialogType;
    className?: string;
    placement?: 'start' | 'end' | 'top' | 'bottom';
    modalSize?: 'sm' | 'lg' | 'xl';
    formData?: any;
  };
  callback?: () => void;
}

export const initDialogState: IDialogState = {
  visible: false,
  options: {
    type: 'drawer',
    placement: 'end',
    modalSize: 'xl',
    formData: {},
  },
  callback: () => ({}),
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: initDialogState,
  reducers: {
    openDialogAction: (state, { payload }: PayloadAction<IDialogState>) => {
      state.visible = true;
      state.dialogWizard = payload.dialogWizard;
      state.options.placement = isEmpty(payload.options?.placement) ? 'end' : payload.options?.placement;
      state.options.type = isEmpty(payload.options.type) ? 'drawer' : payload.options.type;
      state.options.className = payload.options.className;
      state.options.modalSize = payload.options.modalSize;
      state.options.formData = payload.options.formData;
      state.callback = payload.callback;
    },
    closeDialogAction: (state) => {
      state.visible = false;
    },
  },
});

const accessTokenSelector = (state: RootState) => state.auth.accessToken;
const userInfoSelector = (state: RootState) => state.auth.user;
const isAuthenticatedSelector = (state: RootState) => state.auth.authenticated;

export { accessTokenSelector, userInfoSelector, isAuthenticatedSelector };

export const { openDialogAction, closeDialogAction } = dialogSlice.actions;

const dialogReducer = dialogSlice.reducer;
export default dialogReducer;
