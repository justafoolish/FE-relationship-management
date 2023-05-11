import { MenuProps } from 'antd';
import AppointmentCard from 'app/components/appointment/appointment-card';
import Button from 'app/components/button';
import { DIALOG_WIZARDS } from 'app/components/dialog/dialog';
import { DATE_FORMAT } from 'app/constants/constant';
import { MEETING_TYPE_LABEL } from 'app/domains/appointment/appointment.i';
import { BUTTON_SIZES } from 'app/domains/components/button.i';
import useDialog from 'app/hooks/useDialog';
import { useDeleteAppointmentMutation, useGetListAppointmentQuery } from 'app/reducers/api';
import dayjs from 'dayjs';
import { get, keys, random } from 'lodash';
import { FC, useCallback, useMemo } from 'react';
import { DeleteFilled, EditFilled, StarFilled } from '@ant-design/icons';
import { handleQueryError } from 'app/modules/utils/error-handler';
import { toast } from 'react-hot-toast';

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

  const [deleteAppointment] = useDeleteAppointmentMutation();

  const { openDialog } = useDialog();

  const _mapAppointment = useMemo(() => new Map(Object.entries(_appointment)), [_appointment]);

  const handleDeleteAppointment = useCallback(async (id?: string | number) => {
    try {
      await deleteAppointment(id);

      toast.success('Delete successfully');
      refetch();
    } catch (error) {
      handleQueryError(error);
    }
  }, []);

  const getItemsDropdown = useCallback(
    (id?: string | number) =>
      [
        {
          icon: <EditFilled />,
          className: 'text-hover-info',
          label: 'Edit',
          key: '0',
          onClick: () =>
            openDialog(DIALOG_WIZARDS.UPDATE_APPOINTMENT_FORM, {
              callback: refetch,
              options: {
                formData: { appointmentId: id },
              },
            }),
        },
        {
          type: 'divider',
        },
        {
          icon: <DeleteFilled />,
          className: 'text-hover-danger',
          label: 'Delete',
          key: '1',
          onClick: () => handleDeleteAppointment(id),
        },
        {
          type: 'divider',
        },
        {
          icon: <StarFilled />,
          className: 'text-hover-primary',
          label: 'Confirm appointment',
          key: '2',
          onClick: () => console.log('confirm', id),
        },
      ] as MenuProps['items'],
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
                    dropdownItems={getItemsDropdown(appointment.id)}
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
