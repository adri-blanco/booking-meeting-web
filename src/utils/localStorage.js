const keyStorage = 'booking-meeting-web-user';

function getLastUserUsed() {
  return localStorage.getItem(keyStorage) || '';
}

function setLastUserUsed(user) {
  localStorage.setItem(keyStorage, user);
}

module.exports = {
  getLastUserUsed,
  setLastUserUsed,
};
