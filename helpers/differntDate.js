const moment = require("moment")

module.exports.differentTime = (time) => {
	return moment.utc(moment.duration(moment()) - moment.duration(time)).format('mm')
}

module.exports.differentDay = (day) => {
	return moment(new Date() - (1000*60*60*24*day)).format('YYYY-MM-DD')
}
