const {Scenes} = require('telegraf')
const {requestCurrency} = require('../helpers/requestCurrency')

module.exports = class SceneExchange {
    list = null
    firstCurrency = null
    firstCurrencyValue = null

    InputFirstCurrency() {
        const currencyFirst = new Scenes.BaseScene('currencyFirst')
        currencyFirst.enter(async (ctx) => {
            await ctx.reply("Enter first currency. Example: USD or usd")
            const data = await requestCurrency()
            this.list = Object.entries(data.rates)
        })
        currencyFirst.on('text', async (ctx) => {
            const message = await ctx.message.text.toUpperCase()
            const findCurrency = this.list.find(item => item[0] === message)
            if (findCurrency) {
                this.firstCurrency = findCurrency
                await ctx.scene.enter('valueFirst')
            } else {
                await ctx.reply("Invalid first currency. Example: USD or usd")
                await ctx.scene.reenter()
            }
        })
        return currencyFirst
    }
    InputValueFirstCurrency() {
        const valueFirst = new Scenes.BaseScene('valueFirst')
        valueFirst.enter(async (ctx) => {
            await ctx.reply("Enter value currency")
        })
        valueFirst.on('text', async (ctx) => {
            const value = Number(ctx.message.text)
            if (value) {
                this.firstCurrencyValue = value
                await ctx.scene.enter('currencySecond')
            } else {
                await ctx.reply("Invalid value currency")
                await ctx.scene.reenter()
            }
        })
        return valueFirst
    }
    InputSecondCurrency() {
        const currencySecond = new Scenes.BaseScene('currencySecond')
        currencySecond.enter(async (ctx) => {
            await ctx.reply("Enter second currency")
        })
        currencySecond.on('text', async (ctx) => {
            const message = await ctx.message.text.toUpperCase()
            const findCurrency = this.list.find(item => item[0] === message)
            if (findCurrency) {
                const fraction = findCurrency[1]/this.firstCurrency[1]*this.firstCurrencyValue
                await ctx.reply(`${findCurrency[0]}: ${fraction.toFixed(2)}`)
                await ctx.scene.leave()
            } else {
                await ctx.reply("Invalid first currency. Example: USD or usd")
                await ctx.scene.reenter()
            }
        })
        return currencySecond
    }
}
