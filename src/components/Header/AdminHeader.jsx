import { useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  useMediaQuery,
  useTheme,
  styled,
  Menu,
  alpha,
  Typography,
  Stack,
  IconButton,
  Link,
  List,
  ListItem,
  Popover,
} from '@mui/material';
import { BiBell, BiUser, BiMenu, BiBasket } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../actions/userActions';
import { adminDrawerWidth } from '../../constants/utilsConstants';
import { toggleDrawer } from '../../actions/utilsActions';
import { getTransitionStyle } from '../Utils/UIUtils';

const NotificationCard = ({ time, isSeen, title, username }) => {
  return (
    <Stack
      direction={'row'}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'primary.neutral200',
        p: '12px 16px',
        alignItems: 'flex-start',
        bgcolor: isSeen ? 'transparent' : 'primary.primary100',
      }}
      gap={2}
    >
      <Box
        sx={{
          bgcolor: isSeen ? 'primary.neutral300' : 'primary.primary200',
          borderRadius: '100%',
          width: '64px',
          height: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <BiBasket />
      </Box>
      <Stack gap={0.5}>
        <Typography variant="body" fontSize={'14px'}>
          {title}{' '}
          <Typography
            component={Link}
            href={`/profile/${username}`}
            target="_blank"
            variant="body"
            fontSize={'14px'}
            sx={{
              fontWeight: '500',
              color: 'primary.neutral900',
              textDecoration: 0,
            }}
          >
            @{username}
          </Typography>
        </Typography>
        <Typography
          variant="body"
          fontSize={'12px'}
          color={'primary.neutral700'}
        >
          {/* {formatTimeAgo(time)} */}
        </Typography>
      </Stack>
    </Stack>
  );
};

