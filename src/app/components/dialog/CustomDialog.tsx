import { closeDialogAction } from 'app/reducers/dialog/dialog.slice';
import { useAppDispatch, useAppSelector } from 'app/reducers/store.hook';
import { FC, Fragment, useCallback, useMemo } from 'react';
import { Modal, Offcanvas } from 'react-bootstrap';
import { ListCustomDialog, ListCustomDialogTitle } from './dialog';

const DialogComponentType = {
  drawer: Offcanvas,
  modal: Modal,
};

export interface IDialogBody {
  closeModal: () => void;
  callback: () => void;
  formData?: any;
}

const CustomDialog: FC = () => {
  const { dialogWizard, visible, options, callback } = useAppSelector((state) => state.dialog);
  const dispatch = useAppDispatch();

  const { type = 'drawer', className, placement, modalSize, formData } = options;

  const DialogComponent = useMemo(() => DialogComponentType[type], [type]);
  const DialogBodyComponent: FC<IDialogBody & any> = useMemo(
    () => (dialogWizard ? ListCustomDialog[dialogWizard] : Fragment),
    [dialogWizard]
  );
  const title = useMemo(
    () => (dialogWizard ? ListCustomDialogTitle[dialogWizard] : 'Form Title'),
    [dialogWizard]
  );

  const customProps = useMemo(() => {
    if (type === 'drawer')
      return {
        className,
        placement,
      };
    if (type === 'modal')
      return {
        size: modalSize,
        centered: true,
        contentClassName: className,
      };

    return {};
  }, [className, modalSize, placement, type]);

  const closeModal = useCallback(() => {
    dispatch(closeDialogAction());
  }, []);

  const bodyProps = useMemo(
    () => ({
      closeModal,
      callback,
      formData,
    }),
    [callback, closeModal, formData]
  );

  return (
    <DialogComponent {...customProps} show={visible} size={modalSize} onHide={closeModal}>
      <DialogComponent.Header closeButton className="border-bottom">
        <DialogComponent.Title>{title}</DialogComponent.Title>
      </DialogComponent.Header>
      <DialogComponent.Body>
        <DialogBodyComponent {...bodyProps} />
      </DialogComponent.Body>
    </DialogComponent>
  );
};

export default CustomDialog;
