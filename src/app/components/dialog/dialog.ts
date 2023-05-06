import DIALOG_WIZARDS from 'app/domains/dialog/dialog.e';
import { lazy } from 'react';

const AddPeopleForm = lazy(() => import('app/components/form/AddPeopleForm'));

export const ListCustomDialog = {
  [DIALOG_WIZARDS.ADD_PEOPLE_FORM]: AddPeopleForm,
};

export const ListCustomDialogTitle = {
  [DIALOG_WIZARDS.ADD_PEOPLE_FORM]: 'New Peron',
};
