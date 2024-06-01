import React from 'react';
import { Box, alpha, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { AdminHeader } from '../components/Header/AdminHeader';
import { AdminDrawer } from '../components/Drawer/AdminDrawer';
import { adminDrawerWidth } from '../constants/utilsConstants';
import { theme } from '../theme';

const AdminLayout = () => {
  document.body.style.backgroundColor = alpha(
    theme.palette.primary.neutral100,
    0.25
  );

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  return (
    <>
      <AdminHeader />
      <AdminDrawer />
      <Box
        sx={{
          width: isMobile ? '100%' : `calc(100% - ${adminDrawerWidth}px)`,
          ml: isMobile ? 0 : `${adminDrawerWidth}px`,
          py: 2,
          px: 2,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default AdminLayout;
