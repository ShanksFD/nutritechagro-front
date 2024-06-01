import { useEffect, useRef, useState } from 'react';
import {
  Icon,
  AppBar,
  Toolbar,
  Stack,
  Box,
  Link,
  useTheme,
  Container,
  useMediaQuery,
  Button,
  Divider,
  Popover,
  List,
  ListItem,
  IconButton,
  Collapse,
  Typography,
  alpha,
} from '@mui/material';
import { PiTranslateBold } from 'react-icons/pi';
import { Close, ExpandLess, ExpandMore } from '@mui/icons-material';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { IoMenu } from 'react-icons/io5';

import NutriLogoLight from '../../assets/images/nutritechagro-logo-light.svg';
import NutriLogoDark from '../../assets/images/nutritechagro-logo-dark.svg';
import { StyledButton, StyledLink, getTransitionStyle } from '../Utils/UIUtils';

const supportedLanguages = [
  { code: 'en-US', label: 'English' },
  { code: 'fr-FR', label: 'French' },
  { code: 'es-ES', label: 'Spanish' },
];

export default function MainHeader({ darkMode = false }) {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
  const languageBtnDesktop = useRef(null);
  const languageBtnMobile = useRef(null);

  const [langPopoverEnchorEl, setLangPopoverEnchorEl] = useState(null);

  const handleLangPopoverOpen = (event) => {
    setLangPopoverEnchorEl(event.currentTarget);
  };

  const handleLangPopoverClose = () => {
    setLangPopoverEnchorEl(null);
  };

  const [menuPopoverEnchorEl, setMenuPopoverEnchorEl] = useState(null);

  const handleMenuPopoverOpen = (event) => {
    setMenuPopoverEnchorEl(event.currentTarget);
  };

  const handleMenuPopoverClose = () => {
    setMenuPopoverEnchorEl(null);
  };

  const langPopoverOpen = Boolean(langPopoverEnchorEl);

  const menuPopoverOpen = !isMobileOrTablet
    ? false
    : Boolean(menuPopoverEnchorEl);

  const langPopoverId = langPopoverOpen ? 'language-popover' : undefined;
  const menuPopoverId = menuPopoverOpen ? 'menu-popover' : undefined;

  const textTransitionStyle = getTransitionStyle(theme, ['color']);
  const backgroundTransitionStyle = getTransitionStyle(theme, [
    'background-color',
  ]);

  const [openLanguage, setOpenLanguage] = useState(false);

  const { i18n } = useTranslation();

  const handleLanguageChange = (language) => {
    setLangPopoverEnchorEl(null);
    setMenuPopoverEnchorEl(null);
    setOpenLanguage(false);
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  const handleOpenLanguage = () => {
    setOpenLanguage(!openLanguage);
  };

  useEffect(() => {
    if (!isMobileOrTablet && menuPopoverEnchorEl) {
      setMenuPopoverEnchorEl(null);
    }
    if (isMobileOrTablet && langPopoverOpen)
      setLangPopoverEnchorEl(languageBtnMobile?.current);
    else if (!isMobileOrTablet && langPopoverOpen)
      setLangPopoverEnchorEl(languageBtnDesktop?.current);
  }, [isMobileOrTablet, menuPopoverEnchorEl, langPopoverOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (langPopoverOpen && !langPopoverEnchorEl?.contains(event.target)) {
        setLangPopoverEnchorEl(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [langPopoverOpen, langPopoverEnchorEl]);

  const currentLanguage = i18n.language;

  const [language, setLanguage] = useState(
    currentLanguage || process.env.DEFAULT_WEBSITE_LANGUAGE
  );

  const links = [
    {
      pricing: t('MAIN_HEADER.MENU.PRICING'),
    },
    { contact: t('MAIN_HEADER.MENU.CONTACT') },
    { faq: t('MAIN_HEADER.MENU.FAQ') },
  ];

  return (
    <AppBar
      elevation={0}
      sx={{
        py: 1,
        backgroundColor: darkMode ? 'primary.neutral1000' : 'primary.white',
      }}
      position="static"
    >
      <Container maxWidth={'lg'}>
        <Toolbar
          component={'nav'}
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="/">
            <img
              src={darkMode ? NutriLogoLight : NutriLogoDark}
              width={180}
              height={'auto'}
              alt="Nutritechagro Logo"
              style={{ display: 'block' }}
              title="Nutritechagro Logo"
              loading="eager"
            />
          </Link>

          {/* Main Menu Desktop*/}
          <Stack
            direction="row"
            gap={3}
            sx={{
              display: { xs: 'none', md: 'flex' },
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <List
              sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}
              disablePadding
            >
              {links.map((page, key) => (
                <ListItem key={key} disableGutters disablePadding>
                  <StyledLink
                    component="a"
                    href={Object.keys(page)[0]}
                    sx={{
                      color: darkMode ? 'text.white' : 'primary.neutral700',
                      fontWeight: darkMode ? '400' : '500',
                      '&:hover': {
                        color: darkMode ? 'text.white' : 'primary.neutral700',
                      },
                    }}
                  >
                    {Object.values(page)[0]}
                  </StyledLink>
                </ListItem>
              ))}
            </List>

            <Stack
              direction="row"
              gap={2}
              sx={{
                alignItems: 'center',
              }}
            >
              <Button
                variant="text"
                aria-describedby={langPopoverId}
                sx={{
                  minWidth: 'auto',
                  color: darkMode ? 'text.white' : 'primary.neutral700',
                  fontWeight: darkMode ? '400' : '500',
                  px: 0,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  ...textTransitionStyle,
                }}
                aria-haspopup="true"
                aria-owns={langPopoverId}
                onMouseEnter={handleLangPopoverOpen}
                onClick={
                  langPopoverOpen
                    ? handleLangPopoverClose
                    : handleLangPopoverOpen
                }
                ref={languageBtnDesktop}
              >
                {language.toUpperCase().slice(0, 2)}
              </Button>
              {langPopoverEnchorEl && (
                <Popover
                  id={langPopoverId}
                  open={langPopoverOpen}
                  anchorEl={langPopoverEnchorEl}
                  onClose={handleLangPopoverClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  disableRestoreFocus
                  elevation={0}
                  sx={{
                    mt: isMobileOrTablet ? 0 : 1,
                    pointerEvents: 'none',
                    '& .MuiPaper-root': {
                      borderRadius: theme.shape.defaultBorderRadius,
                      border: '1px solid',
                      borderColor: darkMode
                        ? 'primary.neutral700'
                        : 'primary.neutral300',
                      bgcolor: 'transparent',
                      boxShadow: 'none',
                    },
                  }}
                >
                  <Stack
                    component={'div'}
                    onMouseLeave={handleLangPopoverClose}
                    sx={{
                      p: '10px',
                      pointerEvents: 'auto',
                      width: '250px',
                      maxWidth: '250px',
                      minWidth: '120px',
                      backgroundColor: darkMode
                        ? 'primary.neutral1000'
                        : 'text.white',
                    }}
                  >
                    <List disablePadding>
                      {supportedLanguages
                        .filter((language) => language.code !== currentLanguage)
                        .map((language, key) => (
                          <ListItem
                            key={key}
                            sx={{
                              p: '8px 12px',
                              borderRadius: theme.shape.defaultBorderRadius,
                              '&:hover': {
                                bgcolor: darkMode
                                  ? 'primary.neutral900'
                                  : 'primary.neutral100',
                                cursor: 'pointer',
                              },
                              ...backgroundTransitionStyle,
                            }}
                            onClick={() => handleLanguageChange(language.code)}
                          >
                            <Typography
                              sx={{
                                fontWeight: '400',
                                fontSize: '15px',
                                color: darkMode
                                  ? 'primary.neutral100'
                                  : 'primary.neutral700',
                              }}
                            >
                              {language.label}
                            </Typography>
                          </ListItem>
                        ))}
                    </List>
                  </Stack>
                </Popover>
              )}
              <Divider
                orientation="vertical"
                flexItem
                variant="middle"
                sx={{
                  borderColor: darkMode
                    ? 'primary.neutral600'
                    : 'primary.neutral200',
                }}
              />
              <StyledButton
                variant="contained"
                LinkComponent={Link}
                href="/"
                sx={{
                  fontWeight: '400',
                }}
              >
                {t('MAIN_HEADER.BUTTON')}
              </StyledButton>
            </Stack>
          </Stack>

          {/* Mobile Icon*/}
          {isMobileOrTablet && (
            <Stack direction="row" gap={1.5} alignItems={'center'}>
              <IconButton
                aria-describedby={langPopoverId}
                sx={{
                  minWidth: 'auto',
                  px: 0,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: darkMode
                      ? 'primary.neutral400'
                      : 'primary.neutral600',
                  },
                  ...textTransitionStyle,
                }}
                aria-haspopup="true"
                aria-owns={langPopoverId}
                onClick={
                  langPopoverOpen
                    ? handleLangPopoverClose
                    : handleLangPopoverOpen
                }
                ref={languageBtnMobile}
              >
                <PiTranslateBold
                  style={{
                    color: langPopoverOpen
                      ? theme.palette.primary.main
                      : theme.palette.primary.neutral500,
                  }}
                  size={'22px'}
                />
              </IconButton>
              <Box sx={{ maxWidth: '40px' }}>
                <Icon
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    height: '100%',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                  onClick={handleMenuPopoverOpen}
                >
                  <IoMenu
                    color={theme.palette.primary.neutral500}
                    size={'30px'}
                  />
                </Icon>
              </Box>

              {/* Mobile Menu */}
              {menuPopoverEnchorEl && (
                <Popover
                  id={menuPopoverId}
                  open={menuPopoverOpen}
                  anchorEl={menuPopoverEnchorEl}
                  onClose={handleMenuPopoverClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  disableRestoreFocus
                  elevation={0}
                  disableScrollLock
                  sx={{
                    '& .MuiPaper-root': {
                      borderRadius: theme.shape.defaultBorderRadius,
                      border: '1px solid',
                      borderColor: darkMode
                        ? 'primary.neutral700'
                        : 'primary.neutral300',
                      width: '90%',
                      zIndex: 1000,
                      maxWidth: '300px',
                      minWidth: '170px',
                      boxShadow: darkMode
                        ? 'none'
                        : `0px 0px 32px ${alpha(
                            theme.palette.primary.neutral100,
                            0.5
                          )},0 0px 10px ${alpha(
                            theme.palette.primary.neutral300,
                            0.5
                          )}`,
                      bgcolor: darkMode ? 'primary.neutral1000' : 'text.white',
                    },
                  }}
                >
                  <Stack component={'div'}>
                    <Stack direction={'row'} justifyContent={'flex-end'}>
                      <IconButton onClick={handleMenuPopoverClose}>
                        <Close
                          sx={{
                            color: darkMode
                              ? 'primary.neutral300'
                              : 'primary.neutral700',
                          }}
                        />
                      </IconButton>
                    </Stack>
                    <Stack sx={{ p: '10px', pt: 0 }}>
                      <ListItem
                        sx={{
                          p: '10px 12px',
                          borderRadius: theme.shape.defaultBorderRadius,
                          '&:hover': {
                            bgcolor: darkMode
                              ? 'primary.neutral900'
                              : 'primary.neutral100',
                            cursor: 'pointer',
                          },
                          ...backgroundTransitionStyle,
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                        onClick={handleOpenLanguage}
                      >
                        <Typography
                          sx={{
                            fontWeight: '400',
                            fontSize: '15px',
                            color: darkMode
                              ? 'primary.neutral300'
                              : 'primary.neutral700',
                          }}
                        >
                          Language: {currentLanguage.toUpperCase().slice(0, 2)}
                        </Typography>
                        {openLanguage ? (
                          <ExpandLess
                            sx={{
                              color: darkMode
                                ? 'primary.neutral400'
                                : 'primary.neutral700',
                            }}
                          />
                        ) : (
                          <ExpandMore
                            sx={{
                              color: darkMode
                                ? 'primary.neutral400'
                                : 'primary.neutral700',
                            }}
                          />
                        )}
                      </ListItem>
                      <Collapse in={openLanguage}>
                        <List disablePadding>
                          {supportedLanguages
                            .filter(
                              (language) => language.code !== currentLanguage
                            )
                            .map((language, key) => (
                              <ListItem
                                key={key}
                                sx={{
                                  p: '10px 12px',
                                  pl: '16px',
                                  borderRadius: theme.shape.defaultBorderRadius,
                                  '&:hover': {
                                    bgcolor: darkMode
                                      ? 'primary.neutral900'
                                      : 'primary.neutral100',
                                    cursor: 'pointer',
                                  },
                                  ...backgroundTransitionStyle,
                                }}
                                onClick={() =>
                                  handleLanguageChange(language.code)
                                }
                              >
                                <Typography
                                  sx={{
                                    fontWeight: '400',
                                    fontSize: '15px',
                                    color: darkMode
                                      ? 'primary.neutral400'
                                      : 'primary.neutral700',
                                  }}
                                >
                                  {language.label}
                                </Typography>
                              </ListItem>
                            ))}
                        </List>
                      </Collapse>
                      <Divider
                        sx={{
                          my: 1.5,
                          borderColor: darkMode
                            ? 'primary.neutral800'
                            : 'primary.neutral200',
                        }}
                        variant="middle"
                      />
                      {links.map((page, key) => (
                        <ListItem
                          key={key}
                          sx={{
                            borderRadius: theme.shape.defaultBorderRadius,
                            fontWeight: darkMode ? '400' : '500',
                            p: 0,
                            '&:hover': {
                              bgcolor: darkMode
                                ? 'primary.neutral900'
                                : 'primary.neutral100',
                              cursor: 'pointer',
                            },
                            ...backgroundTransitionStyle,
                          }}
                        >
                          <StyledLink
                            component="a"
                            href={Object.keys(page)[0]}
                            sx={{
                              width: '100%',
                              p: '10px 12px',
                              color: darkMode
                                ? 'primary.neutral100'
                                : 'primary.neutral700',
                              '&:hover': {
                                color: darkMode
                                  ? 'primary.neutral100'
                                  : 'primary.neutral700',
                              },
                            }}
                          >
                            {Object.values(page)[0]}
                          </StyledLink>
                        </ListItem>
                      ))}
                      <ListItem sx={{ px: 1 }}>
                        <StyledButton
                          variant="contained"
                          LinkComponent={Link}
                          href="/"
                          sx={{
                            width: '100%',
                            bgcolor: 'primary.main',
                            color: darkMode
                              ? 'primary.neutral100'
                              : 'primary.white',
                          }}
                        >
                          {t('MAIN_HEADER.BUTTON')}
                        </StyledButton>
                      </ListItem>
                    </Stack>
                  </Stack>
                </Popover>
              )}
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
