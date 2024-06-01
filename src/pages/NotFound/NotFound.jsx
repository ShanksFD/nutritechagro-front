import { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';
import { Container, Link, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';

import { MyHelmet } from './MyHelmet';
import { analytics } from '../../config/firebase';

const NotFound = () => {
  const { t } = useTranslation();

  // Firebase analytics
  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_title: 'Not Found',
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);

  return (
    <>
      <MyHelmet />
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
          height: '70vh',
        }}
      >
        <Typography
          variant="span"
          sx={{
            color: 'primary.main',
            fontSize: '20px',
            fontWeight: '700',
          }}
        >
          {t('NOT_FOUND.TITLE')}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontWeight: '800',
            fontSize: { xs: '56px', md: '64px', textTransform: 'uppercase' },
          }}
        >
          <Trans
            i18nKey="NOT_FOUND.SUBTITLE"
            components={{
              Br: <br />,
            }}
          />
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '16px', md: '18px' },
            color: 'primary.neutral400',
          }}
        >
          <Trans
            i18nKey="NOT_FOUND.LINK"
            components={{
              Br: <br />,
              Link: <Link href="/" color="primary" underline="hover" />,
            }}
          />
        </Typography>
      </Container>
    </>
  );
};

export default NotFound;
