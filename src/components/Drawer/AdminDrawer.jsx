import { Fragment } from 'react';
import Drawer from '@mui/material/Drawer';
import { BiSolidChevronLeft } from 'react-icons/bi';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  Box,
  Divider,
  IconButton,
  Stack,
  alpha,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import NutriLogo from '../../assets/images/nutritechagro-logo-dark.svg';
import { adminDrawerWidth } from '../../constants/utilsConstants';
import { toggleDrawer } from '../../actions/utilsActions';
import { theme } from '../../theme';
import { getPathTitle, links } from '../Utils/UIUtils';

const CustomListItemButton = ({
  link,
  pathname,
  getLinkStyles,
  sx,
  handleClose,
}) => {
  const isHighlighted =
    link.to.split('/')[2] === undefined
      ? link.to === pathname
      : link.to.split('/')[2] === getPathTitle(pathname).toLowerCase();
  return (
    <ListItemButton
      component={link.to === '' ? 'div' : Link}
      to={link.to}
      onClick={handleClose}
      sx={{ ...getLinkStyles(link), ...sx }}
    >
      <ListItemIcon
        sx={{
          minWidth: '32px',
          color: isHighlighted ? 'primary.main' : 'primary.neutral500',
        }}
      >
        {link.icon}
      </ListItemIcon>
      <ListItemText primary={link.label} />
    </ListItemButton>
  );
};

export function AdminDrawer() {
  const isDrawerOpen = useSelector((state) => state.utils.drawer);
  const { pathname } = useLocation();

  const getLinkStyles = (link) => {
    const isHighlighted =
      link.to.split('/')[2] === undefined
        ? link.to === pathname
        : link.to.split('/')[2] === getPathTitle(pathname).toLowerCase();

    const baseStyles = {
      mx: 1,
      p: '5px 12px',
      bgcolor: isHighlighted
        ? alpha(theme.palette.primary.neutral100, 0.5)
        : 'transparent',
      borderRadius: theme.shape.defaultBorderRadius,
      '& .MuiTypography-root': {
        color: isHighlighted ? 'primary.neutral800' : 'primary.neutral500',
        fontSize: '14px',
        fontWeight: 500,
      },

      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.neutral100, 0.5),
      },
    };
    return baseStyles;
  };

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  const handleDrawerClose = () => {
    dispatch(toggleDrawer(false));
  };

  return (
    <Fragment>
      <Fragment key={'left'}>
        <Drawer
          anchor={'left'}
          open={isDrawerOpen}
          variant={isMobile ? 'temporary' : 'permanent'}
          onClose={handleDrawerClose}
        >
          <Box
            sx={{
              width: adminDrawerWidth,
              height: '100vh',
              '& .MuiTypography-body1': {
                fontSize: '14px',
              },
            }}
          >
            <List
              sx={{
                position: 'relative',
                height: '100%',
                py: 0,
              }}
              component="nav"
            >
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                sx={{
                  px: 2,
                  py: 2,
                  height: '72px',
                }}
              >
                <Link to="/" style={{ display: 'inherit' }}>
                  <img
                    src={NutriLogo}
                    width={180}
                    alt="NutriTechAgro Logo"
                    style={{ display: 'block', cursor: 'pointer' }}
                  />
                </Link>
                <IconButton
                  sx={{
                    display: { xs: 'inherit', md: 'none' },
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                  onClick={handleDrawerClose}
                >
                  <BiSolidChevronLeft />
                </IconButton>
              </Stack>

              <Divider variant="middle" />
              <Stack
                justifyContent={'space-between'}
                sx={{
                  height: 'calc(100% - 72px - 1px)',
                  py: 2,
                }}
              >
                <Stack gap={0.5}>
                  {links.slice(0, -1).map((link, key) => (
                    <Fragment key={key}>
                      <CustomListItemButton
                        link={link}
                        pathname={pathname}
                        getLinkStyles={getLinkStyles}
                        handleClose={handleDrawerClose}
                      />
                    </Fragment>
                  ))}
                </Stack>

                <Box>
                  <CustomListItemButton
                    link={links.slice(-1)[0]}
                    pathname={pathname}
                    getLinkStyles={getLinkStyles}
                    handleClose={handleDrawerClose}
                  />
                </Box>
              </Stack>
            </List>
          </Box>
        </Drawer>
      </Fragment>
    </Fragment>
  );
}
