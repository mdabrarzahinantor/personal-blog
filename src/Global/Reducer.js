export const initialState = {
  user: null,
  noteForm: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  TOGGLE_NOTE_FORM: "TOGGLE_NOTE_FORM",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action?.user,
      };
    case actionTypes.TOGGLE_NOTE_FORM:
      return {
        ...state,
        noteForm: action?.noteForm,
      };

    default:
      return state;
  }
};

export default reducer;
