import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Input } from '@components/Common';
import { getTargetCardCompanyName, nextSiblingInputFocus, renderTextDivider, stringNumberToSum } from '@/utils';
import { LIMIT_INPUT_LENGTH, REGEX, VALIDATOR_MESSAGE } from '@/constants';
import { useCardForm } from '@/context/CardFormContext';
import FormInputContainer from '../Common/FormInputContainer';
import { CardInformation } from '@/types';
import { useModalContext } from '@/context/ModalContext';
import useCardNumberFieldRef from './hooks/useCardNumberFieldRef';

type CardNumberFieldProps = {
  title: string;
  minLength: number;
  maxLength: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateForm: (cardForm: Partial<CardInformation>) => void;
};

function CardNumberField({ title, minLength = 0, maxLength = 4, onChange, updateForm }: CardNumberFieldProps) {
  const { cardNumber1, cardNumber2, cardNumber3, cardNumber4 } = useCardForm();
  const { openModal, closeModal } = useModalContext();

  const [validator, setValidator] = useState({
    isValid: false,
    errorMessage: '',
  });

  const onFocus = () => {
    console.log('why focus');
    console.log('here?');
    openModal('virtualCardKeyboard', {
      a: 1,
    });
  };

  const fieldRef = useRef<HTMLDivElement | null>(null);
  const { cardNumber1Ref, cardNumber2Ref, cardNumber3Ref, cardNumber4Ref } = useCardNumberFieldRef();

  const onChangeInterceptor = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      cardNumber1Ref.current?.value.length === LIMIT_INPUT_LENGTH.CARD_NUMBER.MAX &&
      cardNumber2Ref.current?.value.length === LIMIT_INPUT_LENGTH.CARD_NUMBER.MAX
    ) {
      const cardNumberSum = stringNumberToSum(`${cardNumber1Ref.current?.value}${cardNumber2Ref.current?.value}`);
      const targetCompany = getTargetCardCompanyName(cardNumberSum);

      updateForm({ cardCompany: targetCompany });
    } else {
      updateForm({ cardCompany: '' });
    }

    const allCardNumber =
      (cardNumber1Ref.current?.value || '') +
      cardNumber2Ref.current?.value +
      cardNumber3Ref.current?.value +
      cardNumber4Ref.current?.value;

    if (allCardNumber.length < LIMIT_INPUT_LENGTH.CARD_NUMBER.TOTAL) {
      setValidator({
        isValid: false,
        errorMessage: VALIDATOR_MESSAGE.CARD_NUMBER,
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
    if (validator.isValid) {
      nextSiblingInputFocus(fieldRef, 0, closeModal);
    }
  }, [validator.isValid]);

  return (
    <FormInputContainer ref={fieldRef} label={title} isValid={validator.isValid} errorMessage={validator.errorMessage}>
      <div className="flex items-center">
        <Input
          ref={cardNumber1Ref}
          type="text"
          minLength={minLength}
          maxLength={maxLength}
          pattern={REGEX.HTML_PATTERN.ONLY_NUMBER}
          value={cardNumber1}
          name="cardNumber1"
          onChange={onChangeInterceptor}
          autoComplete="off"
          error={!validator.isValid}
        />
        {renderTextDivider({ formerValue: cardNumber1, latterValue: cardNumber2, divider: '-' })}
        <Input
          ref={cardNumber2Ref}
          type="text"
          minLength={0}
          maxLength={4}
          pattern={REGEX.HTML_PATTERN.ONLY_NUMBER}
          value={cardNumber2}
          name="cardNumber2"
          onChange={onChangeInterceptor}
          autoComplete="off"
          error={!validator.isValid}
        />
        {renderTextDivider({ formerValue: cardNumber2, latterValue: cardNumber3, divider: '-' })}
        <Input
          ref={cardNumber3Ref}
          type="password"
          minLength={0}
          maxLength={4}
          pattern={REGEX.HTML_PATTERN.ONLY_NUMBER}
          value={cardNumber3}
          name="cardNumber3"
          onChange={onChangeInterceptor}
          onFocus={onFocus}
          autoComplete="none"
          error={!validator.isValid}
        />
        {renderTextDivider({ formerValue: cardNumber3, latterValue: cardNumber4, divider: '-' })}
        <Input
          ref={cardNumber4Ref}
          type="password"
          minLength={0}
          maxLength={4}
          pattern={REGEX.HTML_PATTERN.ONLY_NUMBER}
          value={cardNumber4}
          name="cardNumber4"
          onChange={onChangeInterceptor}
          onFocus={onFocus}
          autoComplete="none"
          error={!validator.isValid}
        />
      </div>
    </FormInputContainer>
  );
}

export default CardNumberField;
