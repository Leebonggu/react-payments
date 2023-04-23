import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

function ModalPortal({ children }: PropsWithChildren) {
  const el =
    (document.getElementById('modal') as HTMLElement) || document.createElement('div').setAttribute('id', 'modal');

  return createPortal(children, el);
}

export default ModalPortal;
