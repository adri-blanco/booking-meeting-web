import axios from './axios';
import { getRoomAvailabilityInfo, getMyBookings } from '../utils/rooms';

export default {
  async getRooms() {
    return axios.get('/rooms');
  },
  async getAuthGroup({ authId }) {
    const { data } = await axios.get(`/user/${authId}`);
    return data;
  },
  async bookRoom({ authId, startHour, endHour, room, name }) {
    return axios.post('/book', {
      user: authId,
      room,
      startTime: startHour,
      endTime: endHour,
      name,
    });
  },

  async bookUpdate({ bookingId, startHour, endHour, roomId }) {
    return axios.put('/book', {
      bookingId,
      room: roomId,
      startTime: startHour,
      endTime: endHour,
    });
  },

  async getRoomsAvailability({ when }) {
    const response = await this.getRooms();
    return response.map(el => ({
      id: el.id,
      name: el.name,
      floor: el.floor,
      ...getRoomAvailabilityInfo(el, when),
    }));
  },

  async getMyBookings({ authId, time }) {
    const groupId = await this.getAuthGroup({
      authId,
    });
    const rooms = await this.getRooms();

    return getMyBookings(rooms, groupId, time);
  },
};
