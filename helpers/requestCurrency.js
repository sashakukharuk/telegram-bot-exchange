const axios = require('axios')

module.exports.requestCurrency = async () => {
    return await axios.get("https://api.exchangeratesapi.io/latest?base%DUSD").then(res => res.data)
}
