import { IAppointment } from '../appointment/appointment.i';
import { IUserInfo } from '../user/user.i';

export enum NOTIFICATION_TYPE {
  APPOINTMENT = 'ready_time',
  RELATIONSHIP = 'long_time',
}

type INotificationBadgeStatus = {
  [key in NOTIFICATION_TYPE]: {
    title: string;
    badge: string;
  };
};

export const NOTIFICATION_BADGE_STATUS: INotificationBadgeStatus = {
  [NOTIFICATION_TYPE.APPOINTMENT]: {
    title: 'Schedule',
    badge: 'info',
  },
  [NOTIFICATION_TYPE.RELATIONSHIP]: {
    title: 'Relation',
    badge: 'danger',
  },
};

export interface INotification {
  _id: string;
  type: NOTIFICATION_TYPE;
  title: string;
  info?: IAppointment & Partial<Pick<IUserInfo, 'full_name'>>;
  created_at: string;
}
