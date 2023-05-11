import { DatePicker } from 'antd';
import { DATE_FORMAT } from 'app/constants/constant';
import { FC } from 'react';
import { useFormContext, useController } from 'react-hook-form';

interface DateInputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  [x: string]: any;
}
const DateInput: FC<DateInputProps> = ({ name = '', placeholder, className, ...rest }) => {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });

  return <DatePicker {...field} placeholder={placeholder} className={className} {...rest} />;
};

DateInput.defaultProps = {
  format: DATE_FORMAT,
};
export default DateInput;
