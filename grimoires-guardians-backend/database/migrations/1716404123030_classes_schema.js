'use strict'

const Schema = use('Schema')

class ClassesSchema extends Schema {
  up() {
    this.create('classes', (table) => {
      table.increments()
      table.string('img', 40)
      table.text('data')
      table.timestamps()
    })
  }

  down() {
    this.drop('classes')
  }
}

module.exports = ClassesSchema
