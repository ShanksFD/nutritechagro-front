import { Routes as WebRoutes, Route, Navigate } from 'react-router';
import { useSelector } from 'react-redux';

import AdminRoute from './auth/AdminRoute';

import LightThemeLayout from './layouts/LightThemeLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';

import NotFound from './pages/NotFound/NotFound';
import FreeTrial from './pages/FreeTrial/FreeTrial';
import FreeTrialSuccess from './pages/FreeTrial/FreeTrialSuccess';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AdminTrials from './pages/Admin/AdminTrials';
import AdminSettings from './pages/Admin/AdminSettings';
import AdminSupport from './pages/Admin/AdminSupport';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminCustomers from './pages/Admin/AdminCustomers';

export default function Routes() {
  const user = useSelector((state) => state.userLogin);
  return (
    <WebRoutes>
      {/* LightTheme Layout */}
      <Route element={<LightThemeLayout />}>
        <Route path="/" Component={FreeTrial} exact></Route>
        <Route path="*" Component={NotFound}></Route>
        <Route path="/trial-success" Component={FreeTrialSuccess}></Route>
      </Route>

      {/* Auth Layout */}
      <Route element={user.userInfo ? <Navigate to={'/'} /> : <AuthLayout />}>
        <Route path="/login" Component={Login}></Route>
        <Route path="/register" Component={Register}></Route>
      </Route>

      {/* Admin Layout */}
      <Route
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />}></Route>
        <Route path="/admin/trials" element={<AdminTrials />}></Route>
        <Route path="/admin/settings" element={<AdminSettings />}></Route>
        <Route path="/admin/support" element={<AdminSupport />}></Route>
        <Route path="/admin/orders" element={<AdminOrders />}></Route>
        <Route path="/admin/products" element={<AdminProducts />}></Route>
        <Route path="/admin/customers" element={<AdminCustomers />}></Route>
      </Route>
    </WebRoutes>
  );
}
