'use strict'

const Schema = use('Schema')

class GameUserSchema extends Schema {
  up() {
    this.create('game_user', (table) => {
      table.increments()
      table.integer('game_id').unsigned().references('id').inTable('games').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('game_user')
  }
}

module.exports = GameUserSchema
