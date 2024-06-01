import {
  Timestamp,
  addDoc,
  collection,
  doc,
  endBefore,
  getCountFromServer,
  getDocs,
  getFirestore,
  limit,
  limitToLast,
  or,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';

import { auth, googleProvider } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { Providers, TrialStatus, UserRoles } from '../components/Utils/UIUtils';

const getErrorMessage = (error) => {
  let errorMessage =
    process.env.REACT_APP_ENV === 'development'
      ? error.message
      : 'Something went wrong. Please try again later, or contact support.';
  if (error.code === 'auth/user-not-found') {
    errorMessage = 'User not found';
  } else if (error.code === 'auth/wrong-password') {
    errorMessage = 'Invalid password';
  } else if (error.code === 'auth/email-already-in-use') {
    errorMessage = 'Email already in use';
  } else if (error.code === 'auth/weak-password') {
    errorMessage = 'Password is too weak';
  } else if (error.code === 'auth/too-many-requests') {
    errorMessage = 'Too many requests. Try again later';
  } else if (error.code === 'auth/invalid-login-credentials') {
    errorMessage = 'Invalid login credentials';
  } else if (error.code === 'auth/invalid-email') {
    errorMessage = 'Invalid email';
  }
  return errorMessage;
};

function generateRandomColor() {
  const colors = [
    '#3d8ec2',
    '#6211ee',
    '#44bba7',
    '#f9c851',
    '#f9627d',
    '#f9627d',
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  const bgColor = colors[randomIndex];
  return bgColor;
}

export const saveNewsletterEmail = (email) => async (dispatch) => {
  try {
    dispatch({
      type: 'SAVE_NEWSLETTER_EMAIL_REQUEST',
    });
    const db = getFirestore();

    const docRef = doc(db, 'newsletter_subscribers', email);
    await setDoc(docRef, {
      email: email,
      createdAt: new Date(),
    });

    dispatch({
      type: 'SAVE_NEWSLETTER_EMAIL_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'SAVE_NEWSLETTER_EMAIL_FAILED',
      payload: error.message,
    });
  }
};

export const submitContactForm = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: 'SUBMIT_CONTACT_FORM_REQUEST',
    });

    const db = getFirestore();
    const messagesRef = collection(
      db,
      'contact_forms',
      formData.email,
      'messages'
    );

    await addDoc(messagesRef, {
      ...formData,
      createdAt: Timestamp.fromDate(new Date()),
      isRead: false,
    });

    dispatch({
      type: 'SUBMIT_CONTACT_FORM_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'SUBMIT_CONTACT_FORM_FAILED',
      payload: error.message,
    });
  }
};

function generateTrialId() {
  const timestamp = Date.now().toString().slice(-6);
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const randomLetters = Math.random().toString(36).substring(2, 4);
  return `${randomLetters}${timestamp}${randomDigits}`;
}

