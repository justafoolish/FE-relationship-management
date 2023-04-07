import { FC } from 'react';
import { useFormContext, useController } from 'react-hook-form';

interface TextInputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  [x: string]: any;
}
const TextInput: FC<TextInputProps> = ({ name = '', placeholder, type = 'text', className, ...rest }) => {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });

  return <input {...field} type={type} placeholder={placeholder} className={className} {...rest} />;
};

export default TextInput;
