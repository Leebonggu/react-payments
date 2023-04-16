import { FormInputContainer, Input } from '../Common';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { LIMIT_INPUT_LENGTH, REGEX, VALIDATOR_MESSAGE } from '@/constants';
import { useCardForm } from '@/context/CardFormContext';

type PasswordFieldProps = {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function PasswordField({ title, onChange }: PasswordFieldProps) {
  const { password1, password2 } = useCardForm();
  const [validator, setValidator] = useState({
    isValid: false,
    errorMessage: '',
  });

  const password2Ref = useRef<HTMLInputElement | null>(null);

  const onChangeInterceptor = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < LIMIT_INPUT_LENGTH.PASSWORD) {
      setValidator({
        isValid: false,
        errorMessage: VALIDATOR_MESSAGE.PASSWORD,
      });
    } else {
      setValidator({
        isValid: true,
        errorMessage: '',
      });
    }
    onChange(e);
  };

  useEffect(() => {
    if (password1.length === LIMIT_INPUT_LENGTH.PASSWORD) {
      password2Ref.current?.focus();
    }
  }, [password1]);

  return (
    <FormInputContainer
      label={title || ''}
      size="half"
      isValid={validator.isValid}
      errorMessage={validator.errorMessage}
    >
      <div className="flex">
        <Input
          type="password"
          name="password1"
          pattern={REGEX.HTML_PATTERN.ONLY_NUMBER}
          maxLength={LIMIT_INPUT_LENGTH.PASSWORD}
          value={password1}
          onChange={onChangeInterceptor}
          onFocus={onChangeInterceptor}
          error={!password1 && !validator.isValid}
        />
        <Input
          type="password"
          ref={password2Ref}
          name="password2"
          pattern={REGEX.HTML_PATTERN.ONLY_NUMBER}
          maxLength={LIMIT_INPUT_LENGTH.PASSWORD}
          value={password2}
          onChange={onChangeInterceptor}
          onFocus={onChangeInterceptor}
          error={!password2 && !validator.isValid}
        />
        <Input type="password" pattern={REGEX.HTML_PATTERN.ONLY_NUMBER} value="*" disabled />
        <Input type="password" pattern={REGEX.HTML_PATTERN.ONLY_NUMBER} value="*" disabled />
      </div>
    </FormInputContainer>
  );
}

export default PasswordField;
