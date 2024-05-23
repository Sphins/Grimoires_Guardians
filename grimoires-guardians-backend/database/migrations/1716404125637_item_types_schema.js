'use strict'

const Schema = use('Schema')

class ItemTypesSchema extends Schema {
  up() {
    this.create('item_types', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('description')
      table.timestamps()
    })
  }

  down() {
    this.drop('item_types')
  }
}

module.exports = ItemTypesSchema
