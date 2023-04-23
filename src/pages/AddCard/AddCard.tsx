import { Card, ErrorMessage } from '@/components/Common';
import AddCardForm from '@/components/Form/AddCardForm';
import Layout from '@/components/Layout';
import { HEADER_TITLE } from '@/constants';
import { useCardForm } from '@/context/CardFormContext';
import { useCardFormValidator } from '@/context/CardFormValidator';
import { useModalContext } from '@/context/ModalContext';
import { cls } from '@/utils';
import { useEffect, useRef, useState } from 'react';

function AddCard() {
  const { cardNumber1, cardNumber2, cardNumber3, cardNumber4, year, month, cardOwner, cardCompany } = useCardForm();
  const { isValidCardCompanyForm } = useCardFormValidator();

  const [validator, setValidator] = useState({
    isValid: false,
    errorMessage: '',
  });
  const { openModal } = useModalContext();

  const handleCompanyName = () => {
    openModal('cardCompanySelectModal');
  };

  useEffect(() => {
    openModal('cardCompanySelectModal');
  }, []);

  return (
    <Layout headerTitle={HEADER_TITLE.ADD_CARD} goBack="/">
      <div className={cls('mx-auto justify-center text-xs cursor-pointer')}>
        <div>
          <Card
            onClick={handleCompanyName}
            cardCompany={cardCompany}
            cardOwner={cardOwner}
            cardNumber={{
              cardNumber1,
              cardNumber2,
              cardNumber3,
              cardNumber4,
            }}
            expiration={{
              year,
              month,
            }}
          />
        </div>
        <div className="flex items-center justify-center py-1">
          {!isValidCardCompanyForm.isValid ? <ErrorMessage msg={isValidCardCompanyForm.msg || '1111'} /> : null}
        </div>
      </div>
      <AddCardForm />
    </Layout>
  );
}

export default AddCard;
