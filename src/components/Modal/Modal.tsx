import type { PropsWithChildren } from 'react';
import CardCompanySelectModal from './CardCompanySelectModal';
import VirtualKeyboardModal from './VirtualKeyboardModal';
import { ModalType } from '@/types';

interface Props {
  onClose(): void;
  modalType: ModalType | null;
}

const modalMap: Record<string, () => JSX.Element> = {
  cardCompanySelectModal: CardCompanySelectModal,
  virtualCardKeyboard: VirtualKeyboardModal,
};

function ModalBody({ children }: PropsWithChildren) {
  return <div className="bg-black/50 w-96 min-w-[384px] h-[700px] relative backdrop-brightness-110">{children}</div>;
}

function Modal({ onClose, modalType }: PropsWithChildren<Props>) {
  const ModalContent = modalMap[modalType ?? ''] ?? null;

  return (
    <div
      onClick={onClose}
      className="fixed w-screen h-screen top-0 left-0 right-0 flex flex-col justify-center items-center"
    >
      <ModalBody>
        <ModalContent />
      </ModalBody>
    </div>
  );
}

export default Modal;
