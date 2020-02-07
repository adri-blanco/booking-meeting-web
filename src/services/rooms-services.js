import axios from './axios';
import { isRoomAvailable, getMyBookings } from '../utils/rooms';
import serverData from '../constants/server-constants';

export default {
  async getRooms() {
    const response = await axios.get('/rooms');

    return response.data;
  },
  async getAuthGroup({ authId }) {
    const data = await axios.get(`/user/${authId}`, {
      profileId: serverData.SERVER_PROFILE_ID,
      authId,
      isSecondaryAuth: false,
      connectionName: '',
    });
    return data.data;
  },
  async bookRoom({ authId, startHour, endHour, room, name }) {
    const response = await axios.post('/book', {
      user: authId,
      room,
      startTime: startHour,
      endTime: endHour,
      name,
    });

    return response.data;
  },

  async bookUpdate({ bookingId, startHour, endHour, roomId }) {
    const response = await axios.put('/book', {
      bookingId,
      room: roomId,
      startTime: startHour,
      endTime: endHour,
    });

    return response.data;
  },

  async getRoomsAvailability({ when }) {
    const response = await this.getRooms();
    return response.map(el => ({
      id: el.id,
      name: el.name,
      floor: el.floor,
      ...isRoomAvailable(el, when),
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
