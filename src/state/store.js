import { init } from '@rematch/core';
import RoomsModel from './rooms-model';

const store = init({
  models: {
    rooms: RoomsModel,
  },
});

export const { dispatch } = store;
export default store;
