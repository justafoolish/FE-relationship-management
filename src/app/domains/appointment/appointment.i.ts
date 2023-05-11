import { IBadgeType } from 'app/components/badge';
import { IPeople } from '../relationship/relationship.i';

export interface ICreateAppointmentRequest {
  id?: string;
  ids_people: string[];
  date_meeting: string;
  notes: string;
  type: string;
  address: string;
  name: string;
}

export enum EAppointmentStatus {
  COMING = 'coming',
  DONE = 'done',
  CANCEL = 'cancel',
}

export const AppointmentStatusBadge = {
  [EAppointmentStatus.CANCEL]: IBadgeType.REJECT,
  [EAppointmentStatus.DONE]: IBadgeType.SUCCESS,
  [EAppointmentStatus.COMING]: IBadgeType.IN_PROGRESS,
};

export interface IAppointment {
  id: string | number;
  relationship_ids: string[];
  type: string;
  address: string;
  name: string;
  notes: string;
  status: EAppointmentStatus;
  date_meeting: string;
  date: string;
  created_at?: string;
  updated_at?: string;
  contribute?: IPeople[];
}

export interface IListAppointment {
  [x: string]: IAppointment[];
}

export interface IGetAppointmentsRequest {
  appointment: Partial<IAppointment>;
}

export enum MEETING_TYPE {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  NOTE = 'NOTE',
  IN_PERSON = 'IN_PERSON',
}

export const MEETING_TYPE_VALUE = [
  MEETING_TYPE.EMAIL,
  MEETING_TYPE.PHONE,
  MEETING_TYPE.IN_PERSON,
  MEETING_TYPE.NOTE,
];

export const MEETING_TYPE_LABEL = {
  [MEETING_TYPE.EMAIL]: 'Email',
  [MEETING_TYPE.PHONE]: 'Phone',
  [MEETING_TYPE.IN_PERSON]: 'In person meeting',
  [MEETING_TYPE.NOTE]: 'Note meeting',
};
