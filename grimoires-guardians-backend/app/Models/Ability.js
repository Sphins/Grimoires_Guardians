'use strict'

const Model = use('Model')

class Ability extends Model {
    type() {
        return this.belongsTo('App/Models/AbilityType')
    }
}

module.exports = Ability
