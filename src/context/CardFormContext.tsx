import { CardInformation } from '@/types';
import { ChangeEvent, PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

type FormHandler = {
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onReset(): void;
  updateCardForm(cardForm: Partial<CardInformation>): void;
};

const CardFormContext = createContext<CardInformation | null>(null);
const CardFormHandlerContext = createContext<FormHandler | null>(null);

function useCardForm() {
  const value = useContext(CardFormContext);
  if (!value) {
    throw new Error('useCardForm는 CardFormProvider에서 사용해야합니다.');
  }

  return value;
}

function useCardFormHandler() {
  const value = useContext(CardFormHandlerContext);
  if (!value) {
    throw new Error('useCardFormHandler CardFormProvider에서 사용해야합니다.');
  }
  return value;
}

const initCardInformation: CardInformation = {
  id: '',
  cardNumber1: '',
  cardNumber2: '',
  cardNumber3: '',
  cardNumber4: '',
  year: '',
  month: '',
  cvc: '',
  password1: '',
  password2: '',
  cardOwner: '',
  nickname: '',
  cardCompany: '',
};

function CardFormProvider({ children }: PropsWithChildren) {
  const [cardForm, setCardForm] = useState<CardInformation>(initCardInformation);

  const dispatch = useMemo(
    () => ({
      onChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value, validity } = e.target;
        if (!validity.valid) return;

        setCardForm(prev => ({ ...prev, [name]: value }));
      },
      updateCardForm: (updatedForm: Partial<CardInformation>) => {
        setCardForm(prev => ({ ...prev, ...updatedForm }));
      },
      onReset() {
        setCardForm(initCardInformation);
      },
    }),
    [],
  );

  const memoizedCardForm = useMemo(() => cardForm, [cardForm]);

  return (
    <CardFormHandlerContext.Provider value={dispatch}>
      <CardFormContext.Provider value={memoizedCardForm}>{children}</CardFormContext.Provider>
    </CardFormHandlerContext.Provider>
  );
}

export { CardFormContext, CardFormProvider, useCardForm, useCardFormHandler };
