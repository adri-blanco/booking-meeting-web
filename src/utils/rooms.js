/* eslint-disable import/prefer-default-export */

export const isRoomAvailable = (room, when = Date.now()) => {
  const { meetings } = room;

  const actualValue = meetings.reduce((accumulator, actual) => {
    const dateIni = new Date(actual.startTime).getTime();
    const dateEnd = new Date(actual.endTime).getTime();
    if (
      dateIni <= when &&
      (!accumulator.startTime ||
        dateIni > new Date(accumulator.startTime).getTime())
    ) {
      if (dateEnd > when) {
        return actual;
      }
    } else if (
      !accumulator.startTime ||
      dateIni < new Date(accumulator.startTime).getTime()
    ) {
      return actual;
    }
    return accumulator;
  }, {});
  if (room.availability) {
    return {
      isAvailable: room.availability,
      time: actualValue && actualValue.startTime,
      owner: actualValue && actualValue.owner,
    };
  }
  return {
    isAvailable: room.availability,
    time: actualValue && actualValue.endTime,
    owner: actualValue && actualValue.owner,
  };
};

export const getMyBookings = (roomList, groupId) => {
  const roomsBooked = roomList.reduce((rooms, actualRoom) => {
    const bookings = actualRoom.meetings.filter(
      booking => booking.owner === groupId.name
    );
    if (bookings.length > 0) {
      rooms.push({ ...actualRoom, meetings: bookings });
    }
    return rooms;
  }, []);
  return roomsBooked;
};
