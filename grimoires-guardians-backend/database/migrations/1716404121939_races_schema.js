'use strict'

const Schema = use('Schema')

class RacesSchema extends Schema {
  up() {
    this.create('races', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('description')
      table.timestamps()
    })
  }

  down() {
    this.drop('races')
  }
}

module.exports = RacesSchema
