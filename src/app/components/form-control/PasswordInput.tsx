import { FC } from 'react';
import { useFormContext, useController } from 'react-hook-form';

interface PasswordInputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  [x: string]: any;
}

const PasswordInput: FC<PasswordInputProps> = ({
  name = '',
  placeholder,
  type = 'text',
  className,
  ...rest
}) => {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });

  return <input {...field} type={type} placeholder={placeholder} className={className} {...rest} />;
};

export default PasswordInput;
