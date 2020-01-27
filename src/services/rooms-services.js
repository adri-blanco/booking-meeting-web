import Rooms from '../constants/rooms-constants';
import axios from './axios';
import serverData from '../constants/server-constants';

export default {
  getRooms() {
    return Rooms;
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
};
