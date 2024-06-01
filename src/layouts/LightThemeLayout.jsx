import { Outlet } from 'react-router-dom';

import MainHeader from '../components/Header/MainHeader';
import MainFooter from '../components/Footer/MainFooter';

const LightThemeLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  );
};

export default LightThemeLayout;
