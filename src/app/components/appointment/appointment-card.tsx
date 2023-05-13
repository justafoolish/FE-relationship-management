import { UserOutlined } from '@ant-design/icons';
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers';
import { Avatar, Dropdown, MenuProps, Space, Tooltip } from 'antd';
import { DATE_FORMAT } from 'app/constants/constant';
import {
  AppointmentStatusBadge,
  EAppointmentStatus,
  IAppointment,
  MEETING_TYPE,
  MEETING_TYPE_LABEL,
} from 'app/domains/appointment/appointment.i';
import { BUTTON_SIZES, BUTTON_VARIANTS } from 'app/domains/components/button.i';
import { useGetAppointmentDetailQuery } from 'app/reducers/api';
import dayjs from 'dayjs';
import { get, random } from 'lodash';
import { FC } from 'react';
import BadgeStatus from '../badge';
import Button from '../button';

interface IAppointmentProps {
  className: string;
  image: string;
  appointment?: IAppointment;
  dropdownItems?: MenuProps['items'];
}

const AppointmentCard: FC<Partial<IAppointmentProps>> = ({
  className,
  image,
  dropdownItems = [],
  appointment,
}) => {
  const { _currentAppointment } = useGetAppointmentDetailQuery(appointment?.id, {
    selectFromResult: (response) => ({
      ...response,
      _currentAppointment: response.data?.data,
    }),
    refetchOnMountOrArgChange: true,
  });

  return (
    <div
      className={`card bgi-no-repeat ${className}`}
      style={{
        backgroundPosition: 'right top',
        backgroundSize: '30% auto',
        backgroundImage: `url(${toAbsoluteUrl('/media/svg/shapes/' + image)})`,
      }}>
      <div className="card-header border-0">
        <h3 className="card-title fw-bold text-muted text-hover-primary fs-4">
          {get(MEETING_TYPE_LABEL, appointment?.type ?? MEETING_TYPE.IN_PERSON, 'Appointment')} Schedule
        </h3>
        <div className="card-toolbar">
          <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
            <Button
              size={BUTTON_SIZES.SM}
              variant={BUTTON_VARIANTS.ICON}
              className="btn-color-primary btn-active-light-primary"
              onClick={(e) => e.preventDefault()}>
              <Space>
                <KTSVG path="/media/icons/duotune/general/gen024.svg" className="svg-icon-2" />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className="card-body pt-0">
        <div className="fs-2 fw-bold mb-3 d-flex align-items-center">
          <h3 className="mb-0 me-4 text-capitalize">{appointment?.name}</h3>
          <BadgeStatus type={AppointmentStatusBadge[appointment?.status ?? EAppointmentStatus.COMING]}>
            {appointment?.status}
          </BadgeStatus>
        </div>
        <div className="fw-bold text-primary mb-3">
          {dayjs(appointment?.date_meeting).format(DATE_FORMAT)}
        </div>
        <p
          className="text-dark-75 fw-semibold fs-5 m-0 mb-3"
          dangerouslySetInnerHTML={{ __html: appointment?.notes ?? '' }}></p>

        <Avatar.Group maxCount={4} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
          {_currentAppointment?.contribute?.map((_contribute) => (
            <Tooltip key={_contribute._id} placement="top" title={_contribute.full_name}>
              <Avatar
                src={_contribute.avatar}
                style={{ background: ['#f56a00', '#87d068', '#1890ff'][random(0, 3)] }}
                icon={<UserOutlined />}
              />
            </Tooltip>
          ))}
        </Avatar.Group>
      </div>
    </div>
  );
};

export default AppointmentCard;