export const startTrial = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: 'START_TRIAL_REQUEST',
    });

    const db = getFirestore();
    const trialRef = collection(db, 'trial_requests');

    const q = query(
      trialRef,
      or(
        where('email', '==', formData.email),
        where('fingerprint', '==', formData.fingerprint),
        where('userIp', '==', formData.userIp)
      )
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      dispatch({
        type: 'START_TRIAL_FAILED',
        payload: 'ALREADY_REQUESTED',
      });
      return;
    }
    const trialId = generateTrialId();

    // Get a reference to the "trial_requests" collection
    const trialRequestsCollectionRef = collection(db, 'trial_requests');

    // Add a new document with an auto-generated ID
    const trialDocRef = doc(trialRequestsCollectionRef);
    await setDoc(trialDocRef, {
      ...formData,
      createdAt: Timestamp.now(),
      trialId: trialId,
      status: TrialStatus.PENDING,
      id: trialDocRef.id,
      statusFlags: {
        isRead: false,
        isExpired: false,
        isRejected: false,
        isApproved: false,
        isPurchased: false,
        isCompleted: false,
      },
    });

    dispatch({
      type: 'START_TRIAL_SUCCESS',
      payload: trialId,
    });
  } catch (error) {
    dispatch({
      type: 'START_TRIAL_FAILED',
      payload: error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await auth.signOut();

    localStorage.removeItem('userInfo');
    dispatch({
      type: 'USER_LOGOUT_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'USER_LOGOUT_FAILED',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_REQUEST',
    });

    // Login user
    const authData = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user = authData.user;

    const db = getFirestore();
    const q = query(collection(db, 'users'), where('id', '==', user.uid));
    const qs = await getDocs(q);

    const data = {
      ...qs.docs[0].data(),
      id: authData.user.uid,
      email: authData.user.email,
      displayName: authData.user.displayName,
      photoURL: authData.user.photoURL,
    };

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAILED',
      payload: getErrorMessage(error),
    });
  }
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_REQUEST',
    });

    const authData = await signInWithPopup(auth, googleProvider);

    // Create user in firestore
    const db = getFirestore();

    // Check if user exists in firestore
    const q1 = query(
      collection(db, 'users'),
      where('id', '==', authData.user.uid)
    );

    const qs1 = await getDocs(q1);
    let data;
    if (qs1.size === 0) {
      // Create user in firestore
      data = {
        id: authData.user.uid,
        email: authData.user.email,
        displayName: authData.user.displayName,
        photoURL: authData.user.photoURL,
        phoneNumber: authData.user.phoneNumber,
        profileColor: generateRandomColor(),
        provider: Providers.google,
        roles: [UserRoles.CUSTOMER],
      };
      await setDoc(doc(db, 'users', authData.user.uid), data);
    } else {
      data = {
        id: authData.user.uid,
        email: authData.user.email,
        displayName: authData.user.displayName,
        photoURL: authData.user.photoURL,
        ...qs1.docs[0].data(),
      };
    }

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAILED',
      payload: getErrorMessage(error),
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_REGISTER_REQUEST',
    });

    const db = getFirestore();

    // Register user
    const authData = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user = authData.user;
    await updateProfile(user, {
      displayName: formData.fullName.toLowerCase(),
    });

    const data = {
      id: authData.user.uid,
      email: authData.user.email,
      displayName: authData.user.displayName,
      photoURL: authData.user.photoURL,
      profileColor: generateRandomColor(),
      provider: Providers.email,
      roles: [UserRoles.CUSTOMER],
      phoneNumber: '',
    };

    await setDoc(doc(db, 'users', authData.user.uid), data);

    dispatch({
      type: 'USER_REGISTER_SUCCESS',
      payload: data,
    });

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAILED',
      payload: getErrorMessage(error),
    });
  }
};

export const authStateChanged = (user) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_AUTH_STATE_CHANGED_REQUEST',
    });

    if (user) {
      // If user is logged in, fetch user data and dispatch success action
      const db = getFirestore();
      const q = query(collection(db, 'users'), where('id', '==', user.uid));
      const qs = await getDocs(q);

      const data = {
        ...qs.docs[0].data(),
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      dispatch({
        type: 'USER_AUTH_STATE_CHANGED_SUCCESS',
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } else {
      // If user logs out, dispatch logout action
      dispatch({
        type: 'USER_AUTH_STATE_CHANGED_FAILED',
        payload: null,
      });

      localStorage.removeItem('userInfo');
    }
  } catch (error) {
    dispatch({
      type: 'USER_AUTH_STATE_CHANGED_FAILED',
      payload: getErrorMessage(error),
    });
  }
};

export const listTrials =
  (dir = 'next', pageSize, status) =>
  async (dispatch, getState) => {
    try {
      const {
        listTrials: { trials },
      } = getState();

      dispatch({
        type: 'LIST_TRIALS_REQUEST',
      });

      const db = getFirestore();

      // Query with pagination
      let q0;
      if (dir === 'next') {
        q0 = query(
          collection(db, 'trial_requests'),
          status !== 'all' ? where('status', '==', status) : null,
          orderBy('createdAt', 'desc'),
          limit(pageSize),
          startAfter(Timestamp.fromMillis(trials[trials.length - 1]?.createdAt))
        );
      } else if (dir === 'prev') {
        q0 = query(
          collection(db, 'trial_requests'),
          status !== 'all' ? where('status', '==', status) : null,
          orderBy('createdAt', 'desc'),
          endBefore(Timestamp.fromMillis(trials[0]?.createdAt)),
          limitToLast(pageSize)
        );
      } else {
        q0 = query(
          collection(db, 'trial_requests'),
          status !== 'all' ? where('status', '==', status) : null,
          orderBy('createdAt', 'desc'),
          limit(pageSize)
        );
      }

      const qs0 = await getDocs(q0);
      const data = qs0.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toMillis(),
        };
      });

      // Get total count of trials
      const q1 = query(
        collection(db, 'trial_requests'),
        status !== 'all' ? where('status', '==', status) : null
      );
      const qs1 = await getCountFromServer(q1);
      const count = qs1.data().count;

      dispatch({
        type: 'LIST_TRIALS_SUCCESS',
        payload: {
          trials: data,
          count: count,
        },
      });
    } catch (error) {
      dispatch({
        type: 'LIST_TRIALS_FAILED',
        payload: error.message,
      });
    }
  };

