'use strict'

const Schema = use('Schema')

class SkillsSchema extends Schema {
  up() {
    this.create('skills', (table) => {
      table.increments()
      table.string('img', 40)
      table.text('data')
      table.timestamps()
    })
  }

  down() {
    this.drop('skills')
  }
}

module.exports = SkillsSchema
