const {requestCurrency} = require('../helpers/requestCurrency')

module.exports.listCurrency = async () => {
    let listCurrency = `List currency: \n`
    const data = await requestCurrency()
    const rates = Object.entries(data.rates)
    rates.forEach(item => {
        listCurrency += `${item[0]}: ${item[1].toFixed(2)}\n`
    })
    return listCurrency
}
