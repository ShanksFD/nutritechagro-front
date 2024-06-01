import { configureStore } from '@reduxjs/toolkit';

import {
  approveTrialReducer,
  contactFormReducer,
  getTrialFollowUpsReducer,
  listTrialsReducer,
  newsletterEmailReducer,
  rejectTrialReducer,
  sendFollowUpEmailReducer,
  startTrialReducer,
  userLoginReducer,
  userRegisterReducer,
} from './reducers/userRecucers';
import { drawerReducer } from './reducers/utilsReducers';

// load data from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Initialize state when page is refreshed localy
const preloadedState = {
  userLogin: {
    userInfo: userInfoFromStorage,
    userAuth: { loading: false, user: null },
  },
  utils: { drawer: false },
};

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    newsletterEmail: newsletterEmailReducer,
    contactForm: contactFormReducer,
    trial: startTrialReducer,
    utils: drawerReducer,
    listTrials: listTrialsReducer,
    rejectTrial: rejectTrialReducer,
    approveTrial: approveTrialReducer,
    getTrialFollowUps: getTrialFollowUpsReducer,
    sendFollowUpEmail: sendFollowUpEmailReducer,
  },
  preloadedState: {
    ...preloadedState,
  },
});

export default store;
