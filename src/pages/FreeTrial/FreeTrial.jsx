/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Link,
  Stack,
  Typography,
  FormControlLabel,
  alpha,
} from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { CheckRounded, ErrorOutlineRounded } from '@mui/icons-material';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import fingerprint2 from 'fingerprintjs2';
import { useDispatch, useSelector } from 'react-redux';
import { logEvent } from 'firebase/analytics';

import { freeTrialSchema } from '../../schemas';
import { StyledButton } from '../../components/Utils/UIUtils';
import { CustomInput } from '../../components/Forms/CustomInput';
import countries from '../../data/countries.json';
import { MyHelmet } from './MyHelmet';
import { theme } from '../../theme';
import { CustomAutocomplete } from '../../components/Forms/CustomAutocomplete';
import CustomRadios, { CustomRadio } from '../../components/Forms/CustomRadios';
import { CustomCheckbox } from '../../components/Forms/CustomCheckbox';
import { startTrial } from '../../actions/userActions';
import { SEND_TRIAL_EMAIL_ENDPOINT } from '../../components/Utils/apiEndpoints';
import { analytics } from '../../config/firebase';
import { capitalizeFullName } from '../../components/Utils/Formating';
import PreFooter from '../../components/Footer/PreFooter';

const Feature = ({ text }) => {
  return (
    <Stack direction={'row'} alignItems={'flex-start'} gap={1}>
      <CheckRounded
        sx={{
          fontSize: '24px',
          color: 'primary.main',
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          borderRadius: '50%',
          p: 0.5,
        }}
      />
      <Typography variant="body1" sx={{ fontSize: '16px', textAlign: 'left' }}>
        {text}
      </Typography>
    </Stack>
  );
};