export const bulkUpdateTrials = () => async (dispatch) => {
  try {
    dispatch({
      type: 'BULK_UPDATE_TRIALS_REQUEST',
    });

    const db = getFirestore();
    const batch = [];

    const q = query(collection(db, 'trial_requests'));
    const qs = await getDocs(q);
    const data = qs.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    // filter by doc ids
    const docIds = [
      'timmins8484@gmail.com',
      'bilal1997akram@gmail.com',
      'henrydicky1980@gmail.com',
      'aprimiun09@gmail.com',
      'joelnipkhiz@gmail.com',
      'alvaro@gmail.com',
      'sharadallen109@gmail.com',
      'onyekwerecherechi@gmail.com',
      'afonsonogueiramendes@gmail.com',
    ];

    const filteredData = data.filter((d) => docIds.includes(d.email));

    filteredData.forEach((d) => {
      const docRef = doc(db, 'trial_requests', d.id);
      batch.push(
        updateDoc(docRef, {
          ...d,
          userLanguage: 'en-US',
          status: TrialStatus.EXPIRED,
          statusFlags: {
            isRead: true,
            isExpired: true,
            isRejected: false,
            isApproved: true,
            isPurchased: false,
            isCompleted: false,
          },
        })
      );
    });

    await Promise.all(batch);

    dispatch({
      type: 'BULK_UPDATE_TRIALS_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'BULK_UPDATE_TRIALS_FAILED',
      payload: error.message,
    });
  }
};

export const rejectTrial = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'REJECT_TRIAL_REQUEST',
    });

    if (!id) {
      dispatch({
        type: 'REJECT_TRIAL_FAILED',
        payload: 'Trial id is required',
      });
      return;
    }

    const db = getFirestore();
    const q = query(
      collection(db, 'trial_requests'),
      where('trialId', '==', id)
    );
    const qs = await getDocs(q);
    const data = qs.docs[0].data();

    if (!data) {
      dispatch({
        type: 'REJECT_TRIAL_FAILED',
        payload: 'Trial not found',
      });
      return;
    }

    const newTrial = {
      ...data,
      status: TrialStatus.REJECTED,
      createdAt: data.createdAt.toMillis(),
      statusFlags: {
        ...data.statusFlags,
        isRejected: true,
      },
    };

    await updateDoc(doc(db, 'trial_requests', qs.docs[0].id), {
      ...newTrial,
      createdAt: Timestamp.fromDate(new Date(newTrial.createdAt)),
    });

    dispatch({
      type: 'REJECT_TRIAL_SUCCESS',
    });
    dispatch({
      type: 'UPDATE_LIST_TRIAL_SUCCESS',
      payload: newTrial,
    });
  } catch (error) {
    dispatch({
      type: 'REJECT_TRIAL_FAILED',
      payload: error.message,
    });
  }
};

