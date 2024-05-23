'use strict'

const Schema = use('Schema')

class ItemsSchema extends Schema {
  up() {
    this.create('items', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('description')
      table.integer('type_id').unsigned().references('id').inTable('item_types')
      table.integer('hero_id').unsigned().references('id').inTable('heroes')
      table.timestamps()
    })
  }

  down() {
    this.drop('items')
  }
}

module.exports = ItemsSchema
