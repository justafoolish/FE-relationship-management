import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from 'app/components/form-control/FormControl';
import { DATE_FORMAT } from 'app/constants/constant';
import { MEETING_TYPE_LABEL, MEETING_TYPE_VALUE } from 'app/domains/appointment/appointment.i';
import { FORM_CONTROLS } from 'app/domains/components/form.i';
import { handleQueryError } from 'app/modules/utils/error-handler';
import { useGetAppointmentDetailQuery, useUpdateAppointmentMutation } from 'app/reducers/api';
import { useGetAllRelationshipQuery } from 'app/reducers/relationship/relationship.api';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { FC, useEffect, useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import Button from '../button';
import { IDialogBody } from '../dialog/CustomDialog';

interface IUpdateAppointmentFormFields {
  name: string;
  date: string | number | Date | dayjs.Dayjs;
  people: string[];
  address: string;
  notes: string;
  type: string;
}

const updateAppointmentValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required field'),
  date: Yup.string()
    .test('Invalid-date', 'Invalid date', (date) => dayjs(date).diff(dayjs(), 'day') >= 0)
    .required(),
  people: Yup.array(Yup.string().required()).required(),
  address: Yup.string(),
  notes: Yup.string(),
  type: Yup.string(),
});

const UpdateAppointmentForm: FC<IDialogBody> = ({ closeModal, callback, formData }) => {
  const { appointmentId } = formData;
  const { _relationship } = useGetAllRelationshipQuery(
    { type: 'all' },
    {
      selectFromResult: (response) => ({
        ...response,
        _relationship: response.data?.data?.pagination.items ?? [],
      }),
      refetchOnMountOrArgChange: true,
    }
  );

  const { _currentAppointment } = useGetAppointmentDetailQuery(appointmentId, {
    selectFromResult: (response) => ({
      ...response,
      _currentAppointment: response.data?.data,
    }),
  });

  const [updateAppointment, { isLoading }] = useUpdateAppointmentMutation();

  const methods = useForm<Partial<IUpdateAppointmentFormFields>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(updateAppointmentValidationSchema),
    defaultValues: {
      date: dayjs(),
    },
  });

  const _submitForm: SubmitHandler<Partial<IUpdateAppointmentFormFields>> = async (data) => {
    try {
      const { people, date, ...rest } = data;

      await updateAppointment({
        id: appointmentId,
        ids_people: people,
        date_meeting: dayjs(date).toISOString(),
        ...rest,
      }).unwrap();
      toast.success('Add People success');
      closeModal();
      callback();
    } catch (error) {
      handleQueryError(error);
    }
  };

  const peopleOptions = useMemo(
    () => _relationship.map((_people) => ({ label: _people?.full_name, value: _people?._id })),
    [_relationship]
  );

  const typeOptions = useMemo(
    () => MEETING_TYPE_VALUE.map((_type) => ({ label: MEETING_TYPE_LABEL[_type], value: _type })),
    []
  );

  useEffect(() => {
    if (isEmpty(_currentAppointment)) return;

    methods.setValue('name', _currentAppointment.name);
    methods.setValue('people', _currentAppointment.relationship_ids);
    methods.setValue('notes', _currentAppointment.notes);
    methods.setValue('type', _currentAppointment.type);
    methods.setValue('address', _currentAppointment.address);
    methods.setValue('date', dayjs(_currentAppointment.date_meeting, DATE_FORMAT));
  }, [_currentAppointment]);

  return (
    <FormProvider {...methods}>
      <form className="h-100 d-flex flex-column" onSubmit={methods.handleSubmit(_submitForm)}>
        <div>
          {[
            {
              name: 'name',
              placeholder: 'Enter meeting title',
              label: 'Title',
              type: FORM_CONTROLS.TEXT,
            },
            {
              name: 'people',
              placeholder: 'Select Person',
              label: 'Person',
              type: FORM_CONTROLS.SELECT,
              allowClear: true,
              mode: 'multiple',
              options: peopleOptions,
            },
            {
              type: FORM_CONTROLS.SELECT,
              name: 'type',
              placeholder: 'Select type',
              label: 'Type',
              options: typeOptions,
            },
            { name: 'date', placeholder: '', label: 'Date meeting', type: FORM_CONTROLS.DATE_PICKER },
            {
              name: 'address',
              placeholder: 'Enter place to meet',
              label: 'Address',
              type: FORM_CONTROLS.TEXT,
            },
            { name: 'notes', placeholder: 'Enter notes', label: 'Note', type: FORM_CONTROLS.TEXT },
          ].map((formItem, idx) => {
            return (
              <FormControl
                key={idx}
                {...formItem}
                cxContainer="fv-row mb-8"
                className="form-control form-control-lg form-control-solid "
              />
            );
          })}
        </div>
        <Button className="mt-auto" isLoading={isLoading}>
          Update appointment
        </Button>
      </form>
    </FormProvider>
  );
};

export default UpdateAppointmentForm;
