
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
   
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
   
  function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  function formatDate(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    return [year, month, day].map(formatNumber).join('/')
  }

  function formatDateForAndroid10(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    return [year, month, day].map(formatNumber).join('-')
  }

  function concatDate(date, time){
      return date + ' ' + time + ':00'
  }
   
  module.exports = {
    formatTime,
    formatDate,
    formatDateForAndroid10,
    concatDate
  }
   