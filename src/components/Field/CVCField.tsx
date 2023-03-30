import { FormInputContainer, Input } from '../Common';

import { ChangeEvent, HTMLInputTypeAttribute, useRef, useState } from 'react';
import { useCardForm } from '@/context/CardFormContext';
import { LIMIT_INPUT_LENGTH, REGEX, VALIDATOR_MESSAGE } from '@/constants';
import { nextSiblingInputFocus } from '@/utils';

type CVCFieldProps = {
  title: string;
  placeholder?: string;
  maxLength?: number;
  name: string;
  type?: HTMLInputTypeAttribute;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function CVCField({ title, placeholder, maxLength, name, type = 'text', onChange }: CVCFieldProps) {
  const { cvc } = useCardForm();
  const [validator, setValidator] = useState({
    isValid: false,
    errorMessage: '',
  });

  const fieldRef = useRef<HTMLDivElement | null>(null);

  const onChangeInterceptor = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < LIMIT_INPUT_LENGTH.CVC) {
      setValidator({
        isValid: false,
        errorMessage: VALIDATOR_MESSAGE.CVC,
      });
    } else {
      setValidator({
        isValid: true,
        errorMessage: '',
      });
      nextSiblingInputFocus(fieldRef, 0);
    }
    onChange(e);
  };

  return (
    <FormInputContainer
      ref={fieldRef}
      label={title}
      isValid={validator.isValid}
      errorMessage={validator.errorMessage}
      size="quarter"
    >
      <Input
        type={type}
        name={name}
        pattern={REGEX.HTML_PATTERN.ONLY_NUMBER}
        value={cvc}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={onChangeInterceptor}
        error={!validator.isValid}
      />
    </FormInputContainer>
  );
}

export default CVCField;
