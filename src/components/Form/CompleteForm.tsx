import { LIMIT_INPUT_LENGTH } from '@/constants';
import { Button } from '../Common';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';
import { useCardListHandler } from '@/context/CardListContext';
import { useCardForm, useCardFormHandler } from '@/context/CardFormContext';
import { NameField } from '../Field';
import { useLocationState } from '@/pages/Complete/hooks';
import { CardInformation } from '@/types';

function CompleteForm() {
  const navigate = useNavigate();

  const { cardForm, isEditMode, id } = useLocationState<{ cardForm: CardInformation; isEditMode: boolean }>();

  const { nickname } = useCardForm();
  const { onChange, onReset, updateCardForm } = useCardFormHandler();

  const { updateCard, deleteCard } = useCardListHandler();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateCard(id as string, { nickname: nickname || cardForm.cardCompany });

    onReset();
    navigate('/');
  };

  useEffect(() => {
    updateCardForm({ ...cardForm });
  }, [cardForm]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
      <div className="h-full flex-1 flex flex-col pt-4">
        <NameField
          kind="underline"
          title="카드별칭"
          placeholder="카드에 표시된 이름과 동일하게 입력하세요"
          maxLength={LIMIT_INPUT_LENGTH.NICKNAME}
          name="nickname"
          value={nickname || cardForm.cardCompany}
          onChange={onChange}
        />
      </div>
      <div className="absolute bottom-2 right-2 flex gap-2">
        {isEditMode && (
          <div className="w-20">
            <Button type="submit" kind="danger" onClick={() => deleteCard(id as string)}>
              삭제
            </Button>
          </div>
        )}
        <div className="w-20 ">
          <Button type="submit" kind="primary">
            다음
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CompleteForm;
