'use strict'

const Model = use('Model')

class Item extends Model {
    type() {
        return this.belongsTo('App/Models/ItemType')
    }
}

module.exports = Item
