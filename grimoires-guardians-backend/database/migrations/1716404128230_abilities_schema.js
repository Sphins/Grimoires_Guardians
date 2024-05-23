'use strict'

const Schema = use('Schema')

class AbilitiesSchema extends Schema {
  up() {
    this.create('abilities', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('description')
      table.integer('type_id').unsigned().references('id').inTable('ability_types')
      table.integer('hero_id').unsigned().references('id').inTable('heroes')
      table.integer('class_id').unsigned().references('id').inTable('classes')
      table.timestamps()
    })
  }

  down() {
    this.drop('abilities')
  }
}

module.exports = AbilitiesSchema
