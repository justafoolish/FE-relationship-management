import DIALOG_WIZARDS from 'app/domains/dialog/dialog.e';
import { closeDialogAction } from 'app/reducers/dialog/dialog.slice';
import { useAppSelector } from 'app/reducers/store.hook';
import { FC, useMemo } from 'react';
import { Modal, Offcanvas } from 'react-bootstrap';
import { useAppDispatch } from '../../reducers/store.hook';

const Temp: FC = () => {
  return (
    <>
      Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images,
      lists, etc.
    </>
  );
};
const ListCustomDialog = {
  [DIALOG_WIZARDS.TEST]: Temp,
};

const ListCustomDialogTitle = {
  [DIALOG_WIZARDS.TEST]: 'Test',
};

const DialogComponentType = {
  drawer: Offcanvas,
  modal: Modal,
};

const CustomDialog: FC = () => {
  const { dialogWizard, visible, options } = useAppSelector((state) => state.dialog);
  const dispatch = useAppDispatch();

  const { type = 'drawer', className, placement, modalSize } = options;

  const DialogComponent = useMemo(() => DialogComponentType[type], [type]);
  const DialogBodyComponent: FC<any> = useMemo(() => ListCustomDialog[dialogWizard], [dialogWizard]);
  const title = useMemo(() => ListCustomDialogTitle[dialogWizard], [dialogWizard]);

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

  return (
    <DialogComponent
      {...customProps}
      show={visible}
      size={modalSize}
      onHide={() => dispatch(closeDialogAction())}>
      <DialogComponent.Header closeButton>
        <DialogComponent.Title>{title}</DialogComponent.Title>
      </DialogComponent.Header>
      <DialogComponent.Body>
        <DialogBodyComponent />
      </DialogComponent.Body>
    </DialogComponent>
  );
};

export default CustomDialog;
