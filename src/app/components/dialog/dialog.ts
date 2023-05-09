import { lazy } from 'react';

const AddPeopleForm = lazy(() => import('app/components/form/AddPeopleForm'));
const UpdatePeopleForm = lazy(() => import('app/components/form/UpdatePeopleForm'));
const CreateAppointmentForm = lazy(() => import('app/components/form/CreateAppointmentForm'));

export enum DIALOG_WIZARDS {
  ADD_PEOPLE_FORM = 'ADD_PEOPLE_FORM',
  UPDATE_PEOPLE_FORM = 'UPDATE_PEOPLE_FORM',
  CREATE_APPOINTMENT_FORM = 'CREATE_APPOINTMENT_FORM',
}

export const ListCustomDialog = {
  [DIALOG_WIZARDS.ADD_PEOPLE_FORM]: AddPeopleForm,
  [DIALOG_WIZARDS.UPDATE_PEOPLE_FORM]: UpdatePeopleForm,
  [DIALOG_WIZARDS.CREATE_APPOINTMENT_FORM]: CreateAppointmentForm,
};

export const ListCustomDialogTitle = {
  [DIALOG_WIZARDS.ADD_PEOPLE_FORM]: 'New Peron',
  [DIALOG_WIZARDS.UPDATE_PEOPLE_FORM]: 'Update Peron',
  [DIALOG_WIZARDS.CREATE_APPOINTMENT_FORM]: 'Create Appointment',
};
