import { IAppointment } from '../appointment/appointment.i';
import { IUserInfo } from '../user/user.i';

export enum NOTIFICATION_TYPE {
  APPOINTMENT = 'ready_time',
  RELATIONSHIP = 'long_time',
}

export interface INotification {
  _id: string;
  type: NOTIFICATION_TYPE;
  title: string;
  info: IUserInfo | IAppointment;
  created_at: string;
}
