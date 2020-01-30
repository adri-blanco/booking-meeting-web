/* eslint-disable import/prefer-default-export */

const keyStorage = 'booking-meeting-web-user';

export function getLastUserUsed() {
  return localStorage.getItem(keyStorage) || '';
}

export function setLastUserUsed(user) {
  localStorage.setItem(keyStorage, user);
}
