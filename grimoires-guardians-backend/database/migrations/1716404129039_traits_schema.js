'use strict'

const Schema = use('Schema')

class TraitsSchema extends Schema {
  up() {
    this.create('traits', (table) => {
      table.increments()
      table.string('img', 40)
      table.text('data')
      table.timestamps()
    })
  }

  down() {
    this.drop('traits')
  }
}

module.exports = TraitsSchema
