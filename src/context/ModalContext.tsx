import { ModalType } from '@/types';
import { createContext, useContext, useState, useMemo } from 'react';
import type { PropsWithChildren } from 'react';

interface ModalProps {
  [x: string]: any;
}

const ModalContext = createContext<{
  open: boolean;
  modalType: ModalType | null;
  openModal: (modalType: ModalType, props?: ModalProps) => void;
  modalProps: ModalProps | null;
  closeModal: () => void;
} | null>(null);

const useModalContext = () => {
  const value = useContext(ModalContext);

  if (!value) {
    throw new Error('');
  }

  return value;
};

function ModalProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const dispatch = useMemo(
    () => ({
      openModal: (modalType: ModalType, props?: ModalProps) => {
        setOpen(true);
        setModalType(modalType);
        if (props) {
          setModalProps(props);
        }
      },
      closeModal: () => {
        setOpen(false);
        setModalType(null);
      },
    }),
    [],
  );

  return <ModalContext.Provider value={{ open, modalType, modalProps, ...dispatch }}>{children}</ModalContext.Provider>;
}

export { ModalProvider, useModalContext };
