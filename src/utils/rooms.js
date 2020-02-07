/* eslint-disable import/prefer-default-export */

export const getRoomAvailabilityInfo = (room, when = Date.now()) => {
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
  return {
    isAvailable: room.availability,
    time:
      room.availability && actualValue
        ? actualValue.startTime
        : actualValue.endTime,
    owner: actualValue && actualValue.owner,
    meetingName: actualValue && actualValue.name,
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
