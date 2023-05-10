export interface ICreateAppointmentRequest {
  ids_people: string[];
  date_meeting: string;
  notes: string;
  type: string;
  address: string;
  name: string;
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
  [MEETING_TYPE.IN_PERSON]: 'In person',
  [MEETING_TYPE.NOTE]: 'Note',
};
