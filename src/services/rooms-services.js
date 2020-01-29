import axios from './axios';
import { isRoomAvailable, getMyBookings } from '../utils/rooms';
import serverData from '../constants/server-constants';

const buildGetBookingRequests = rooms => {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const params = {
    utcStart: startDate.toISOString(),
    // profileId: SERVER_PROFILE_ID,
    pollingInterval: 122000,
  };
  return rooms.map(el => axios.get('/rooms', { ...params, roomId: el.id }));
};

export default {
  async getRooms() {
    const response = await axios.get('/rooms');

    return response.data;
  },
  async getAuthGroup({ authId, roomId }) {
    const data = await axios.post('/Display/AuthenticateGroup', {
      roomId,
      profileId: serverData.SERVER_PROFILE_ID,
      authId,
      isSecondaryAuth: false,
      connectionName: '',
    });
    return data.Data1[0].GroupID;
  },
  async bookRoom({ authId, startHour, endHour, roomId, authName, eventName }) {
    const groupId = await this.getAuthGroup({ authId, roomId });
    const response = await axios.post('/Display/AddBooking', {
      roomId,
      profileId: serverData.SERVER_PROFILE_ID,
      isSecondaryAuth: false,
      utcStart: startHour,
      utcEnd: endHour,
      groupId,
      contactId: 0,
      groupName: authName,
      eventName,
      attendance: 1,
      connectionName: '',
    });

    return response.Data[0];
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
      roomId: this.getRooms()[0].id,
    });
    const rooms = this.getRooms();
    const data = await Promise.all(buildGetBookingRequests(rooms));

    return getMyBookings(data, groupId, rooms, time);
  },
};
