import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { FieldError, useController, useFormContext } from 'react-hook-form';

import { PasswordInput, TextInput } from '.';
import { FORM_CONTROLS } from 'app/domains/components/form.i';

// Error message
interface ErrorMessageProps {
  name: string;
  error?: FieldError;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="fv-plugins-message-container">
      <div className="fv-help-block">
        <span role="alert">{error?.message}</span>
      </div>
    </div>
  );
};

// Form control
type ITypeComponent = {
  [key in FORM_CONTROLS]: FC<any>;
};

const typeComponents: ITypeComponent = {
  [FORM_CONTROLS.TEXT]: TextInput,
  [FORM_CONTROLS.MAIL]: TextInput,
  [FORM_CONTROLS.PASSWORD]: PasswordInput,
};

interface FormControlProps {
  type: FORM_CONTROLS;
  name: string;
  id?: string;
  placeholder?: string;
  label?: string;
  autoComplete?: 'on' | 'off';
  cxContainer?: string;
}

const FormControl: FC<FormControlProps> = ({ type = FORM_CONTROLS.TEXT, name, label, cxContainer, autoComplete = 'off', ...rest }) => {
  const FormControlComponent: FC<any> = useMemo(() => typeComponents[type], [type]);

  const { control } = useFormContext();
  const {
    fieldState: { error, isTouched },
  } = useController({ name, control });

  const cxFormControl = clsx('form-control bg-transparent', {
    'is-invalid': isTouched && Boolean(error?.message),
    'is-valid': isTouched && !Boolean(error?.message),
  });

  return (
    <div className={cxContainer}>
      <label className="form-label fw-bolder text-dark fs-6">{label}</label>

      <FormControlComponent name={name} className={cxFormControl} type={type} {...rest} autoComplete={autoComplete} />

      <ErrorMessage name={name} error={error} />
    </div>
  );
};

export default FormControl;
