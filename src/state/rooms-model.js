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
    async getMyBookings({ user }) {
      const myBookings = await RoomsService.getMyBookings({
        authId: user,
      });
      return myBookings;
    },
    async getActualBooking({ user }) {
      const myBookings = await RoomsService.getMyBookings({
        authId: user,
      });
      const actualBooking = myBookings.find(booking => {
        return booking.meetings.reduce((acc, value) => {
          return (
            acc ||
            (new Date(value.startTime) <= new Date() &&
              new Date(value.endTime) > new Date())
          );
        }, false);
      }, {});
      return actualBooking;
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
