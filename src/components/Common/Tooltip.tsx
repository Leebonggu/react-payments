import { cls } from '@/utils';
import { useState } from 'react';

interface TooltipProps {
  message: string;
}
function Tooltip({ message }: TooltipProps) {
  const [toggle, setToggle] = useState(false);

  const onClick = () => setToggle(prev => !prev);

  const onMouseLeave = () => setToggle(false);

  return (
    <div
      onClick={onClick}
      onMouseLeave={onMouseLeave}
      className={cls(
        'w-8 h-8  rounded-full flex justify-center items-center border-[1px] border-gray-300 text-gray-400 bg-white text-sm',
        'hover:border-gray-200',
        'relative',
      )}
    >
      <span>?</span>
      {toggle ? (
        <div
          className={cls(
            'absolute left-9 w-32 p-2 flex items-center  bg-white border-[1px] border-gray-300 rounded-lg',
            'text-xs break-all',
          )}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}

export default Tooltip;
