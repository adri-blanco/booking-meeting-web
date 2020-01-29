const { getTimeFromUTCStringFormatDate } = require('./date');

const isRoomAvailable = (room, when = Date.now()) => {
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

const getMyBookings = (roomList, groupId, rooms) => {
  const myBookings = [];
  const now = Date.now();

  const roomBookings = roomList.map(room => {
    return room.Data1.filter(booking => booking.GroupID === groupId);
  });

  roomBookings.forEach((bookings, index) => {
    if (bookings.length) {
      bookings.forEach(booking => {
        const endTime = getTimeFromUTCStringFormatDate(
          booking.UTCReservedEndDateTime
        );
        if (endTime > now) {
          myBookings.push({
            roomName: rooms[index].name,
            floor: rooms[index].floor,
            eventName: booking.EventName,
            startTime: getTimeFromUTCStringFormatDate(
              booking.UTCReservedStartDateTime
            ),
            endTime,
          });
        }
      });
    }
  });
  return myBookings;
};

module.exports = {
  isRoomAvailable,
  getMyBookings,
};
