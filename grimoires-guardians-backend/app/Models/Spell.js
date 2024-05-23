'use strict'

const Model = use('Model')

class Spell extends Model {
    type() {
        return this.belongsTo('App/Models/SpellType')
    }
}

module.exports = Spell
