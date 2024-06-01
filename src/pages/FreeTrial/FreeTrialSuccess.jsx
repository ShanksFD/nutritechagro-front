import { CheckRounded } from '@mui/icons-material';
import { Box, Container, Stack, Typography, alpha } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';

import { theme } from '../../theme';
import { StyledLink } from '../../components/Utils/UIUtils';
import { MyHelmet } from './MyHelmet';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FreeTrialSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [trialId, setTrialId] = useState();
  const storedTrialId = window.sessionStorage.getItem('trialId');

  useEffect(() => {
    if (storedTrialId) {
      setTrialId(JSON.parse(storedTrialId));
      window.sessionStorage.removeItem('trialId');
    } else {
      navigate('/free-trial');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rawWhatsappMessage = t(
    'FREE_TRIAL.TRIAL_DETAILS_RECEIVED.WHATSAPP_MESSAGE',
    {
      trialId: trialId,
    }
  );
  const encodedWhatsappMessage = encodeURI(rawWhatsappMessage);
  return (
    <>
      <MyHelmet success />
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: '10em',
          gap: 2,
          height: '60vh',
          width: { xs: '100%', sm: '70%', md: '50%' },
        }}
      >
        {trialId && (
          <>
            <Box
              sx={{
                border: '10px solid',
                borderColor: (theme) => alpha(theme.palette.success.main, 0.3),
                borderRadius: '50%',
              }}
            >
              <CheckRounded
                sx={{
                  backgroundColor: 'success.main',
                  fontSize: '56px',
                  color: 'primary.white',
                  p: 1,
                  borderRadius: '50%',
                  display: 'block',
                }}
              />
            </Box>
            <Stack direction={'column'} gap={1}>
              <Typography
                variant="h1"
                sx={{ fontSize: '20px', fontWeight: '600' }}
              >
                {t('FREE_TRIAL.TRIAL_DETAILS_RECEIVED.TITLE')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '16px',
                  textAlign: 'left',
                  color: 'primary.neutral600',
                }}
              >
                {t('FREE_TRIAL.TRIAL_DETAILS_RECEIVED.DESCRIPTION')}
              </Typography>
            </Stack>
            <Stack
              direction={'column'}
              gap={1}
              sx={{
                bgcolor: 'primary.neutral100',
                p: 1.5,
                borderRadius: theme.shape.defaultBorderRadius,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: '16px',
                  textAlign: 'left',
                  color: 'primary.neutral600',
                }}
              >
                <Trans
                  i18nKey="FREE_TRIAL.TRIAL_DETAILS_RECEIVED.TRIAL_ID"
                  values={{ trialId: trialId }}
                  components={{ Strong: <strong /> }}
                />
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              sx={{ fontSize: '15px', color: 'text.secondary' }}
            >
              <Trans
                i18nKey="FREE_TRIAL.TRIAL_DETAILS_RECEIVED.CHECK_SPAM"
                components={{
                  Strong: <strong style={{ fontWeight: '500' }} />,
                  LinkWhatsapp: (
                    <StyledLink
                      href={`https://wa.me/19292301875/?text=${encodedWhatsappMessage}`}
                      target="_blank"
                    />
                  ),
                  LinkTelegram: (
                    <StyledLink
                      href={`https://t.me/nutritechagro`}
                      target="_blank"
                    />
                  ),
                  LinkPhone: (
                    <StyledLink href={process.env.REACT_APP_SUPPORT_PHONE} />
                  ),
                }}
                values={{ contactNumber: process.env.REACT_APP_SUPPORT_PHONE }}
              />
            </Typography>
          </>
        )}
      </Container>
    </>
  );
};

export default FreeTrialSuccess;