export function AdminHeader() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const user = useSelector((state) => state.userLogin);

  const navigate = useNavigate();
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.userOrderNotifications?.notifications
  );

  const handleOpenNotificationMenu = (e) => {
    setAnchorElNotification(e.currentTarget);
    e.preventDefault();
  };

  const backgroundTransitionStyle = getTransitionStyle(theme, [
    'background-color',
  ]);

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light'
          ? 'rgb(55, 65, 81)'
          : theme.palette.grey[300],
      boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  const handleCloseNotificationMenu = (e) => {
    setAnchorElNotification(null);
  };

  function handleSignOut() {
    dispatch(logout());
  }

  const handleAccount = () => {
    navigate(`/login`);
  };

  const handleDrawer = () => {
    dispatch(toggleDrawer(true));
  };

  const [langPopoverEnchorEl, setLangPopoverEnchorEl] = useState(null);

  const handleLangPopoverOpen = (event) => {
    setLangPopoverEnchorEl(event.currentTarget);
  };

  const handleLangPopoverClose = () => {
    setLangPopoverEnchorEl(null);
  };

  const langPopoverOpen = Boolean(langPopoverEnchorEl);

  const langPopoverId = langPopoverOpen ? 'language-popover' : undefined;

  return (
    <Box
      sx={{
        width: { xs: '100%', md: `calc(100% - ${adminDrawerWidth}px)` },
        ml: { xs: 0, md: `${adminDrawerWidth}px` },
        py: 1.5,
        px: 2,
        bgcolor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'primary.neutral200',
        height: '72px',
      }}
    >
      <Stack direction={'row'} alignItems={'center'} gap={2}>
        <IconButton
          sx={{
            display: { xs: 'inherit', md: 'none' },
            pl: 0,
          }}
          onClick={handleDrawer}
          disableRipple
        >
          <BiMenu
            style={{
              fontSize: '24px',
              color: 'primary.neutral400',
            }}
          />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            color: 'primary.neutral800',
            fontWeight: '500',
            fontSize: '18px',
          }}
        >
          Hi, {user?.userInfo?.displayName.split(' ')[0] || 'Admin'} 👋
        </Typography>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          '& .MuiBadge-badge': {
            fontSize: '9px',
            minWidth: '16px',
            width: '16px',
            height: '16px',
            lineHeight: '16px',
          },
        }}
      >
        <Badge
          badgeContent={
            notifications
              ? notifications?.filter((n) => !n?.isSeen).length.toString()
              : '0'
          }
          color="primary"
          overlap="circular"
          sx={{ cursor: 'pointer' }}
          onClick={handleOpenNotificationMenu}
        >
          <BiBell
            size={isMobile ? 22 : 24}
            color={theme.palette.text.primary}
          />
        </Badge>
        <StyledMenu
          sx={{ mt: '32px', minWidth: '200px' }}
          anchorEl={anchorElNotification}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElNotification)}
          onClose={handleCloseNotificationMenu}
        >
          <Stack sx={{ width: '400px' }}>
            <Stack
              direction={'row'}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'primary.neutral200',
                p: '12px 16px',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <BiBell />
                <Typography variant="body" fontSize={'14px'}>
                  Notifications (
                  {notifications
                    ? notifications?.filter((n) => !n?.isSeen).length.toString()
                    : '0'}
                  )
                </Typography>
              </Stack>
              <Typography
                variant="body"
                fontSize={'14px'}
                sx={{ color: 'primary.main', cursor: 'pointer' }}
              >
                Mark all as read
              </Typography>
            </Stack>

            {/* Notifications */}
            <Stack>
              {notifications ? (
                notifications?.map((notification) => (
                  <NotificationCard
                    key={notification?.id}
                    time={notification?.createdAt}
                    isSeen={notification?.isSeen}
                    title={notification?.title}
                    username={notification?.customer?.username}
                  />
                ))
              ) : (
                <Typography
                  variant="body"
                  fontSize={'14px'}
                  sx={{ p: '12px 16px', textAlign: 'center' }}
                >
                  No notifications
                </Typography>
              )}
            </Stack>
          </Stack>
        </StyledMenu>

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
          sx={{
            mt: 1,
            '& .MuiPaper-root': {
              borderRadius: theme.shape.defaultBorderRadius,
              boxShadow: `px 2px 8px rgba(0,0,0,0.1)`,
              bgcolor: 'transparent',
            },
            '& .MuiPopover-paper': {
              borderRadius: theme.shape.defaultBorderRadius,
              boxShadow: `0px 2px 8px rgba(0,0,0,0.1)`,
            },
          }}
        >
          <Stack
            component={'div'}
            sx={{
              p: 0.5,
              pointerEvents: 'auto',
              width: '200px',
              maxWidth: '200px',
              minWidth: '120px',
              backgroundColor: 'text.white',
            }}
          >
            <List disablePadding>
              <ListItem
                sx={{
                  p: '8px 12px',
                  borderRadius: theme.shape.defaultBorderRadius,
                  '&:hover': {
                    bgcolor: 'primary.neutral100',
                    cursor: 'pointer',
                  },
                  ...backgroundTransitionStyle,
                }}
                onClick={handleSignOut}
              >
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: '15px',
                    color: 'primary.neutral700',
                  }}
                >
                  Logout
                </Typography>
              </ListItem>
            </List>
          </Stack>
        </Popover>
        {user && user?.userInfo ? (
          <>
            <Box sx={{ cursor: 'pointer' }}>
              {user?.userInfo?.photoURL ? (
                <Avatar
                  src={user.userInfo.photoURL}
                  sx={{
                    height: '36px',
                    width: '36px',
                  }}
                  onClick={handleLangPopoverOpen}
                />
              ) : (
                <Avatar
                  src={user?.userInfo?.photoURL}
                  sx={{
                    height: '36px',
                    width: '36px',
                    backgroundColor: user?.userInfo?.profileColor,
                    fontSize: '16px',
                  }}
                  children={`AS`}
                  onClick={handleLangPopoverOpen}
                />
              )}
            </Box>
          </>
        ) : (
          <BiUser
            style={{ cursor: 'pointer' }}
            size={isMobile ? 22 : 24}
            color={theme.palette.text.primary}
            onClick={handleAccount}
          />
        )}
      </Box>
    </Box>
  );
}
