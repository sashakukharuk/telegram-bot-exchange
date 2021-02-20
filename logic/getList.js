const {getList, createList, updateList} = require('../controlles/list')
const {listCurrency} = require('./listCurrency')
const {differentTime} = require('../helpers/differntDate')

module.exports.getList = async (id) => {
    const listData = await getList(id)
    if (listData) {
        const different = differentTime(listData.time)
        if (different < 10) {
            return listData.currencies
        } else {
            const list = await listCurrency()
            await updateList({id, time: Date.now(), currencies: list})
            return list
        }
    } else {
        const list = await listCurrency()
        await createList({id, currencies: list})
        return list
    }
}
