const List = require('../modules/List')

module.exports.getList = async (id) => {
    try {
        return await List.findOne({id})
    } catch (err) {
        console.log(err)
    }
}

module.exports.createList = async (item) => {
    try {
       await new List({
            id: item.id,
            time: Date.now(),
            currencies: item.currencies
        }).save()
    } catch (err) {
        console.log(err)
    }
}

module.exports.updateList = async (item) => {
    try {
        await List.findOneAndUpdate(
            {id: item.id},
            {$set: item},
            {new: true}
        )
    } catch (err) {
        console.log(err)
    }
}

