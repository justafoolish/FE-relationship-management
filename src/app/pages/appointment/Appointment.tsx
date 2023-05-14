import { DeleteFilled, EditFilled, StarFilled } from '@ant-design/icons';
import { Button as AntdButton, DatePicker, MenuProps, Popconfirm } from 'antd';
import AppointmentCard from 'app/components/appointment/appointment-card';
import Button from 'app/components/button';
import { DIALOG_WIZARDS } from 'app/components/dialog/dialog';
import { DATE_FORMAT } from 'app/constants/constant';
import { EAppointmentStatus } from 'app/domains/appointment/appointment.i';
import { BUTTON_SIZES } from 'app/domains/components/button.i';
import { PaginationRequest } from 'app/domains/rtk/base.request';
import useDialog from 'app/hooks/useDialog';
import { handleQueryError } from 'app/modules/utils/error-handler';
import {
  useDeleteAppointmentMutation,
  useGetListAppointmentQuery,
  useUpdateAppointmentStatusMutation,
} from 'app/reducers/api';
import dayjs from 'dayjs';
import { isEmpty, keys, random } from 'lodash';
import { FC, Fragment, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

const DeleteAppointmentButton: FC<{ id?: string | number; callback: () => void }> = ({ id, callback }) => {
  const [deleteAppointment, { isLoading }] = useDeleteAppointmentMutation();

  const handleDeleteAppointment = useCallback(async () => {
    try {
      await deleteAppointment(id);

      toast.success('Delete successfully');
      callback();
    } catch (error) {
      handleQueryError(error);
    }
  }, [id]);

  return (
    <Popconfirm
      title="Delete Appointment"
      description="Are you sure to delete this appointment?"
      onConfirm={handleDeleteAppointment}
      okButtonProps={{ loading: isLoading }}>
      <AntdButton type="link" className="p-0 h-auto text-dark text-hover-danger">
        Delete
      </AntdButton>
    </Popconfirm>
  );
};

const Appointment: FC = () => {
  const [dateFilter, setDateFilter] = useState<PaginationRequest>({
    from_date: '',
    to_date: '',
  });

  const { _appointment, refetch } = useGetListAppointmentQuery(
    {
      ...(!isEmpty(dateFilter.from_date)
        ? {
            from_date: dateFilter.from_date,
          }
        : {}),
      ...(!isEmpty(dateFilter.to_date)
        ? {
            to_date: dateFilter.to_date,
          }
        : {}),
    },
    {
      selectFromResult: (response) => ({
        ...response,
        _appointment: response.data?.data?.pagination.items ?? [],
      }),
    }
  );

  const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();

  const { openDialog } = useDialog();

  const _mapAppointment = useMemo(() => new Map(Object.entries(_appointment)), [_appointment]);

  const handleDeleteAppointmentStatus = useCallback(async (id?: string | number) => {
    try {
      await updateAppointmentStatus(id);

      toast.success('Delete successfully');
      refetch();
    } catch (error) {
      handleQueryError(error);
    }
  }, []);

  const getItemsDropdown = useCallback(
    (id: string | number, status: EAppointmentStatus) =>
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
          label: <DeleteAppointmentButton id={id} callback={refetch} />,
          key: '1',
        },
        ...(status === EAppointmentStatus.COMING
          ? [
              {
                type: 'divider',
              },
              {
                icon: <StarFilled />,
                className: 'text-hover-primary',
                label: 'Confirm appointment',
                key: '2',
                onClick: () => handleDeleteAppointmentStatus(id),
              },
            ]
          : []),
      ] as MenuProps['items'],
    []
  );

  const handleDatePickerChange = (value: any) => {
    const [fromDate, toDate] = value ?? [];

    setDateFilter({
      from_date: fromDate ? dayjs(fromDate).toISOString() : '',
      to_date: toDate ? dayjs(toDate).toISOString() : '',
    });
  };

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
        <div className="card-body pt-4">
          <label className="fw-bold me-4">Date filter:</label>
          <DatePicker.RangePicker format={DATE_FORMAT} onChange={handleDatePickerChange} />
        </div>
      </div>
      <div className="">
        {keys(_appointment).map((key) => (
          <Fragment key={key}>
            <div className="px-4 py-5 fw-bold fs-2">{key}</div>

            <div className="row g-5 g-xl-8">
              {_mapAppointment.get(key)?.map((appointment) => (
                <div className="col-xl-4" key={appointment.id}>
                  <AppointmentCard
                    className="card-xl-stretch mb-xl-8"
                    image={`abstract-${random(1, 4)}.svg`}
                    dropdownItems={getItemsDropdown(appointment.id, appointment.status)}
                    appointment={appointment}
                  />
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default Appointment;
