'use strict'

const Schema = use('Schema')

class GamesSchema extends Schema {
  up() {
    this.create('games', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('description')
      table.integer('mj_id').unsigned().references('id').inTable('users')
      table.text('chat_history').nullable()
      table.text('character_files_structure').nullable()
      table.text('item_files_structure').nullable()
      table.text('note_files_structure').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('games')
  }
}

module.exports = GamesSchema
