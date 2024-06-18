'use strict'

const Schema = use('Schema')

class ItemsSchema extends Schema {
  up() {
    this.create('items', (table) => {
      table.increments()
      table.string('img', 250)
      table.text('data')
      table.integer('game_id').unsigned().references('id').inTable('games').onDelete('CASCADE')
      table.integer('hero_id').unsigned().references('id').inTable('heroes')
      table.timestamps()
    })
  }

  down() {
    this.drop('items')
  }
}

module.exports = ItemsSchema
