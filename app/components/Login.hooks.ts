import { checkEmail } from '@/types/interfaces';
import { EMAIL_MAX_LENGTH } from '@/utils/constants';
import React, { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useInputs = () => {
  const [load, setLoad] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailDisabled, setEmailDisabled] = useState<boolean>(false);
  const [emailSuccess, setEmailSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    if (value.length < EMAIL_MAX_LENGTH) {
      const check = checkEmail(value);
      setEmailSuccess(check);
      if (emailError) {
        setEmailError(!check);
      }
      setEmail(value);
    }
  };

  const onBlurEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (email) {
      setEmailError(!checkEmail(email));
    } else {
      setEmailError(false);
    }
  };

  return { onChangeEmail, onBlurEmail, email, emailDisabled, emailError, emailSuccess, load };
};