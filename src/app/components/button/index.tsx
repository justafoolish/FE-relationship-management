import clsx from 'clsx';
import { FC, ReactNode, memo } from 'react';

interface IButtonProps {
  id?: string;
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
}

const Button: FC<IButtonProps> = memo(({ isLoading = false, className, id, children }) => {
  return (
    <button type="submit" id={id} className={clsx('btn btn-primary', className)}>
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
