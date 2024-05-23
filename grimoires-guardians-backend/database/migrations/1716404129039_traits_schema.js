'use strict'

const Schema = use('Schema')

class TraitsSchema extends Schema {
  up() {
    this.create('traits', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('description').notNullable()
      table.integer('value').notNullable()
      table.integer('hero_id').unsigned().references('id').inTable('heroes').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('traits')
  }
}

module.exports = TraitsSchema
