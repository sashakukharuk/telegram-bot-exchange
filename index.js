require('dotenv').config()
const { Telegraf, Scenes, Markup, session} = require('telegraf')
const mongoose = require('mongoose')
const SceneExchange = require('./logic/sceneExchange')
const SceneHistory = require('./logic/sceneHistory')
const {getList} = require('./logic/getList')
const commands = `Commands: 
		/list - shows a list of currencies with the exchange rate;
		/exchange - carries out the result of currency exchange;
		/history - returns the exchange rate history for the last seven days;
		/help - will show commands again.`

const bot = new Telegraf(process.env.BOT_TOKEN)

const exchange = new SceneExchange()
const history = new SceneHistory()

const firstCurrency = exchange.InputFirstCurrency()
const valueFirst = exchange.InputValueFirstCurrency()
const secondCurrency = exchange.InputSecondCurrency()
const historyCurrency = history.InputCurrency()

const stage = new Scenes.Stage([firstCurrency, valueFirst, secondCurrency, historyCurrency])

bot.use(session())
bot.use(stage.middleware())

mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology: true, useNewUrlParser: true})
	.then(()=> console.log('MongoDB connected'))
	.catch(error => console.log(error))

bot.start((ctx) =>
	ctx.reply( `Welcome\n${commands}`,
		Markup.keyboard([
			['list', 'exchange'],
			['history'],
		])
			.resize()
	)
);

bot.help((ctx) => {
	ctx.reply(commands)
})

bot.hears(['list', '/list'], async (ctx) => {
        const list = await getList(ctx.message.chat.id)
        ctx.reply(list)
})

bot.hears(['exchange', '/exchange'], async (ctx) => await ctx.scene.enter('currencyFirst'))

bot.hears(['history', '/history'], async (ctx) => await ctx.scene.enter('currencyHistory'))

bot.launch()
