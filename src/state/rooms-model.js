import RoomsService from '../services/rooms-services';
import { setLastUserUsed } from '../utils/localStorage';

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
    async setRoomsAvailability({ when }) {
      const rooms = await RoomsService.getRoomsAvailability({ when });
      dispatch.rooms.setRooms(rooms);
    },
    async getCurrentBooking({ user }) {
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
    async bookRoom(values) {
      const startHourDate = new Date(values.startHour);
      const initialDate = new Date(values.date);
      initialDate.setHours(
        startHourDate.getHours(),
        startHourDate.getMinutes(),
        0,
        0
      );

      const endDate = new Date(values.date);
      const endHourDate = new Date(values.endHour);
      endDate.setHours(endHourDate.getHours(), endHourDate.getMinutes(), 0, 0);
      setLastUserUsed(values.authId);

      try {
        await RoomsService.bookRoom({
          ...values,
          startHour: initialDate.toISOString(),
          endHour: endDate.toISOString(),
        });

        await dispatch.snackbar.openSnackbar({
          message: 'Room booked succesfully',
        });
      } catch (err) {
        await dispatch.snackbar.openSnackbar({
          message:
            'Oops, something went wrong, check that the room is available or you have an internet connection',
          type: 'danger',
        });
      }
    },
    async extendTime(payload) {
      const { bookingId, startHour, endHour, roomId } = payload;
      try {
        await RoomsService.bookUpdate({
          bookingId,
          startHour,
          endHour: new Date(
            new Date(endHour).getTime() + 15 * 60 * 1000
          ).toISOString(),
          roomId,
        });
        await dispatch.snackbar.openSnackbar({
          message: 'Current booking extended 15 min',
        });
      } catch (err) {
        await dispatch.snackbar.openSnackbar({
          message: 'Oops, something went wrong, cannot extend your booking',
          type: 'danger',
        });
      }
    },
    async endBooking(payload) {
      const { bookingId, startHour, roomId } = payload;
      try {
        await RoomsService.bookUpdate({
          bookingId,
          startHour,
          endHour: new Date().toISOString(),
          roomId,
        });
        await dispatch.snackbar.openSnackbar({
          message: 'Current booking ended',
        });
      } catch (err) {
        await dispatch.snackbar.openSnackbar({
          message: 'Oops, something went wrong, cannot end your booking',
          type: 'danger',
        });
      }
    },
  }),
};
