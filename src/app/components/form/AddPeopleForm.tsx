import { FORM_CONTROLS } from 'app/domains/components/form.i';
import { FC } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import FormControl from 'app/components/form-control/FormControl';
import Button from '../button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface IAddPeopleFormFields {
  name: string;
  date: string | number | Date;
  email: string;
  phone: string;
  note: string;
}

const addPeopleValidationSchema = Yup.object().shape({
  name: Yup.string(),
  date: Yup.string(),
  email: Yup.string(),
  phone: Yup.string(),
  note: Yup.string(),
});

const AddPeopleForm: FC = () => {
  const methods = useForm<IAddPeopleFormFields>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(addPeopleValidationSchema),
  });

  const date = useWatch({
    control: methods.control,
    name: 'date',
  });

  console.log(date);

  return (
    <FormProvider {...methods}>
      <form className="h-100 d-flex flex-column">
        <div>
          {[
            { name: 'name', label: 'Name', type: FORM_CONTROLS.TEXT },
            { name: 'date', label: 'Date', type: FORM_CONTROLS.DATE_PICKER },
            { name: 'email', label: 'Email', type: FORM_CONTROLS.MAIL },
            { name: 'phone', label: 'Phone', type: FORM_CONTROLS.TEL },
            { name: 'note', label: 'Note', type: FORM_CONTROLS.TEXT },
          ].map((formItem, idx) => {
            return (
              <FormControl
                key={idx}
                type={formItem.type}
                name={formItem.name}
                label={formItem.label}
                cxContainer="fv-row mb-8"
                className="form-control form-control-lg form-control-solid "
              />
            );
          })}
        </div>
        <Button className="mt-auto">Add person</Button>
      </form>
    </FormProvider>
  );
};

export default AddPeopleForm;
