/* eslint-disable import/prefer-default-export */

export const parseTime = time => {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const getDifferenceInMinutes = (startDate, endDate) => {
  return Math.round((startDate.getTime() - endDate.getTime()) / (1000 * 60));
};
