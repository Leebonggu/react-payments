import { FormInputContainer, Input } from '@components/Common';

import type { InputProps } from '@components/Common/Input';

interface NameFieldProps extends InputProps {
  value?: string;
  transparent?: boolean;
}

function NameField({ title, placeholder, maxLength, value, name, kind, onChange }: NameFieldProps) {
  return (
    <FormInputContainer label={title || ''} latterCount={`${value?.length}/${maxLength}`} size="full" isValid>
      <Input
        name={name}
        kind={kind}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
    </FormInputContainer>
  );
}

export default NameField;
