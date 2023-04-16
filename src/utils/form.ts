import { CARD_COMPANY_LIST, REGEX } from '@/constants';
import { CardInformationWithoutId } from '@/types';
import { MutableRefObject } from 'react';

export const renderTextDivider = ({
  formerValue,
  latterValue = '',
  divider = '-',
}: {
  formerValue: string;
  latterValue?: string;
  divider?: string;
}) => {
  return formerValue || latterValue ? divider : '';
};

export const checkRequiredValues = (data: CardInformationWithoutId) => {
  const REQUIRED_FORM_KEYS: (keyof CardInformationWithoutId)[] = [
    'cardNumber1',
    'cardNumber2',
    'cardNumber3',
    'cardNumber4',
    'year',
    'month',
    'password1',
    'password2',
    'cvc',
  ];

  return REQUIRED_FORM_KEYS.every(key => Boolean(data[key]));
};

export const expirationMonthFormatter = (month: string) => {
  const [num1, num2] = month.split('');
  if (num1 === undefined && parseInt(num1, 10) > 1) return '';
  if (num1 === '0' && num2 === '0') return num1;
  if (num1 === '1' && parseInt(num2, 10) > 2) return num1;

  return month.replace(REGEX.NOT_NUMBER, '');
};

export const textOnlyFormatter = (str: string) => {
  return str.replace(REGEX.NOT_NUMBER, '');
};

export const nextSiblingInputFocus = (ref: MutableRefObject<HTMLDivElement | null>, index = 0) => {
  return ref.current?.nextElementSibling?.querySelectorAll('input')[index]?.focus();
};

export const stringNumberToSum = (numbers: string) => {
  return numbers.split('').reduce((acc, cur) => (acc += Number(cur)), 0);
};

export const getTargetCardCompanyName = (cardNumberSum: number) => {
  const cardCompany = CARD_COMPANY_LIST.find(
    company => company.companyIdentification === (cardNumberSum % CARD_COMPANY_LIST.length) + 1,
  );

  return cardCompany?.companyName;
};

export const shuffle = (array: number[]) => {
  return array.sort(() => Math.random() - 0.5);
};
