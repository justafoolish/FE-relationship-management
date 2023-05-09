import { yupResolver } from '@hookform/resolvers/yup';
import AvatarButton from 'app/components/button/AvatarButton';
import FormControl from 'app/components/form-control/FormControl';
import { FORM_CONTROLS } from 'app/domains/components/form.i';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Button from '../button';
import { handleQueryError } from 'app/modules/utils/error-handler';
import { useCreateRelationshipMutation } from 'app/reducers/relationship/relationship.api';
import dayjs from 'dayjs';
import { toast } from 'react-hot-toast';
import { IDialogBody } from '../dialog/CustomDialog';

interface IAddPeopleFormFields {
  name: string;
  date: string | number | Date;
  email: string;
  phone: string;
  notes: string;
  avatar: string;
}

const addPeopleValidationSchema = Yup.object().shape({
  name: Yup.string(),
  date: Yup.string(),
  email: Yup.string(),
  phone: Yup.string(),
  notes: Yup.string(),
  avatar: Yup.string(),
});

const AddPeopleForm: FC<IDialogBody> = ({ closeModal, callback }) => {
  const [createRelationship, { isLoading }] = useCreateRelationshipMutation();
  const methods = useForm<Partial<IAddPeopleFormFields>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(addPeopleValidationSchema),
  });

  const _submitForm: SubmitHandler<Partial<IAddPeopleFormFields>> = async (data) => {
    try {
      const { date, ...rest } = data;

      await createRelationship({
        ...rest,
        date_meeting: dayjs(date).toISOString(),
        tag: 'friend',
      }).unwrap();

      toast.success('Add People success');
      closeModal();
      callback();
    } catch (error) {
      handleQueryError(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="h-100 d-flex flex-column" onSubmit={methods.handleSubmit(_submitForm)}>
        <div>
          <AvatarButton name="avatar" />
          {[
            { name: 'name', placeholder: 'Enter name', label: 'Name', type: FORM_CONTROLS.TEXT },
            { name: 'date', placeholder: '', label: 'Date', type: FORM_CONTROLS.DATE_PICKER },
            { name: 'email', placeholder: 'Enter email', label: 'Email', type: FORM_CONTROLS.MAIL },
            { name: 'phone', placeholder: 'Enter phone number', label: 'Phone', type: FORM_CONTROLS.TEL },
            { name: 'notes', placeholder: 'Enter notes', label: 'Note', type: FORM_CONTROLS.TEXT },
          ].map((formItem, idx) => {
            return (
              <FormControl
                key={idx}
                type={formItem.type}
                name={formItem.name}
                label={formItem.label}
                placeholder={formItem.placeholder}
                cxContainer="fv-row mb-8"
                className="form-control form-control-lg form-control-solid "
              />
            );
          })}
        </div>
        <Button className="mt-auto" isLoading={isLoading}>
          Add person
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddPeopleForm;