export const approveTrial = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'APPROVE_TRIAL_REQUEST',
    });

    if (!id) {
      dispatch({
        type: 'APPROVE_TRIAL_FAILED',
        payload: 'Trial id is required',
      });
      return;
    }

    const db = getFirestore();
    const q = query(
      collection(db, 'trial_requests'),
      where('trialId', '==', id)
    );
    const qs = await getDocs(q);
    const data = qs.docs[0].data();

    if (!data) {
      dispatch({
        type: 'APPROVE_TRIAL_FAILED',
        payload: 'Trial not found',
      });
      return;
    }

    const newTrial = {
      ...data,
      status: TrialStatus.APPROVED,
      createdAt: data.createdAt.toMillis(),
      statusFlags: {
        ...data.statusFlags,
        isApproved: true,
        isRead: true,
      },
    };

    await updateDoc(doc(db, 'trial_requests', qs.docs[0].id), {
      ...newTrial,
      createdAt: Timestamp.fromDate(new Date(newTrial.createdAt)),
    });

    dispatch({
      type: 'APPROVE_TRIAL_SUCCESS',
    });
    dispatch({
      type: 'UPDATE_LIST_TRIAL_SUCCESS',
      payload: newTrial,
    });
  } catch (error) {
    dispatch({
      type: 'APPROVE_TRIAL_FAILED',
      payload: error.message,
    });
  }
};

export const getTrialFollowUps = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_TRIAL_FOLLOWUPS_REQUEST',
    });

    if (!id) {
      dispatch({
        type: 'GET_TRIAL_FOLLOWUPS_FAILED',
        payload: 'Trial id is required',
      });
      return;
    }

    const db = getFirestore();
    const q = query(
      collection(db, 'follow_up_emails'),
      where('trialId', '==', id)
    );
    const qs = await getDocs(q);

    if (qs.empty) {
      const followUpRef = collection(db, 'follow_up_emails');
      const newFollowUpDocRef = await addDoc(followUpRef, {
        trialId: id,
        followUps: Array(3).fill({
          dateSent: null,
          sent: false,
        }),
      });

      const followUpData = {
        trialId: id,
        id: newFollowUpDocRef.id,
        followUps: Array(3).fill({
          dateSent: null,
          sent: false,
        }),
      };

      dispatch({
        type: 'GET_TRIAL_FOLLOWUPS_SUCCESS',
        payload: followUpData,
      });
    } else {
      const data = {
        ...qs.docs[0].data(),
        id: qs.docs[0].id,
        followUps: qs.docs[0].data().followUps.map((f) => {
          return {
            ...f,
            dateSent: f.dateSent ? f.dateSent.toMillis() : null,
          };
        }),
      };

      dispatch({
        type: 'GET_TRIAL_FOLLOWUPS_SUCCESS',
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: 'GET_TRIAL_FOLLOWUPS_FAILED',
      payload: error.message,
    });
  }
};

export const sendFollowUpEmail = (id, followUpIndex) => async (dispatch) => {
  try {
    dispatch({
      type: 'SEND_FOLLOWUP_EMAIL_REQUEST',
    });

    if (!id) {
      dispatch({
        type: 'SEND_FOLLOWUP_EMAIL_FAILED',
        payload: 'Trial id is required',
      });
      return;
    }

    const db = getFirestore();
    const q = query(
      collection(db, 'follow_up_emails'),
      where('trialId', '==', id)
    );
    const qs = await getDocs(q);

    if (qs.empty) {
      dispatch({
        type: 'SEND_FOLLOWUP_EMAIL_FAILED',
        payload: 'Follow up not found',
      });
      return;
    }

    const followUpDoc = qs.docs[0];
    const followUpData = followUpDoc.data();

    // Update the followUpData with the new dateSent value
    followUpData.followUps[followUpIndex] = {
      ...followUpData.followUps[followUpIndex],
      dateSent: Timestamp.now(),
      sent: true,
    };

    // Update the document in Firestore
    await updateDoc(doc(db, 'follow_up_emails', followUpDoc.id), followUpData);

    dispatch({
      type: 'UPDATE_TRIAL_FOLLOWUP_SUCCESS',
      payload: {
        ...followUpData,
        followUps: followUpData.followUps.map((f) => {
          return {
            ...f,
            dateSent: f.dateSent ? f.dateSent.toMillis() : null,
          };
        }),
      },
    });

    dispatch({
      type: 'SEND_FOLLOWUP_EMAIL_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'SEND_FOLLOWUP_EMAIL_FAILED',
      payload: error.message,
    });
  }
};
