import ModalPortal from './ModalPortal';
import Modal from './Modal';
import { useModalContext } from '@/context/ModalContext';

function ModalContainer() {
  const { open } = useModalContext();

  return open ? <ModalPortal>{<Modal />}</ModalPortal> : null;
}

export default ModalContainer;
