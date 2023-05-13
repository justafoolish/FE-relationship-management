import clsx from 'clsx';
import { FC, ReactNode } from 'react';

export enum IBadgeType {
  SUCCESS = 'Success',
  REJECT = 'Reject',
  APPROVED = 'Approved',
  IN_PROGRESS = 'In progress',
  WARNING = 'Warning',
}

const BadgeStatus: FC<{ type: IBadgeType; children?: ReactNode }> = ({ type, children }) => {
  const cxBadge = clsx('badge text-capitalize', {
    'badge-light-success': type === IBadgeType.SUCCESS,
    'badge-light-warning': type === IBadgeType.WARNING,
    'badge-light-danger': type === IBadgeType.REJECT,
    'badge-light-info': type === IBadgeType.IN_PROGRESS,
    'badge-light-primary': type === IBadgeType.APPROVED,
  });
  return <span className={cxBadge}>{children}</span>;
};

export default BadgeStatus;
