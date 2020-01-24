import RoomsService from '../services/rooms-services';

export default {
  state: {
    rooms: [],
  },
  reducers: {
    setRooms(state, rooms) {
      return {
        ...state,
        rooms,
      };
    },
  },
  effects: dispatch => ({
    async getRooms() {
      const rooms = await RoomsService.getRooms();
      dispatch.rooms.setRooms(rooms);
    },
  }),
};
