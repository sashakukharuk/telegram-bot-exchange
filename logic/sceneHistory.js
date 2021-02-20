const {Scenes} = require('telegraf')
const moment = require("moment")
const axios = require('axios')
const {requestCurrency} = require('../helpers/requestCurrency')
const {differentDay} = require('../helpers/differntDate')
const {generateChart} = require('./generateChart')

module.exports = class SceneHistory {
    list = null

    InputCurrency() {
        const currency = new Scenes.BaseScene('currencyHistory')
        currency.enter(async (ctx) => {
            await ctx.reply("Enter currency. Example: USD or usd")
            const data = await requestCurrency()
            this.list = Object.entries(data.rates)
        })
        currency.on('text', async (ctx) => {
            const message = await ctx.message.text.toUpperCase()
            const findCurrency = this.list.find(item => item[0] === message)
            if (findCurrency) {
                const rates = await this.requestHistory(findCurrency[0])
                const chart = await generateChart(rates)
                await ctx.reply(chart)
                await ctx.scene.leave()
            } else {
                await ctx.reply("Invalid first currency. Example: USD or usd")
                await ctx.scene.reenter()
            }
        })
        return currency
    }
   async requestHistory(currency) {
        const endDate = moment().format('YYYY-MM-DD')
        const startDate = differentDay(9)
        return  await axios.get(`https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=USD&symbols=${currency}`).then(res => res.data.rates)
    }
}
