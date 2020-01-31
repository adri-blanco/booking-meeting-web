export default {
  state: {
    message: '',
    type: '',
  },
  reducers: {
    setMessage(state, message) {
      return {
        ...state,
        message,
      };
    },
    setType(state, type) {
      return {
        ...state,
        type,
      };
    },
  },
  effects: dispatch => ({
    async openSnackbar(payload) {
      dispatch.snackbar.setMessage(payload.message);
      dispatch.snackbar.setType(payload.type || 'normal');
    },
  }),
};
