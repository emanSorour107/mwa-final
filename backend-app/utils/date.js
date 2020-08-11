const DateUtils = {
    dateAfterDays : function (days) {
        let date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    },

    formatDate : function (date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
      }
      
    //   var d = new Date();
    //   var e = formatDate(d);
    //   alert(e);
}

module.exports = DateUtils