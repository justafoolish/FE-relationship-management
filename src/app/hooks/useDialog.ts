import { DIALOG_WIZARDS } from 'app/components/dialog/dialog';
import { IDialogState, closeDialogAction, openDialogAction } from 'app/reducers/dialog/dialog.slice';
import { useAppDispatch } from 'app/reducers/store.hook';

const useDialog = () => {
  const dispatch = useAppDispatch();

  const openDialog = (dialogWizard: DIALOG_WIZARDS, payload: Partial<IDialogState>) => {
    dispatch(
      openDialogAction({
        ...payload,
        dialogWizard,
        options: payload.options ?? {},
      })
    );
  };

  const closeDialog = () => {
    dispatch(closeDialogAction());
  };

  return { openDialog, closeDialog };
};

export default useDialog;
