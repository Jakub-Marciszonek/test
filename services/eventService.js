function twoHNotice(eventDate, startTime) {
  const eventStartDateTime = new Date(`${eventDate}T${startTime}`);
  const minAllowedStart = new Date(Date.now() + 2 * 60 * 60 * 1000);
//                                             h^  m^   s^  ms^
  if (eventStartDateTime <= minAllowedStart) {
    throw new Error('Events must start in the future, with at least a two-hour notice');
  }
}

module.exports = {
  twoHNotice,
};