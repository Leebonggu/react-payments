import { BaseSyntheticEvent, MutableRefObject, useEffect } from 'react';

function useOutsideClick<T extends HTMLElement | null>(ref: MutableRefObject<T>, callback: () => void) {
  useEffect(() => {
    const handleClick = (event: BaseSyntheticEvent | MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback, ref]);

  return null;
}

export default useOutsideClick;
