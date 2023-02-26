import { useNavigate } from 'react-router-dom';

import { CVCField, CardNumberField, ExpirationField, PasswordField, NameField } from '@components/Field';
import { Button } from '@components/Common';
import { checkRequiredValues, getUniqId } from '@/utils';
import { LIMIT_INPUT_LENGTH } from '@/constants';

import type { FormEvent } from 'react';
import { useCardForm, useCardFormHandler } from '@/context/CardFormContext';
import { useCardListHandler } from '@/context/CardListContext';

function AddCardForm() {
  const navigate = useNavigate();

  const { addCard } = useCardListHandler();

  const cardForm = useCardForm();
  const { onChange } = useCardFormHandler();

  const { cardNumber1, cardNumber2, cardNumber3, cardNumber4, year, month, password1, password2, cvc, cardOwner } =
    cardForm;

  const cardNumber = { cardNumber1, cardNumber2, cardNumber3, cardNumber4 };
  const expirationDate = {
    year,
    month,
  };
  const password = { password1, password2 };

  const isValid = checkRequiredValues({
    cardNumber1,
    cardNumber2,
    cardNumber3,
    cardNumber4,
    year,
    month,
    password1,
    password2,
    cvc,
    cardOwner,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = getUniqId();
    addCard({ ...cardForm, id });
    navigate(`/complete/${id}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <CardNumberField
        title="카드 번호"
        value={cardNumber}
        onChange={onChange}
        minLength={LIMIT_INPUT_LENGTH.CARD_NUMBER.MIN}
        maxLength={LIMIT_INPUT_LENGTH.CARD_NUMBER.MAX}
      />
      <ExpirationField
        title="만료일"
        maxLength={LIMIT_INPUT_LENGTH.EXPIRATION}
        value={expirationDate}
        onChange={onChange}
      />
      <NameField
        title="카드 소유자 이름(선택)"
        placeholder="카드에 표시된 이름과 동일하게 입력하세요"
        maxLength={LIMIT_INPUT_LENGTH.OWNER_NAME}
        name="cardOwner"
        value={cardOwner}
        onChange={onChange}
      />
      <CVCField title="보안코드(CVC/CCV)" maxLength={3} name="cvc" type="password" value={cvc} onChange={onChange} />
      <PasswordField title="비밀번호" value={password} onChange={onChange} />
      <div className="button-box">
        <Button type="submit" className="button-text" disabled={!isValid}>
          <span>다음</span>
        </Button>
      </div>
    </form>
  );
}

export default AddCardForm;
