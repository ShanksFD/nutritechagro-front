import { createRef, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  Alert,
  Box,
  Container,
  IconButton,
  Link,
  Slide,
  Snackbar,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { Close } from '@mui/icons-material';

import SectionBgShape from '../../assets/images/section-bg-shape-1.png';
import { StyledButton } from '../Utils/UIUtils';
import { CustomInput } from '../Forms/CustomInput';
import { newsletterSchema } from '../../schemas';
import { saveNewsletterEmail } from '../../actions/userActions';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function PreFooter() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const theme = useTheme();

  const snackbarDuration = 5000;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const reCaptchaRef = createRef();

  const handleOpenSnackbar = (severity) => {
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const { error, success } = useSelector((state) => state.newsletterEmail);

  useEffect(() => {
    if (success) {
      handleOpenSnackbar('success');
      reCaptchaRef.current.reset();
    }
  }, [success, reCaptchaRef]);

  useEffect(() => {
    if (error) {
      handleOpenSnackbar('error');
    }
  }, [error]);

  useEffect(() => {
    let timer;

    if (success || error) {
      timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NEWSLETTER_EMAIL_STATUS' });
      }, snackbarDuration);
    }

    return () => clearTimeout(timer);
  }, [success, error, dispatch]);

  const onSubmit = (values, actions) => {
    dispatch(saveNewsletterEmail(values.email));
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FAFBFB',
        position: 'relative',
      }}
    >
      <Container
        sx={{
          py: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        maxWidth="lg"
      >
        <Stack
          component={'header'}
          gap={2}
          justifyContent="center"
          textAlign={'center'}
        >
          <Typography
            variant="h3"
            color="primary.main"
            sx={{
              fontSize: '16px',
              fontWeight: '500',
              textTransform: 'uppercase',
            }}
          >
            {t('PREFOOTER_SUBSCRIBE.SUBTITLE')}
          </Typography>
          <Typography
            variant="h2"
            color="primary.neutral800"
            sx={{
              fontSize: '32px',
              fontWeight: '600',
              width: { xs: '100%', md: '60%' },
              mx: 'auto',
            }}
          >
            {t('PREFOOTER_SUBSCRIBE.TITLE')}
          </Typography>
        </Stack>

        <Box sx={{ mt: 4, width: { xs: '100%', sm: '60%', md: '40%' } }}>
          <Formik
            initialValues={{
              email: '',
              recaptcha:
                process.env.REACT_APP_ENV === 'development' ? 'test' : '',
            }}
            validationSchema={() => newsletterSchema(t)}
            validateOnChange={false}
            validateOnBlur={false}
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
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                    onBlur={handleBlurAndExecuteReCAPTCHA}
                  >
                    <CustomInput
                      name="email"
                      type="text"
                      autoComplete="email"
                      placeholder={t('PREFOOTER_SUBSCRIBE.EMAIL_PLACEHOLDER')}
                    />
                    <StyledButton
                      variant="contained"
                      type="submit"
                      name="submit-contact"
                      sx={{
                        borderRadius: theme.shape.defaultBorderRadius,
                        ml: 1,
                        px: 2,
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        bgcolor: success ? 'success' : 'primary.main',
                        '&:hover': {
                          bgcolor: success ? 'success' : '',
                        },
                        minWidth: '108px',
                      }}
                      disabled={success}
                    >
                      {success
                        ? t('PREFOOTER_SUBSCRIBE.BUTTON_SUBSCRIBED')
                        : t('PREFOOTER_SUBSCRIBE.BUTTON_SUBSCRIBE')}
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
                  </Form>

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
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary.main"
                          />
                        ),
                        Link2: (
                          <Link
                            href="https://policies.google.com/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary.main"
                          />
                        ),
                      }}
                    />
                  </Typography>
                </Stack>
              );
            }}
          </Formik>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={snackbarDuration}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            TransitionComponent={SlideTransition}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              variant="filled"
              icon={false}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleCloseSnackbar}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{
                width: { xs: '90%', md: '100%' },
                minHeight: '64px',
                fontSize: '14px',
                fontWeight: '400',
                bgcolor: 'white',
                color: 'primary.neutral800',
                boxShadow:
                  '0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.15)',
                border: '1px solid',
                borderColor:
                  snackbarSeverity === 'success'
                    ? alpha(theme.palette.success.main, 0.2)
                    : alpha(theme.palette.error.main, 0.2),
                borderLeft: '4px solid',
                borderLeftColor:
                  snackbarSeverity === 'success'
                    ? 'success.main'
                    : 'error.main',
                '& .MuiAlert-message': {
                  display: 'flex',
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                  gap: '8px',
                },
                '& .MuiAlert-action': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                },
                borderRadius: theme.shape.secondaryBorderRadius,
              }}
            >
              <Typography
                variant="body1"
                color="inherit"
                fontSize={'16px'}
                fontWeight={'600'}
              >
                {snackbarSeverity === 'success'
                  ? t('PREFOOTER_SUBSCRIBE.SUBSCRIBED_TITLE')
                  : t('PREFOOTER_SUBSCRIBE.ERROR_TITLE')}
              </Typography>
              <Typography variant="body1" color="inherit" fontSize={'14px'}>
                {snackbarSeverity === 'success'
                  ? t('PREFOOTER_SUBSCRIBE.SUBSCRIBED_MESSAGE')
                  : t('PREFOOTER_SUBSCRIBE.ERROR_MESSAGE')}
              </Typography>
            </Alert>
          </Snackbar>
        </Box>
      </Container>
      <Box
        component="img"
        src={SectionBgShape}
        alt=""
        sx={{
          position: 'absolute',
          top: 0,
          right: '0',
          transform: 'scaleX(-1)',
          width: { xs: '40%', sm: 'auto' },
          maxWidth: '100%',
        }}
        loading="eager"
      />
      <Box
        component="img"
        src={SectionBgShape}
        alt=""
        sx={{
          position: 'absolute',
          top: 0,
          left: '0',
          width: { xs: '40%', sm: 'auto' },
          maxWidth: '100%',
        }}
        loading="eager"
      />
    </Box>
  );
}
