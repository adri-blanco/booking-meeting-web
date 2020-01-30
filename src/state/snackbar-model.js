export default {
  state: {
    message: '',
  },
  reducers: {
    setMessage(state, message) {
      return {
        ...state,
        message,
      };
    },
  },
  effects: dispatch => ({
    async openSnackbar(payload) {
      dispatch.snackbar.setMessage(payload.message);
    },
  }),
};
