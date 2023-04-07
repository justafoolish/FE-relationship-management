import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import NumberFormat from 'react-number-format';

interface PhoneInputProps {
  type?: 'text' | 'tel';
  placeholder?: string;
  className?: string;
  [x: string]: any;
}
const PhoneInput: FC<PhoneInputProps> = ({ name = '', placeholder, type, className, onBlur, ...rest }) => {
  const { control, setValue, register } = useFormContext();
  const value = useWatch({
    name,
    control,
  });

  return (
    <NumberFormat
      {...register(name)}
      placeholder={placeholder}
      className={className}
      value={value}
      type={type}
      step={1}
      maxLength={15}
      allowNegative={false}
      decimalScale={0}
      onBlur={(e: any) => {
        if (onBlur) onBlur(e);
      }}
      onValueChange={({ floatValue }) => setValue(name, floatValue)}
      {...rest}
    />
  );
};

export default PhoneInput;
