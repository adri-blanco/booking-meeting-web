export default {
  state: {
    generalError: null,
  },
  reducers: {
    setGeneralError(state, error) {
      return {
        ...state,
        generalError: error,
      };
    },
  },
}