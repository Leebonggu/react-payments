import { FormInputContainer, Input } from '@components/Common';
import { nextSiblingInputFocus, renderTextDivider } from '@/utils';

import { ChangeEvent, HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react';
import { useCardForm } from '@/context/CardFormContext';
import { LIMIT_INPUT_LENGTH, REGEX, VALIDATOR_MESSAGE } from '@/constants';

type ExpirationFieldProps = {
  title: string;
  maxLength?: number;

  type?: HTMLInputTypeAttribute;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function ExpirationField({ title, maxLength, type = 'text', onChange }: ExpirationFieldProps) {
  const { month, year } = useCardForm();
  const [monthValidator, setMonthValidator] = useState({
    isValid: false,
    errorMessage: '',
  });
  const [yearValidator, setYearValidator] = useState({
    isValid: false,
    errorMessage: '',
  });

  const monthRef = useRef<HTMLInputElement | null>(null);
  const yearRef = useRef<HTMLInputElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (year && month && monthValidator.isValid && yearValidator.isValid) {
      nextSiblingInputFocus(fieldRef, 0);
    }
  }, [year]);

  useEffect(() => {
    if (monthRef.current && monthValidator.isValid) {
      yearRef.current?.focus();
    }
  }, [month]);

  const onChangeInterceptor = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const monthValidator = (value: string) => {
      if (value.length < LIMIT_INPUT_LENGTH.EXPIRATION) {
        return {
          isValid: false,
          errorMessage: VALIDATOR_MESSAGE.EXPIRATION.LENGTH,
        };
      }
      if (Number(value) <= 0 || Number(value) > 12) {
        return {
          isValid: false,
          errorMessage: VALIDATOR_MESSAGE.EXPIRATION.MONTH_RANGE,
        };
      }
      return {
        isValid: true,
        errorMessage: '',
      };
    };

    const yearValidator = (value: string) => {
      if (value.length < LIMIT_INPUT_LENGTH.EXPIRATION) {
        return {
          isValid: false,
          errorMessage: VALIDATOR_MESSAGE.EXPIRATION.LENGTH,
        };
      }

      return {
        isValid: true,
        errorMessage: '',
      };
    };

    const validatorFunc = name === 'month' ? monthValidator : yearValidator;
    const validator = validatorFunc(value);
    const setState = name === 'month' ? setMonthValidator : setYearValidator;

    setState(validator);
    onChange(e);
  };

  return (
    <FormInputContainer
      ref={fieldRef}
      label={title}
      isValid={monthValidator.isValid && yearValidator.isValid}
      errorMessage={monthValidator.errorMessage || yearValidator.errorMessage}
      size="half"
    >
      <div className="flex items-center">
        <Input
          ref={monthRef}
          type={type}
          name="month"
          placeholder="MM"
          pattern={REGEX.HTML_PATTERN.ONLY_NUMBER}
          maxLength={maxLength}
          value={month}
          onChange={onChangeInterceptor}
          onFocus={onChange}
          error={!monthValidator.isValid}
        />
        {renderTextDivider({ formerValue: month, divider: '/' })}
        <Input
          ref={yearRef}
          type={type}
          name="year"
          placeholder="YY"
          pattern={REGEX.HTML_PATTERN.ONLY_NUMBER}
          maxLength={maxLength}
          value={year}
          onChange={onChangeInterceptor}
          onFocus={onChange}
          error={!yearValidator.isValid}
        />
      </div>
    </FormInputContainer>
  );
}

export default ExpirationField;
