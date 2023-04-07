import { FC, useEffect } from 'react';
import { toast, ToastBar, Toaster, ToastType, useToasterStore } from 'react-hot-toast';
import { CheckCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

const CustomToast: FC = () => {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= 3) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  const getCXToastBar = (type: ToastType) => {
    switch (type) {
      case 'success':
        return '#18A84C';
      case 'error':
        return '#EE4730';
      case 'custom':
      default:
        return '#2985F4';
    }
  };

  const getCXToast = (type: ToastType) =>
    clsx('text-white font-medium', {
      'bg-semantic/success': type === 'success',
      'bg-semantic/error': type === 'error',
      'bg-semantic/informative': type === 'custom',
    });

  const iconStyle = {
    with: '1.5rem',
    height: '1.5rem',
    color: 'white',
  };
  return (
    <Toaster
      containerStyle={{ marginTop: '3rem' }}
      gutter={10}
      position="top-right"
      toastOptions={{
        duration: 2000,
        success: {
          className: getCXToast('success'),
          icon: <CheckCircleIcon style={iconStyle} />,
        },
        error: {
          className: getCXToast('error'),
          icon: <XCircleIcon style={iconStyle} />,
        },
        custom: {
          className: getCXToast('custom'),
          icon: <InformationCircleIcon style={iconStyle} />,
        },
      }}>
      {(t) =>
        (t.visible && (
          <div className="toast-animation">
            <ToastBar
              toast={t}
              style={{
                animation: 'none',
                borderRadius: '4px',
                background: getCXToastBar(t.type),
                color: '#FCFCFD',
              }}
            />
          </div>
        )) || <></>
      }
    </Toaster>
  );
};

export default CustomToast;
