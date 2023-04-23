import { useNavigate } from 'react-router-dom';

import { CVCField, CardNumberField, ExpirationField, PasswordField, NameField } from '@components/Field';
import { Button } from '@components/Common';
import { LIMIT_INPUT_LENGTH } from '@/constants';

import type { FormEvent } from 'react';
import { useCardForm, useCardFormHandler } from '@/context/CardFormContext';
// import { useCardFormValidator } from '@/context/CardFormValidator';

function AddCardForm() {
  const navigate = useNavigate();

  const cardForm = useCardForm();
  const { onChange, updateCardForm } = useCardFormHandler();
  // const { isAllValid } = useCardFormValidator();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const id = crypto.randomUUID();
    navigate(`/complete/${id}`, { state: { cardForm } });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col nowrap gap-1">
      <CardNumberField
        title="카드 번호"
        onChange={onChange}
        updateForm={updateCardForm}
        minLength={LIMIT_INPUT_LENGTH.CARD_NUMBER.MIN}
        maxLength={LIMIT_INPUT_LENGTH.CARD_NUMBER.MAX}
      />
      <ExpirationField title="만료일" maxLength={LIMIT_INPUT_LENGTH.EXPIRATION} onChange={onChange} />
      <NameField
        title="카드 소유자 이름(선택)"
        placeholder="카드에 표시된 이름과 동일하게 입력하세요"
        maxLength={LIMIT_INPUT_LENGTH.OWNER_NAME}
        name="cardOwner"
        value={cardForm.cardOwner}
        onChange={onChange}
      />
      <CVCField title="보안코드(CVC/CCV)" maxLength={3} name="cvc" type="password" onChange={onChange} />
      <PasswordField title="비밀번호" onChange={onChange} />
      <div className="w-full flex justify-end">
        <div className="w-20 absolute bottom-2 right-2">
          <Button type="submit" disabled={false} kind="primary">
            다음
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddCardForm;
