export const drawerReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_DRAWER':
      return { drawer: !state.drawer };
    default:
      return state;
  }
};
