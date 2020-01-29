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
    async getRoomsAvailability({ when }) {
      const rooms = await RoomsService.getRoomsAvailability({ when });
      dispatch.rooms.setRooms(rooms);
    },
    async bookRoom(payload) {
      const {
        authId,
        startHour,
        endHour,
        roomId,
        authName,
        eventName,
      } = payload;
      const response = await RoomsService.bookRoom({
        authId,
        startHour,
        endHour,
        roomId,
        authName,
        eventName,
      });
      return response;
    },
  }),
};
