import clsx from 'clsx';
import { FC, ReactNode, memo } from 'react';

interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

const Button: FC<IButtonProps> = memo(({ isLoading = false, className, id, type = 'submit', children, onClick }) => {
  return (
    <button onClick={onClick} type={type} id={id} className={clsx('btn btn-primary', className)}>
      {!isLoading && <span className="indicator-label">{children}</span>}
      {isLoading && (
        <span className="indicator-progress" style={{ display: 'block' }}>
          Please wait...
          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
