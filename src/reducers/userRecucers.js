export const newsletterEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_NEWSLETTER_EMAIL_REQUEST':
      return { loading: true };

    case 'SAVE_NEWSLETTER_EMAIL_SUCCESS':
      return { loading: false, success: true };

    case 'SAVE_NEWSLETTER_EMAIL_FAILED':
      return { loading: false, error: action.payload };
    case 'CLEAR_NEWSLETTER_EMAIL_STATUS':
      return {};
    default:
      return state;
  }
};

export const contactFormReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SUBMIT_CONTACT_FORM_REQUEST':
      return { loading: true };

    case 'SUBMIT_CONTACT_FORM_SUCCESS':
      return { loading: false, success: true };

    case 'SUBMIT_CONTACT_FORM_FAILED':
      return { loading: false, error: action.payload };
    case 'CLEAR_CONTACT_FORM_STATUS':
      return {};
    default:
      return state;
  }
};

export const startTrialReducer = (state = {}, action) => {
  switch (action.type) {
    case 'START_TRIAL_REQUEST':
      return { loading: true };
    case 'START_TRIAL_SUCCESS':
      return { loading: false, success: true, trialId: action.payload };
    case 'START_TRIAL_FAILED':
      return { loading: false, error: action.payload };
    case 'CLEAR_START_TRIAL_STATUS':
      return { trialId: state.trialId };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { loading: true };
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, userInfo: action.payload };
    case 'USER_LOGIN_FAILED':
      return { loading: false, error: action.payload };
    case 'USER_LOGOUT_SUCCESS':
      return {
        userAuth: { loading: false, user: null },
      };
    case 'USER_LOGOUT_FAILED':
      return { loading: false, error: action.payload };
    case 'USER_AUTH_STATE_CHANGED_REQUEST':
      return { ...state, userAuth: { loading: true } };
    case 'USER_AUTH_STATE_CHANGED_SUCCESS':
      return { ...state, userAuth: { loading: false, user: action.payload } };
    case 'USER_AUTH_STATE_CHANGED_FAILED':
      return { ...state, userAuth: { loading: false, error: action.payload } };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_REGISTER_REQUEST':
      return { loading: true };
    case 'USER_REGISTER_SUCCESS':
      return { loading: false, userInfo: action.payload };
    case 'USER_REGISTER_FAILED':
      return { loading: false, error: action.payload };
    case 'USER_LOGOUT_SUCCESS':
      return { userAuth: { loading: false, user: null } };
    default:
      return state;
  }
};

export const listTrialsReducer = (state = { trials: [], count: 0 }, action) => {
  switch (action.type) {
    case 'LIST_TRIALS_REQUEST':
      return { loading: true, trials: [], count: 0 };
    case 'LIST_TRIALS_SUCCESS':
      return {
        loading: false,
        trials: action.payload.trials,
        count: action.payload.count,
      };
    case 'UPDATE_LIST_TRIAL_SUCCESS':
      const updatedTrials = state.trials.map((trial) => {
        if (trial.trialId === action.payload.trialId) {
          return { ...action.payload };
        }
        return trial;
      });
      return {
        loading: false,
        trials: updatedTrials,
        count: state.count,
      };
    case 'LIST_TRIALS_FAILED':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rejectTrialReducer = (
  state = {
    loading: false,
    success: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case 'REJECT_TRIAL_REQUEST':
      return { loading: true };
    case 'REJECT_TRIAL_SUCCESS':
      return { loading: false, success: true };
    case 'REJECT_TRIAL_FAILED':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const approveTrialReducer = (
  state = {
    loading: false,
    success: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case 'APPROVE_TRIAL_REQUEST':
      return { loading: true };
    case 'APPROVE_TRIAL_SUCCESS':
      return { loading: false, success: true };
    case 'APPROVE_TRIAL_FAILED':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTrialFollowUpsReducer = (
  state = {
    loading: false,
    followUps: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case 'GET_TRIAL_FOLLOWUPS_REQUEST':
      return { loading: true };
    case 'GET_TRIAL_FOLLOWUPS_SUCCESS':
      return { loading: false, followUps: action.payload };
    case 'GET_TRIAL_FOLLOWUPS_FAILED':
      return { loading: false, error: action.payload };
    case 'GET_TRIAL_FOLLOWUPS_RESET':
      return { loading: false, followUps: [] };
    case 'UPDATE_TRIAL_FOLLOWUP_SUCCESS':
      return {
        loading: false,
        followUps: {
          ...state.followUps,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const sendFollowUpEmailReducer = (
  state = {
    loading: false,
    success: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case 'SEND_FOLLOWUP_EMAIL_REQUEST':
      return { loading: true };
    case 'SEND_FOLLOWUP_EMAIL_SUCCESS':
      return { loading: false, success: true };
    case 'SEND_FOLLOWUP_EMAIL_FAILED':
      return { loading: false, error: action.payload };
    case 'SEND_FOLLOWUP_EMAIL_RESET':
      return { loading: false, success: false, error: null };
    default:
      return state;
  }
};
