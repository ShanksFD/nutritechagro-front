import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { authStateChanged } from '../actions/userActions';
import { auth } from '../config/firebase';
import {
  WebsiteLoader,
  hasRoles,
  UserRoles,
} from '../components/Utils/UIUtils';

const AdminRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.userLogin?.userAuth);
  const [authProcessed, setAuthProcessed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(authStateChanged(user));
      setAuthProcessed(true);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (!authProcessed || loading) {
    return <WebsiteLoader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!hasRoles(user, [UserRoles.ADMINISTRATOR])) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
