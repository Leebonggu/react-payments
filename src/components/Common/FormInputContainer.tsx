import { cls } from '@/utils';
import { PropsWithChildren, ReactNode, forwardRef } from 'react';

type Size = 'full' | 'half' | 'third' | 'quarter';

interface FormInputContainerProps {
  label: string;
  latterCount?: string;
  errorMessage?: string;
  isValid: boolean;
  size?: Size;
  addOn?: ReactNode;
}

const inputWidthMap: Record<Size, string> = {
  full: 'w-full',
  half: 'w-1/2',
  third: 'w-1/3',
  quarter: 'w-1/4',
};

const FormInputContainer = forwardRef<HTMLDivElement, PropsWithChildren<FormInputContainerProps>>(
  ({ children, label, latterCount, errorMessage, isValid, size = 'full', addOn }, ref) => {
    const inputWidth = inputWidthMap[size] || 'w-full';
    return (
      <div ref={ref} className="flex flex-col">
        <div className="px-1 flex justify-between text-sm text-gray-400">
          <span className="text-sm text-gray-400">{label}</span>
          {latterCount ? <span>{latterCount}</span> : null}
        </div>
        <div className={cls(inputWidth, 'p-1 rounded-md flex items-center')}>
          {children}
          <div className="w-10">{addOn ? addOn : null}</div>
        </div>
        <div>{!isValid && errorMessage ? <span className="text-xs text-red-400">{errorMessage}</span> : null}</div>
      </div>
    );
  },
);

export default FormInputContainer;