export default function FreeTrial() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = i18n.language;

  const form = useRef();

  const [formikActions, setFormikActions] = useState(null);
  const [userIp, setUserIp] = useState('');
  const features = t('FREE_TRIAL.FEATURES', { returnObjects: true });
  const reCaptchaRef = createRef();

  const { error, success, loading, trialId } = useSelector(
    (state) => state.trial
  );

  useEffect(() => {
    if (success) {
      reCaptchaRef.current.reset();
      if (formikActions) {
        formikActions.resetForm();
      }
    }
  }, [success, reCaptchaRef, formikActions]);

  const getUserIp = async () => {
    const res = await axios.get('https://api.ipify.org/?format=json');
    setUserIp(res.data.ip);
  };

  useEffect(() => {
    getUserIp();
  }, []);

  const [formData, setFormData] = useState({});
  const [emailSent, setEmailSent] = useState(false);

  const sendMail = async (formData) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + SEND_TRIAL_EMAIL_ENDPOINT,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          existingPlayer: capitalizeFullName(formData.existingPlayer),
          fullName: capitalizeFullName(formData.fullName),
        }),
      }
    );

    if (response.ok) setEmailSent(true);

    return response;
  };

  useEffect(() => {
    if (success && !emailSent && formData) {
      sendMail(formData).finally(() => {
        // redirect to success page
        window.sessionStorage.setItem('trialId', JSON.stringify(trialId));
        window.location.pathname = '/trial-success';
      });
    }

    return () => {
      setFormData({});
    };
    // eslint-disable-next-line
  }, [success]);

  const onSubmit = async (values, actions) => {
    try {
      // Get fingerprint asynchronously
      const fingerprintPromise = new Promise((resolve, reject) => {
        fingerprint2.get((components) => {
          const componentValues = components.map(
            (component) => component.value
          );
          const murmur = fingerprint2.x64hash128(componentValues.join(''), 31);
          resolve(murmur);
        });
      });
      const fingerPrint = await fingerprintPromise;

      // Prepare formData with the obtained fingerprint
      const formData = {
        fullName: values.fullName.toLowerCase().trim(),
        email: values.email.toLowerCase(),
        phone: values.phone,
        countries: values.countries.map((country) => country.name).join(', '),
        devices: values.devices,
        existingPlayer: values.existingPlayer,
        fingerprint: fingerPrint,
        userIp: userIp,
        userLanguage: currentLanguage,
      };

      // Dispatch the action to start the trial
      dispatch(startTrial(formData));
      setFormData(formData);
    } catch (error) {
      //TODO: Handle error
    }

    // Set formik actions and mark form as not submitting
    setFormikActions(actions);
    actions.setSubmitting(false);
  };

  // Firebase analytics
  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_title: 'Free Trial',
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);

  return (
    <>
      <MyHelmet />
      <Container
        maxWidth={'lg'}
        sx={{
          pt: '56px',
          pb: '80px',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
          }}
        >
          <Stack gap={3} flexBasis={'50%'} sx={{ pr: 4 }}>
            <Stack component={'header'} gap={2}>
              <Typography
                variant={'h1'}
                sx={{ fontSize: { xs: '32px', md: '40px' }, fontWeight: '500' }}
              >
                <Trans
                  i18nKey={'FREE_TRIAL.TITLE'}
                  components={{
                    Span1: (
                      <span style={{ color: theme.palette.primary.main }} />
                    ),
                    Span2: (
                      <span style={{ color: theme.palette.primary.main }} />
                    ),
                  }}
                />
              </Typography>
              <Typography
                variant={'body1'}
                sx={{ color: theme.palette.text.secondary }}
              >
                {t('FREE_TRIAL.DESCRIPTION')}
              </Typography>
            </Stack>

            <Stack gap={1.5}>
              {features.map((feature, index) => (
                <Feature key={index} text={feature} />
              ))}
            </Stack>
          </Stack>

          <Box
            sx={{
              border: '1px solid',
              borderColor: 'primary.neutral200',
              borderRadius: theme.shape.defaultBorderRadius,
              p: 4,
              width: '100%',
              flexBasis: '50%',
            }}
          >
            <Formik
              initialValues={{
                fullName: '',
                email: '',
                phone: '',
                countries: [],
                devices: '',
                existingPlayer: '',
                recaptcha:
                  process.env.REACT_APP_ENV === 'development' ? 'test' : '',
                terms: false,
              }}
              validationSchema={() => freeTrialSchema(t)}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={onSubmit}
            >
              {({ setFieldValue, setSubmitting, handleBlur, values }) => {
                const handleBlurAndExecuteReCAPTCHA = (e) => {
                  if (!values.recaptcha) {
                    reCaptchaRef.current.execute();
                    setSubmitting(true);
                  }
                  handleBlur(e);
                };
                return (
                  <Stack gap={2} justifyContent={'center'}>
                    <Form
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                      }}
                      onBlur={handleBlurAndExecuteReCAPTCHA}
                      id="free-trial-form"
                      name="free-trial-form"
                      ref={form}
                    >
                      <CustomInput
                        label={t('FREE_TRIAL.FORM.FULLNAME')}
                        name="fullName"
                        id="fullName"
                        type="text"
                        autoComplete="off"
                        placeholder={t('FREE_TRIAL.FORM.FULLNAME_PLACEHOLDER')}
                        manualMarginBottom={'16px'}
                      />
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        gap={{ xs: 0, sm: 2 }}
                        sx={{ width: '100%' }}
                      >
                        <CustomInput
                          label={t('FREE_TRIAL.FORM.EMAIL')}
                          name="email"
                          id="email"
                          type="text"
                          autoComplete="email"
                          placeholder={t('FREE_TRIAL.FORM.EMAIL_PLACEHOLDER')}
                          manualMarginBottom={'16px'}
                        />

                        <CustomInput
                          label={t('FREE_TRIAL.FORM.PHONE')}
                          name="phone"
                          id="phone"
                          type="text"
                          autoComplete="phone"
                          placeholder={t('FREE_TRIAL.FORM.PHONE_PLACEHOLDER')}
                          manualMarginBottom={'16px'}
                        />
                      </Stack>
                      {/* Select Countries */}
                      <CustomAutocomplete
                        label={t('FREE_TRIAL.FORM.COUNTRIES')}
                        id="countries"
                        name="countries"
                        options={countries.map((country) => country)}
                        placeholder={t('FREE_TRIAL.FORM.COUNTRIES_PLACEHOLDER')}
                        disableCloseOnSelect
                        multiple
                        manualMarginBottom={'16px'}
                      />
                      {/* Devices */}
                      <CustomInput
                        label={t('FREE_TRIAL.FORM.DEVICES')}
                        name="devices"
                        id="devices"
                        type="text"
                        autoComplete="off"
                        placeholder={t('FREE_TRIAL.FORM.DEVICES_PLACEHOLDER')}
                        helperText={t('FREE_TRIAL.FORM.DEVICES_HINT')}
                        manualMarginBottom={'16px'}
                      />
                      {/* Existing Player */}
                      <CustomRadios
                        label={t('FREE_TRIAL.FORM.EXISTING_PLAYER')}
                        id="existingPlayer"
                        name="existingPlayer"
                        manualMarginBottom={'16px'}
                      >
                        <FormControlLabel
                          id="existingPlayerYesLabel"
                          htmlFor="existingPlayerYes"
                          value="yes"
                          control={<CustomRadio id="existingPlayerYes" />}
                          label={t('GENERAL.YES')}
                        />
                        <FormControlLabel
                          id="existingPlayerNoLabel"
                          htmlFor="existingPlayerNo"
                          value="no"
                          control={<CustomRadio id="existingPlayerNo" />}
                          label={t('GENERAL.NO')}
                        />
                      </CustomRadios>
                      <CustomCheckbox
                        name="terms"
                        id="terms"
                        manualMarginBottom={'16px'}
                        labelFontSize={'15px'}
                        label={
                          <Trans
                            i18nKey="FREE_TRIAL.FORM.TERMS"
                            components={{
                              Link1: (
                                <Link
                                  name="terms"
                                  href="/terms-and-conditions"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  color="primary.main"
                                  sx={{ textDecoration: 'none' }}
                                />
                              ),
                              Link2: (
                                <Link
                                  name="terms"
                                  href="/privacy-policy"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  color="primary.main"
                                  sx={{ textDecoration: 'none' }}
                                />
                              ),
                            }}
                          />
                        }
                      />
                      <StyledButton
                        variant="contained"
                        type="submit"
                        name="submit"
                        disabled={loading || success}
                        sx={{
                          borderRadius: theme.shape.defaultBorderRadius,
                          px: 3,
                          mb: 2,
                          whiteSpace: 'nowrap',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 2,
                          bgcolor: 'primary.main',
                          '&.Mui-disabled': {
                            bgcolor: 'primary.neutral300',
                            color: loading ? 'white' : '',
                          },
                        }}
                      >
                        {success
                          ? t('FREE_TRIAL.FORM.SUBMIT_BUTTON_SUCCESS')
                          : t('FREE_TRIAL.FORM.SUBMIT_BUTTON')}
                        {loading && (
                          <CircularProgress color="inherit" size={'16px'} />
                        )}
                      </StyledButton>
                      <ReCAPTCHA
                        sitekey={process.env.REACT_APP_SITE_KEY}
                        ref={reCaptchaRef}
                        onChange={(value) => {
                          setFieldValue('recaptcha', value);
                          setSubmitting(false);
                        }}
                        size="invisible"
                      />
                      <Typography
                        component="small"
                        color="primary.neutral800"
                        sx={{
                          fontSize: '12px',
                          fontWeight: '400',
                          textAlign: 'center',
                          color: theme.palette.primary.neutral400,
                        }}
                      >
                        <Trans
                          i18nKey="GENERAL.RECAPTCHA_MESSAGE"
                          components={{
                            Link1: (
                              <Link
                                name="privacy"
                                href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="primary.main"
                              />
                            ),
                            Link2: (
                              <Link
                                name="terms"
                                href="https://policies.google.com/terms"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="primary.main"
                              />
                            ),
                          }}
                        />
                      </Typography>
                    </Form>
                  </Stack>
                );
              }}
            </Formik>
            {error && (
              <Alert severity={'error'} sx={{ mt: 2 }} icon={false}>
                <Stack direction={'row'} alignItems={'flex-start'} gap={2}>
                  <ErrorOutlineRounded
                    sx={{
                      fontSize: '28px',
                      color: theme.palette.error.main,
                      backgroundColor: alpha(theme.palette.error.main, 0.1),
                      borderRadius: '50%',
                      p: 0.5,
                    }}
                  />
                  <Stack direction={'column'} gap={0.5}>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: '16px', fontWeight: '600' }}
                    >
                      {error === 'ALREADY_REQUESTED'
                        ? t('FREE_TRIAL.ALREADY_TRIED.TITLE')
                        : t('FREE_TRIAL.TRIAL_DETAILS_FAILED.TITLE')}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '16px',
                        textAlign: 'left',
                        color: 'primary.neutral600',
                      }}
                    >
                      <Trans
                        i18nKey={
                          error === 'ALREADY_REQUESTED'
                            ? t('FREE_TRIAL.ALREADY_TRIED.DESCRIPTION')
                            : t('FREE_TRIAL.TRIAL_DETAILS_FAILED.DESCRIPTION')
                        }
                        components={{
                          Link: (
                            <Link
                              href="/contact"
                              rel="noopener noreferrer"
                              sx={{ textDecoration: 'none' }}
                            />
                          ),
                        }}
                      />
                    </Typography>
                  </Stack>
                </Stack>
              </Alert>
            )}
          </Box>
        </Stack>
      </Container>
      <PreFooter />
    </>
  );
}
