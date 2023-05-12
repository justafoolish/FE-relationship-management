import { PlusOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button as AntdButton, Divider, Input, Select, Space } from 'antd';
import AvatarButton from 'app/components/button/AvatarButton';
import FormControl from 'app/components/form-control/FormControl';
import { FORM_CONTROLS } from 'app/domains/components/form.i';
import { handleQueryError } from 'app/modules/utils/error-handler';
import { useCreateRelationshipMutation } from 'app/reducers/relationship/relationship.api';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import Button from '../button';
import { IDialogBody } from '../dialog/CustomDialog';

const CustomTagInput: FC = () => {
  const [items, setItems] = useState(['jack', 'lucy']);
  const [name, setName] = useState('');

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: any) => {
    // e.preventDefault();
    setItems([...items, name]);
    setName('');
  };

  return (
    <Select
      style={{ width: 300 }}
      placeholder="custom dropdown render"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input placeholder="Please enter item" value={name} onChange={onNameChange} />
            <AntdButton type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </AntdButton>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
    />
  );
};

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
        first_meeting: dayjs(date).toISOString(),
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
          <CustomTagInput />
          {[
            { name: 'name', placeholder: 'Enter name', label: 'Name', type: FORM_CONTROLS.TEXT },
            { name: 'name', placeholder: 'Enter name', label: 'Name', type: FORM_CONTROLS.TEXT },
            { name: 'date', placeholder: '', label: 'Date', type: FORM_CONTROLS.DATE_PICKER },
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
        <Button className="mt-auto" isLoading={isLoading}>
          Add person
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddPeopleForm;
