const datetime = {}

datetime.getCurrentDateString = function () {
  return new Date().toISOString().slice(0, 19).replace('T', ' ')
}

datetime.getDateString = function (date) {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}

datetime.checkDate = function (date) {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    // it is a date
    return !isNaN(date.getTime())
  } else {
    // not a date
    return false
  }
}

module.exports = datetime
