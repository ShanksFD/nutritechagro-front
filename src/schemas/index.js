import * as yup from 'yup';
import { disposableEmailDomains } from '../data/disposableEmailDomains';

export const MAX_EMAIL_LENGTH = 100;
export const MAX_MESSAGE_LENGTH = 500;
export const MAX_PHONE_LENGTH = 32;
export const MAX_FULLNAME_LENGTH = 100;
const fullNamePattern =
  /^[a-zA-ZÀ-ÿ\u00C0-\u00FF]+(?: [a-zA-ZÀ-ÿ\u00C0-\u00FF]+)*$/;

export const newsletterSchema = (t) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t('VALIDATION.EMAIL_INVALID'))
      .required(t('VALIDATION.EMAIL_REQUIRED'))
      .max(
        MAX_EMAIL_LENGTH,
        t('VALIDATION.MAX_LENGTH', { max: MAX_EMAIL_LENGTH })
      ),
    recaptcha: yup.string().required(t('VALIDATION.RECAPTCHA_REQUIRED')),
  });
};

export const contactSchema = (t) => {
  return yup.object().shape({
    fullName: yup
      .string()
      .required(t('VALIDATION.FULLNAME_REQUIRED'))
      .max(
        MAX_FULLNAME_LENGTH,
        t('VALIDATION.MAX_LENGTH', { max: MAX_FULLNAME_LENGTH })
      )
      .matches(fullNamePattern, t('VALIDATION.FULLNAME_INVALID')),
    email: yup
      .string()
      .email(t('VALIDATION.EMAIL_INVALID'))
      .required(t('VALIDATION.EMAIL_REQUIRED'))
      .max(
        MAX_EMAIL_LENGTH,
        t('VALIDATION.MAX_LENGTH', { max: MAX_EMAIL_LENGTH })
      ),
    message: yup
      .string()
      .required(t('VALIDATION.MESSAGE_REQUIRED'))
      .max(
        MAX_MESSAGE_LENGTH,
        t('VALIDATION.MAX_LENGTH', { max: MAX_MESSAGE_LENGTH })
      ),
    phone: yup
      .string()
      .notRequired()
      .max(
        MAX_PHONE_LENGTH,
        t('VALIDATION.MAX_LENGTH', { max: MAX_PHONE_LENGTH })
      ),
    recaptcha: yup.string().required(t('VALIDATION.RECAPTCHA_REQUIRED')),
  });
};

export const freeTrialSchema = (t) => {
  const fakeEmailPattern = new RegExp(
    `@(${[...disposableEmailDomains].join('|')})$`,
    'i'
  );
  const phoneNumberPattern = /^\+\d{1,3}[-. (]?\d{3}[-. )]?\d{3}[-. ]?\d{4}$/;

  return yup.object().shape({
    fullName: yup
      .string()
      .required(t('VALIDATION.FULLNAME_REQUIRED'))
      .max(
        MAX_FULLNAME_LENGTH,
        t('VALIDATION.MAX_LENGTH', { max: MAX_FULLNAME_LENGTH })
      )
      .matches(fullNamePattern, t('VALIDATION.FULLNAME_INVALID')),
    email: yup
      .string()
      .email(t('VALIDATION.EMAIL_INVALID'))
      .required(t('VALIDATION.EMAIL_REQUIRED'))
      .test('fake-email', t('VALIDATION.EMAIL_FAKE'), (value) => {
        return !fakeEmailPattern.test(value);
      })
      .max(
        MAX_EMAIL_LENGTH,
        t('VALIDATION.MAX_LENGTH', { max: MAX_EMAIL_LENGTH })
      ),
    phone: yup
      .string()
      .required(t('VALIDATION.PHONE_REQUIRED'))
      .max(
        MAX_PHONE_LENGTH,
        t('VALIDATION.MAX_LENGTH', { max: MAX_PHONE_LENGTH })
      )
      .test('phone-number', t('VALIDATION.PHONE_INVALID'), (value) => {
        return phoneNumberPattern.test(value);
      }),
    countries: yup.array().min(1, t('VALIDATION.COUNTRIES_REQUIRED')).max(3),
    devices: yup.string().required(t('VALIDATION.DEVICES_REQUIRED')),
    existingPlayer: yup
      .string()
      .required(t('VALIDATION.EXISTING_PLAYER_REQUIRED')),
    terms: yup.boolean().oneOf([true], t('VALIDATION.TERMS_REQUIRED')),
    recaptcha: yup.string().required(t('VALIDATION.RECAPTCHA_REQUIRED')),
  });
};

export const loginSchema = (t) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t('VALIDATION.EMAIL_INVALID'))
      .required(t('VALIDATION.EMAIL_REQUIRED'))
      .max(
        MAX_EMAIL_LENGTH,
        t('VALIDATION.MAX_LENGTH', { max: MAX_EMAIL_LENGTH })
      ),
    password: yup.string().required(t('VALIDATION.PASSWORD_REQUIRED')),
  });
};

export const registerSchema = (t) => {
  return yup.object().shape({
    fullName: yup
      .string()
      .required(t('VALIDATION.FULLNAME_REQUIRED'))
      .max(
        MAX_FULLNAME_LENGTH,
        t('VALIDATION.MAX_LENGTH', { max: MAX_FULLNAME_LENGTH })
      )
      .matches(fullNamePattern, t('VALIDATION.FULLNAME_INVALID')),
    email: yup
      .string()
      .email(t('VALIDATION.EMAIL_INVALID'))
      .required(t('VALIDATION.EMAIL_REQUIRED'))
      .max(
        MAX_EMAIL_LENGTH,
        t('VALIDATION.MAX_LENGTH', { max: MAX_EMAIL_LENGTH })
      ),
    password: yup.string().required(t('VALIDATION.PASSWORD_REQUIRED')),
    confirmPassword: yup
      .string()
      .required(t('VALIDATION.CONFIRM_PASSWORD_REQUIRED'))
      .oneOf([yup.ref('password'), null], t('VALIDATION.PASSWORD_MISMATCH')),
  });
};

export const sendTrialSchema = (t) => {
  return yup.object().shape({
    username: yup.string().required(t('VALIDATION.USERNAME_REQUIRED')),
    password: yup.string().required(t('VALIDATION.PASSWORD_REQUIRED')),
    host: yup.string().required(t('VALIDATION.HOST_REQUIRED')),
    fullName: yup
      .string()
      .required(t('VALIDATION.FULLNAME_REQUIRED'))
      .max(
        MAX_FULLNAME_LENGTH,
        t('VALIDATION.MAX_LENGTH', { max: MAX_FULLNAME_LENGTH })
      ),
    customNote: yup.string().max(500, t('VALIDATION.MAX_LENGTH', { max: 500 })),
  });
};
