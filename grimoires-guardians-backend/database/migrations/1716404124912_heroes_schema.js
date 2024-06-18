'use strict'

const Schema = use('Schema')

class HeroesSchema extends Schema {
  up() {
    this.create('heroes', (table) => {
      table.increments()
      table.string('img', 250)
      table.text('data')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('game_id').unsigned().references('id').inTable('games').onDelete('CASCADE')
      table.text('history')
      table.timestamps()
    })
  }

  down() {
    this.drop('heroes')
  }
}

module.exports = HeroesSchema
