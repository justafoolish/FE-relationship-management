import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from 'app/components/form-control/FormControl';
import { MEETING_TYPE_LABEL, MEETING_TYPE_VALUE } from 'app/domains/appointment/appointment.i';
import { FORM_CONTROLS } from 'app/domains/components/form.i';
import { handleQueryError } from 'app/modules/utils/error-handler';
import { useCreateAppointmentMutation } from 'app/reducers/api';
import { useGetAllRelationshipQuery } from 'app/reducers/relationship/relationship.api';
import dayjs from 'dayjs';
import { FC, useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import Button from '../button';
import { IDialogBody } from '../dialog/CustomDialog';

interface ICreateAppointmentFormFields {
  name: string;
  date: string | number | Date;
  people: string[];
  address: string;
  notes: string;
  type: string;
}

const createAppointmentValidationSchema = Yup.object().shape({
  name: Yup.string(),
  date: Yup.string(),
  people: Yup.array(Yup.string()),
  address: Yup.string(),
  notes: Yup.string(),
  type: Yup.string(),
});

const CreateAppointmentForm: FC<IDialogBody> = ({ closeModal, callback }) => {
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
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  const methods = useForm<Partial<ICreateAppointmentFormFields>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(createAppointmentValidationSchema),
  });

  const _submitForm: SubmitHandler<Partial<ICreateAppointmentFormFields>> = async (data) => {
    try {
      const { people, date, ...rest } = data;

      await createAppointment({
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
          Create appointment
        </Button>
      </form>
    </FormProvider>
  );
};

export default CreateAppointmentForm;
