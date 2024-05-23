'use strict'

const Schema = use('Schema')

class AbilityTypesSchema extends Schema {
  up() {
    this.create('ability_types', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('description')
      table.timestamps()
    })
  }

  down() {
    this.drop('ability_types')
  }
}

module.exports = AbilityTypesSchema
