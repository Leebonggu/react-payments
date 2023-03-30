import { cls } from '@/utils';
import { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react';

const widthToClassNameMap = {
  xs: 'w-15',
  sm: 'w-25',
  md: 'w-50',
  lg: 'w-75',
  xl: 'w-100',
  full: 'w-full',
};

export type Width = keyof typeof widthToClassNameMap;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  kind?: 'basic' | 'underline';
  width?: Width;
  border?: boolean;
  error?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ kind = 'basic', width = 'full', onChange, disabled, error, ...props }, ref) => {
    const widthSize = widthToClassNameMap[width];

    return (
      <input
        {...props}
        ref={ref}
        onChange={onChange}
        disabled={disabled}
        className={cls(
          'h-8 outline-none  bg-transparent',
          'flex items-center justify-center text-center',
          'mx-1',
          widthSize,
          kind === 'underline' ? 'border-b-2 border-gray-200' : '',
          'placeholder:text-sm',
          'border-2 border-gray-200 rounded-md',
          error
            ? 'focus:border-red-100 focus:bg-red-200 focus:border-2 focus:border-solid focus:rounded'
            : 'focus:border-blue-100 focus:bg-blue-100 focus:border-2 focus:border-solid focus:rounded',
          !error ? 'border-[1px] border-blue-300' : '',
        )}
      />
    );
  },
);

export default Input;
