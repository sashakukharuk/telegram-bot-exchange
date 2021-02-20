const {requestCurrency} = require('../helpers/requestCurrency')

module.exports.listCurrency = async () => {
    let listCurrency = `List currency: \n`
    const data = await requestCurrency()
    const rates = Object.entries(data.rates)
    rates.forEach(item => {
        const different = 1/item[1]
        listCurrency += `
		${item[0]}: ${item[1].toFixed(2)} 
		${item[0]}: ${item[1].toFixed(2)} USD: ${different.toFixed(2)}
		`
    })
    return listCurrency
}
