import { init } from '@rematch/core';
import RoomsModel from './rooms-model';
import SnackBarModel from './snackbar-model';

const store = init({
  models: {
    rooms: RoomsModel,
    snackbar: SnackBarModel,
  },
});

export const { dispatch } = store;
export default store;
