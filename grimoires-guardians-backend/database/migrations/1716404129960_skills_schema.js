'use strict'

const Schema = use('Schema')

class SkillsSchema extends Schema {
  up() {
    this.create('skills', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('description')
      table.integer('class_id').unsigned().references('id').inTable('classes')
      table.timestamps()
    })
  }

  down() {
    this.drop('skills')
  }
}

module.exports = SkillsSchema
