'use strict'

const Schema = use('Schema')

class ClassesSchema extends Schema {
  up() {
    this.create('classes', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('description')
      table.timestamps()
    })
  }

  down() {
    this.drop('classes')
  }
}

module.exports = ClassesSchema
