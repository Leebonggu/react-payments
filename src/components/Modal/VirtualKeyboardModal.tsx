import { shuffle } from '../../utils';
import { useModalContext } from '@/context/ModalContext';

const CARD_NUMBER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function VirtualKeyboardModal() {
  const { modalProps } = useModalContext();
  const onClick = () => console.log;

  return (
    <div className="absolute bottom-0 w-full h-72 bg-white rounded-t-2xl p-4">
      <div className="h-full flex justify-between flex-wrap items-center">
        {shuffle(CARD_NUMBER).map(number => (
          <button key={number} value={number}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VirtualKeyboardModal;
