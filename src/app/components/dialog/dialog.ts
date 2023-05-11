import { FC, LazyExoticComponent, lazy } from 'react';
import { IDialogBody } from './CustomDialog';

const AddPeopleForm = lazy(() => import('app/components/form/AddPeopleForm'));
const UpdatePeopleForm = lazy(() => import('app/components/form/UpdatePeopleForm'));
const CreateAppointmentForm = lazy(() => import('app/components/form/CreateAppointmentForm'));
const UpdateAppointmentForm = lazy(() => import('app/components/form/UpdateAppointmentForm'));

export enum DIALOG_WIZARDS {
  ADD_PEOPLE_FORM = 'ADD_PEOPLE_FORM',
  UPDATE_PEOPLE_FORM = 'UPDATE_PEOPLE_FORM',
  CREATE_APPOINTMENT_FORM = 'CREATE_APPOINTMENT_FORM',
  UPDATE_APPOINTMENT_FORM = 'UPDATE_APPOINTMENT_FORM',
}

export const ListCustomDialog: {
  [key in DIALOG_WIZARDS]: LazyExoticComponent<FC<IDialogBody>>;
} = {
  [DIALOG_WIZARDS.ADD_PEOPLE_FORM]: AddPeopleForm,
  [DIALOG_WIZARDS.UPDATE_PEOPLE_FORM]: UpdatePeopleForm,
  [DIALOG_WIZARDS.CREATE_APPOINTMENT_FORM]: CreateAppointmentForm,
  [DIALOG_WIZARDS.UPDATE_APPOINTMENT_FORM]: UpdateAppointmentForm,
};

export const ListCustomDialogTitle: {
  [key in DIALOG_WIZARDS]: string;
} = {
  [DIALOG_WIZARDS.ADD_PEOPLE_FORM]: 'New Peron',
  [DIALOG_WIZARDS.UPDATE_PEOPLE_FORM]: 'Update Peron',
  [DIALOG_WIZARDS.CREATE_APPOINTMENT_FORM]: 'Create Appointment',
  [DIALOG_WIZARDS.UPDATE_APPOINTMENT_FORM]: 'Update Appointment',
};
