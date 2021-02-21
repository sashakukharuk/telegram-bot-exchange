const axios = require('axios')

module.exports.requestCurrency = async () => {
    return await axios.get("https://api.exchangeratesapi.io/latest?base=USD").then(res => res.data)
}
