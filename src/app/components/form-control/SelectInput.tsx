import { Select } from 'antd';
import { FC, ReactNode } from 'react';
import { useController } from 'react-hook-form';

interface SelectInputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  options?: {
    label: string | ReactNode;
    value: string | number;
  }[];
  [x: string]: any;
}
const SelectInput: FC<SelectInputProps> = ({ name = '', ...rest }) => {
  const { field } = useController({ name });

  return <Select {...field} {...rest} />;
};

SelectInput.defaultProps = {
  options: [],
  style: {
    width: '100%',
  },
};

export default SelectInput;
