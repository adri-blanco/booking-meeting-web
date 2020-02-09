import { init } from '@rematch/core';
import RoomsModel from './rooms-model';
import SnackBarModel from './snackbar-model';
import GlobalModel from './global-model';

const store = init({
  models: {
    rooms: RoomsModel,
    snackbar: SnackBarModel,
    global: GlobalModel,
  },
});

export const { dispatch } = store;
export default store;
