import { LIMIT_INPUT_LENGTH } from '@/constants';
import { useEffect, useRef } from 'react';

function useCardNumberFieldRef() {
  const cardNumber1Ref = useRef<HTMLInputElement | null>(null);
  const cardNumber2Ref = useRef<HTMLInputElement | null>(null);
  const cardNumber3Ref = useRef<HTMLInputElement | null>(null);
  const cardNumber4Ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (cardNumber1Ref.current?.value.length === LIMIT_INPUT_LENGTH.CARD_NUMBER.MAX) {
      if (cardNumber2Ref.current?.value.length === LIMIT_INPUT_LENGTH.CARD_NUMBER.MAX) {
        cardNumber3Ref.current?.focus();
        return;
      }
      cardNumber2Ref.current?.focus();
    }
  }, [cardNumber1Ref.current?.value]);

  useEffect(() => {
    if (cardNumber2Ref.current?.value.length === LIMIT_INPUT_LENGTH.CARD_NUMBER.MAX) {
      if (cardNumber3Ref.current?.value.length === LIMIT_INPUT_LENGTH.CARD_NUMBER.MAX) {
        cardNumber4Ref.current?.focus();
        return;
      }
      cardNumber3Ref.current?.focus();
    }
  }, [cardNumber2Ref.current?.value]);

  useEffect(() => {
    if (cardNumber3Ref.current?.value.length === LIMIT_INPUT_LENGTH.CARD_NUMBER.MAX) {
      cardNumber4Ref.current?.focus();
    }
  }, [cardNumber3Ref.current?.value]);

  return {
    cardNumber1Ref,
    cardNumber2Ref,
    cardNumber3Ref,
    cardNumber4Ref,
  };
}

export default useCardNumberFieldRef;
