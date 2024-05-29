'use strict'

const Schema = use('Schema')

class CreaturesSchema extends Schema {
  up() {
    this.create('creatures', (table) => {
      table.increments()
      table.string('img', 40)
      table.text('data')
      table.timestamps()
    })
  }

  down() {
    this.drop('creatures')
  }
}

module.exports = CreaturesSchema
