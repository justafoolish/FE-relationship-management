import DIALOG_WIZARDS from 'app/domains/dialog/dialog.e';
import { lazy } from 'react';

const AddPeopleForm = lazy(() => import('app/components/form/AddPeopleForm'));
const UpdatePeopleForm = lazy(() => import('app/components/form/UpdatePeopleForm'));

export const ListCustomDialog = {
  [DIALOG_WIZARDS.ADD_PEOPLE_FORM]: AddPeopleForm,
  [DIALOG_WIZARDS.UPDATE_PEOPLE_FORM]: UpdatePeopleForm,
};

export const ListCustomDialogTitle = {
  [DIALOG_WIZARDS.ADD_PEOPLE_FORM]: 'New Peron',
  [DIALOG_WIZARDS.UPDATE_PEOPLE_FORM]: 'Update Peron',
};
