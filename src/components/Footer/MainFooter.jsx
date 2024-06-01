import Typography from '@mui/material/Typography';
import {
  Box,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import { X, Instagram, Facebook } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { RiTiktokFill } from 'react-icons/ri';

import NutriLogo from '../../assets/images/nutritechagro-logo-light.svg';
import { getTransitionStyle } from '../Utils/UIUtils';

export default function MainFooter() {
  const { t } = useTranslation();

  const company = [
    { url: '/', name: t('MAIN_FOOTER.COMPANY.HOME') },
    { url: '/pricing', name: t('MAIN_FOOTER.COMPANY.PRICING') },
    { url: '/free-trial', name: t('MAIN_FOOTER.COMPANY.FREE_TRIAL') },
  ];

  const legal = [
    { url: '/privacy-policy', name: t('MAIN_FOOTER.LEGAL.PRIVACY_POLICY') },
    {
      url: '/terms-and-conditions',
      name: t('MAIN_FOOTER.LEGAL.TERMS_AND_CONDITIONS'),
    },
    { url: '/refund-policy', name: t('MAIN_FOOTER.LEGAL.REFUND_POLICY') },
  ];

  const support = [
    {
      url: 'https://help.nutritechagro.com/',
      name: t('MAIN_FOOTER.SUPPORT.HELP'),
    },
    {
      url: '/faq',
      name: t('MAIN_FOOTER.SUPPORT.FAQ'),
    },
    {
      url: '/contact',
      name: t('MAIN_FOOTER.SUPPORT.CONTACT'),
    },
  ];

  const contact = [
    {
      url: 'tel:' + process.env.REACT_APP_SUPPORT_PHONE,
      name: process.env.REACT_APP_SUPPORT_PHONE,
    },
    {
      url: 'mailto:' + process.env.REACT_APP_SUPPORT_MAIL,
      name: process.env.REACT_APP_SUPPORT_MAIL,
    },
  ];

  const social = [
    {
      url: 'https://www.twitter.com/',
      logo: <X style={{ fontSize: '24px' }} />,
    },
    {
      url: 'https://www.tiktok.com/',
      logo: <RiTiktokFill style={{ fontSize: '24px' }} />,
    },
    {
      url: 'https://www.instagram.com/',
      logo: <Instagram style={{ fontSize: '24px' }} />,
    },
    {
      url: 'https://www.facebook.com/',
      logo: <Facebook style={{ fontSize: '24px' }} />,
    },
  ];

  const theme = useTheme();
  const linkTransition = getTransitionStyle(theme, ['color']);
  return (
    <Box
      sx={{
        backgroundColor: 'primary.neutral1000',
      }}
    >
      <Container
        component="footer"
        sx={{
          py: 6,
        }}
        maxWidth="lg"
      >
        <Stack
          gap={4}
          justifyContent="space-between"
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Stack
            sx={{
              gap: 2,
              flexDirection: 'column',
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            <Link href="/">
              <img
                src={NutriLogo}
                width={180}
                height={'auto'}
                alt="Nutritechagro Logo"
                style={{ display: 'block' }}
                title="Nutritechagro Logo"
                loading="eager"
              />
            </Link>
            {
              <Stack direction="row" spacing={1}>
                {social.map((link, k) => (
                  <Link
                    key={k}
                    href={link.url}
                    target="_blank"
                    aria-label={link.url}
                    sx={{
                      color: alpha(theme.palette.primary.neutral400, 0.75),
                      '&:hover': {
                        color: 'primary.neutral400',
                      },
                      ...linkTransition,
                    }}
                  >
                    {link.logo}
                  </Link>
                ))}
              </Stack>
            }
          </Stack>
          <Stack
            direction={'row'}
            gap={{ xs: 4, md: 5, lg: 8 }}
            sx={{ flexWrap: 'wrap' }}
          >
            <Stack sx={{ gap: 0.5, flexDirection: 'column' }}>
              <Typography
                variant="h2"
                fontSize="15px"
                color="text.white"
                fontWeight="500"
              >
                {t('MAIN_FOOTER.COMPANY.TITLE')}
              </Typography>
              <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {company.map((link, k) => (
                  <ListItem key={k} disableGutters disablePadding>
                    <Typography
                      component={Link}
                      href={link.url}
                      sx={{
                        color: alpha(theme.palette.primary.neutral400, 0.75),
                        fontSize: '14px',
                        textDecoration: 'none',
                        ...linkTransition,
                        '&:hover': {
                          color: 'primary.neutral400',
                        },
                      }}
                    >
                      {link.name}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Stack>

            {/* Support */}
            <Stack sx={{ gap: 0.5, flexDirection: 'column' }}>
              <Typography
                variant="h2"
                fontSize="15px"
                color="text.white"
                fontWeight="500"
              >
                {t('MAIN_FOOTER.SUPPORT.TITLE')}
              </Typography>
              <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {support.map((link, k) => (
                  <ListItem key={k} disableGutters disablePadding>
                    <Typography
                      component={Link}
                      href={link.url}
                      sx={{
                        color: alpha(theme.palette.primary.neutral400, 0.75),
                        fontSize: '14px',
                        textDecoration: 'none',
                        ...linkTransition,
                        '&:hover': {
                          color: 'primary.neutral400',
                        },
                      }}
                    >
                      {link.name}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Stack>

            {/* Legal */}
            <Stack sx={{ gap: 0.5, flexDirection: 'column' }}>
              <Typography
                variant="h2"
                fontSize="15px"
                color="text.white"
                fontWeight="500"
              >
                {t('MAIN_FOOTER.LEGAL.TITLE')}
              </Typography>
              <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {legal.map((link, k) => (
                  <ListItem key={k} disableGutters disablePadding>
                    <Typography
                      component={Link}
                      href={link.url}
                      sx={{
                        color: alpha(theme.palette.primary.neutral400, 0.75),
                        fontSize: '14px',
                        textDecoration: 'none',
                        ...linkTransition,
                        '&:hover': {
                          color: 'primary.neutral400',
                        },
                      }}
                    >
                      {link.name}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Stack>

            {/* Contact */}
            <Stack sx={{ gap: 0.5, flexDirection: 'column' }}>
              <Typography
                variant="h2"
                fontSize="15px"
                color="text.white"
                fontWeight="500"
              >
                {t('MAIN_FOOTER.CONTACT.TITLE')}
              </Typography>
              <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {contact.map((link, k) => (
                  <ListItem key={k} disableGutters disablePadding>
                    <Typography
                      component={Link}
                      href={link.url}
                      sx={{
                        color: alpha(theme.palette.primary.neutral400, 0.75),
                        fontSize: '14px',
                        textDecoration: 'none',
                        ...linkTransition,
                        '&:hover': {
                          color: 'primary.neutral400',
                        },
                      }}
                    >
                      {link.name}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Divider sx={{ borderColor: 'primary.neutral900' }} />
      <Container sx={{ py: 2 }} maxWidth="lg">
        <Typography
          sx={{
            color: 'primary.neutral300',
            fontWeight: '300',
            fontSize: '14px',
            mb: 1,
          }}
        >
          &copy; {t('MAIN_FOOTER.COPYRIGHT')}
        </Typography>
      </Container>
    </Box>
  );
}
