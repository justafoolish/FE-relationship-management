import { BUTTON_SIZES, BUTTON_VARIANTS } from 'app/domains/components/button.i';
import clsx from 'clsx';
import { FC, ReactNode, memo } from 'react';

interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  variant?: BUTTON_VARIANTS;
  size?: BUTTON_SIZES;
}

const Button: FC<IButtonProps> = memo(
  ({
    isLoading = false,
    className,
    id,
    type = 'submit',
    children,
    onClick,
    variant = BUTTON_VARIANTS.PRIMARY,
    size = BUTTON_SIZES.DEFAULT,
  }) => {
    return (
      <button onClick={onClick} type={type} id={id} className={clsx('btn', variant, size, className)}>
        {!isLoading && <span className="indicator-label">{children}</span>}
        {isLoading && (
          <span className="indicator-progress" style={{ display: 'block' }}>
            Please wait...
            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
