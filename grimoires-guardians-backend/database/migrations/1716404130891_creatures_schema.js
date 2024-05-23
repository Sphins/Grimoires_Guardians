'use strict'

const Schema = use('Schema')

class CreaturesSchema extends Schema {
  up() {
    this.create('creatures', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('type', 80)
      table.integer('hit_points')
      table.text('abilities')
      table.timestamps()
    })
  }

  down() {
    this.drop('creatures')
  }
}

module.exports = CreaturesSchema
