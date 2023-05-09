import { yupResolver } from '@hookform/resolvers/yup';
import AvatarButton from 'app/components/button/AvatarButton';
import FormControl from 'app/components/form-control/FormControl';
import { DATE_FORMAT } from 'app/constants/constant';
import { FORM_CONTROLS } from 'app/domains/components/form.i';
import { handleQueryError } from 'app/modules/utils/error-handler';
import {
  useGetRelationshipDetailQuery,
  useUpdateRelationshipMutation,
} from 'app/reducers/relationship/relationship.api';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { FC, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import Button from '../button';
import { IDialogBody } from '../dialog/CustomDialog';

interface IUpdatePeopleFormFields {
  name: string;
  date: string | number | Date | dayjs.Dayjs;
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

const UpdatePeopleForm: FC<IDialogBody> = ({ closeModal, callback, formData }) => {
  const { _relationshipDetail, isFetching: isGetRelationshipFetching } = useGetRelationshipDetailQuery(
    formData._id,
    {
      selectFromResult: (response) => ({
        ...response,
        _relationshipDetail: response.data?.data ?? {},
      }),
      refetchOnMountOrArgChange: true,
    }
  );

  const [updateRelationship, { isLoading }] = useUpdateRelationshipMutation();

  const methods = useForm<Partial<IUpdatePeopleFormFields>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(addPeopleValidationSchema),
  });

  useEffect(() => {
    if (isEmpty(_relationshipDetail)) return;

    methods.setValue('avatar', _relationshipDetail.avatar);
    methods.setValue('name', _relationshipDetail.full_name);
    methods.setValue('notes', _relationshipDetail.notes);
    methods.setValue('phone', _relationshipDetail.phone);
    methods.setValue('email', _relationshipDetail.email);
    methods.setValue('date', dayjs(_relationshipDetail.first_meeting, DATE_FORMAT));
  }, [_relationshipDetail]);

  const _submitForm: SubmitHandler<Partial<IUpdatePeopleFormFields>> = async (data) => {
    try {
      const { date, avatar, ...rest } = data;

      await updateRelationship({
        ...rest,
        ...(avatar !== _relationshipDetail.avatar ? { avatar } : {}),
        date_meeting: dayjs(date).toISOString(),
        first_meeting: dayjs(date).toISOString(),
        tag: 'friend',
        _id: formData._id,
      }).unwrap();

      toast.success('Update People success');
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
            {
              name: 'date',
              placeholder: '',
              label: 'Date',
              type: FORM_CONTROLS.DATE_PICKER,
              format: DATE_FORMAT,
            },
            { name: 'email', placeholder: 'Enter email', label: 'Email', type: FORM_CONTROLS.MAIL },
            { name: 'phone', placeholder: 'Enter phone number', label: 'Phone', type: FORM_CONTROLS.TEL },
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
        <Button className="mt-auto" isLoading={isLoading || isGetRelationshipFetching}>
          Update person
        </Button>
      </form>
    </FormProvider>
  );
};

export default UpdatePeopleForm;
