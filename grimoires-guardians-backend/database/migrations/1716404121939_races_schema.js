'use strict'

const Schema = use('Schema')

class RacesSchema extends Schema {
  up() {
    this.create('races', (table) => {
      table.increments()
      table.string('img', 40)
      table.text('data')
      table.timestamps()
    })
  }

  down() {
    this.drop('races')
  }
}

module.exports = RacesSchema
