interface Expiration {
  month: string;
  year: string;
}

interface CardNumber {
  cardNumber1: string;
  cardNumber2: string;
  cardNumber3: string;
  cardNumber4: string;
}

interface Password {
  password1: string;
  password2: string;
}

type CardInformation = Expiration &
  Password &
  CardNumber & {
    cvc: string;
    cardOwner?: string;
    nickname?: string;
    cardCompany?: string;
  };

export type { CardInformation, Expiration, CardNumber, Password };
