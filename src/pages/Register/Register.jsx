import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Link,
  Stack,
  Typography,
  alpha,
} from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { ErrorOutlineRounded } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';

import NutriLogo from '../../assets/images/nutritechagro-logo-dark.svg';
import { register, signInWithGoogle } from '../../actions/userActions';
import { theme } from '../../theme';
import { StyledButton, StyledLink } from '../../components/Utils/UIUtils';
import { registerSchema } from '../../schemas';
import { CustomInput } from '../../components/Forms/CustomInput';

export default function Register() {
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.userRegister
  );
  const { t } = useTranslation();

  const onSubmit = (values, actions) => {
    const formData = {
      email: values.email,
      password: values.password,
      fullName: values.fullName,
    };
    dispatch(register(formData));

    actions.setSubmitting(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 4,
        mt: 15,
      }}
    >
      <Stack
        sx={{
          width: { xs: '100%', sm: '500px' },
          border: '1px solid',
          borderColor: 'primary.neutral200',
          borderRadius: theme.shape.defaultBorderRadius,
          p: 4,
        }}
        gap={2}
      >
        <Link href="/">
          <img
            src={NutriLogo}
            width={180}
            alt="NutriTechAgro Logo"
            style={{ display: 'block' }}
          />
        </Link>
        <Typography
          variant="h1"
          fontSize="22px"
          fontWeight="600"
          color="primary.neutral800"
        >
          Create Account
        </Typography>
        <Typography
          variant="body1"
          fontSize="16px"
          color="primary.neutral400"
          sx={{ mb: 2 }}
        >
          Welcome! Please fill in the form to create an account.
        </Typography>
        <Stack gap={2}>
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={() => registerSchema(t)}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={onSubmit}
          >
            {() => {
              return (
                <Stack gap={2} justifyContent={'center'}>
                  <Form
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                    }}
                    id="register-form"
                    name="register-form"
                  >
                    <CustomInput
                      label={'Full Name'}
                      name="fullName"
                      id="fullName"
                      type="text"
                      autoComplete="on"
                      placeholder={'John Doe'}
                      manualMarginBottom={'16px'}
                    />

                    <CustomInput
                      label={'Your Email'}
                      name="email"
                      id="email"
                      type="email"
                      autoComplete="on"
                      placeholder={'email@example.com'}
                      manualMarginBottom={'16px'}
                    />

                    <Stack gap={2} direction={'row'}>
                      <CustomInput
                        label={'Password'}
                        name="password"
                        id="password"
                        type="password"
                        autoComplete="on"
                        placeholder={'Password'}
                        manualMarginBottom={'16px'}
                      />

                      <CustomInput
                        label={'Confirm Password'}
                        name="confirmPassword"
                        id="confirmPassword"
                        type="password"
                        autoComplete="on"
                        placeholder={'Confirm Password'}
                        manualMarginBottom={'16px'}
                      />
                    </Stack>

                    <Stack gap={2}>
                      <StyledButton
                        variant="contained"
                        type="submit"
                        name="register-button"
                        sx={{
                          borderRadius: theme.shape.defaultBorderRadius,
                          px: 3,
                          whiteSpace: 'nowrap',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 2,
                          bgcolor: success ? 'success' : 'primary.main',
                          '&:hover': {
                            bgcolor: success ? 'success' : '',
                          },
                        }}
                      >
                        {success ? 'Account Created' : 'Create Account'}
                        {loading && (
                          <CircularProgress color="inherit" size={'16px'} />
                        )}
                      </StyledButton>

                      {error && (
                        <Alert severity={'error'} icon={false}>
                          <Stack
                            direction={'row'}
                            alignItems={'center'}
                            gap={2}
                          >
                            <ErrorOutlineRounded
                              sx={{
                                fontSize: '28px',
                                color: theme.palette.error.main,
                                backgroundColor: alpha(
                                  theme.palette.error.main,
                                  0.1
                                ),
                                borderRadius: '50%',
                                p: 0.5,
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: '16px',
                                textAlign: 'left',
                                color: 'primary.neutral600',
                              }}
                            >
                              {error}
                            </Typography>
                          </Stack>
                        </Alert>
                      )}

                      <Divider
                        sx={{
                          textTransform: 'uppercase',
                          fontSize: '15px',
                          '&::before': {
                            borderColor: 'primary.neutral200',
                          },
                          '&::after': {
                            borderColor: 'primary.neutral200',
                          },
                        }}
                      >
                        OR
                      </Divider>

                      <StyledButton
                        variant="outlined"
                        onClick={() => dispatch(signInWithGoogle())}
                        sx={{
                          color: 'text.primary',
                          fontWeight: '500',
                          borderColor: 'primary.neutral400',
                          '&:hover': {
                            color: 'primary.neutral500',
                            borderColor: 'primary.neutral400',
                            bgcolor: 'primary.neutral100',
                          },
                        }}
                        startIcon={<FcGoogle />}
                      >
                        Continue with Google
                      </StyledButton>
                      <Typography
                        sx={{
                          fontSize: '15px',
                          textAlign: 'center',
                          color: 'primary.neutral500',
                        }}
                      >
                        Already have an account?{' '}
                        <StyledLink href="/login">Login</StyledLink>
                      </Typography>
                    </Stack>
                  </Form>
                </Stack>
              );
            }}
          </Formik>
        </Stack>
      </Stack>
    </Box>
  );
}
