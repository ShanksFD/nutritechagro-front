import { Outlet } from 'react-router-dom';

import MainHeader from '../components/Header/MainHeader';
import MainFooter from '../components/Footer/MainFooter';

export const DarkThemeLayout = () => {
  return (
    <>
      <MainHeader darkMode />
      <Outlet />
      <MainFooter />
    </>
  );
};
