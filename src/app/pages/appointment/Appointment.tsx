import { MenuProps } from 'antd';
import AppointmentCard from 'app/components/appointment/appointment-card';
import Button from 'app/components/button';
import { DIALOG_WIZARDS } from 'app/components/dialog/dialog';
import { DATE_FORMAT } from 'app/constants/constant';
import { MEETING_TYPE_LABEL } from 'app/domains/appointment/appointment.i';
import { BUTTON_SIZES } from 'app/domains/components/button.i';
import useDialog from 'app/hooks/useDialog';
import { useGetListAppointmentQuery } from 'app/reducers/api';
import dayjs from 'dayjs';
import { get, keys, random } from 'lodash';
import { FC, useMemo } from 'react';

const Appointment: FC = () => {
  const { _appointment, refetch } = useGetListAppointmentQuery(
    {},
    {
      selectFromResult: (response) => ({
        ...response,
        _appointment: response.data?.data?.pagination.items ?? [],
      }),
    }
  );

  const { openDialog } = useDialog();

  const _mapAppointment = useMemo(() => new Map(Object.entries(_appointment)), [_appointment]);

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        label: 'Edit',
        key: '0',
      },
      {
        type: 'divider',
      },
      {
        label: 'Delete',
        key: '1',
      },
      {
        type: 'divider',
      },
      {
        label: 'Confirm appointment',
        key: '2',
      },
    ],
    []
  );

  return (
    <>
      <div className="card">
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">Appointment</span>
            <span className="text-muted mt-1 fw-semibold fs-7">All of your appointment</span>
          </h3>
          <div className="card-toolbar">
            <Button
              className="px-4"
              size={BUTTON_SIZES.SM}
              onClick={() => openDialog(DIALOG_WIZARDS.CREATE_APPOINTMENT_FORM, { callback: refetch })}>
              Create Appointment
            </Button>
          </div>
        </div>
      </div>
      <div className="">
        {keys(_appointment).map((key) => (
          <>
            <div key={key} className="px-4 py-5 fw-bold fs-2">
              {key}
            </div>

            <div className="row g-5 g-xl-8">
              {_mapAppointment.get(key)?.map((appointment) => (
                <div className="col-xl-4" key={appointment.id}>
                  <AppointmentCard
                    className="card-xl-stretch mb-xl-8"
                    image={`abstract-${random(1, 4)}.svg`}
                    title={`${get(MEETING_TYPE_LABEL, appointment.type, 'Appointment')} Schedule`}
                    time={dayjs(appointment.date_meeting).format(DATE_FORMAT)}
                    description={appointment.notes}
                    dropdownItems={items}
                  />
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Appointment;
