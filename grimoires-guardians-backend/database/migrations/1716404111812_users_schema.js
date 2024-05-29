'use strict'

const Schema = use('Schema')

class UsersSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 40).notNullable().unique()
      table.string('email', 250).notNullable().unique()
      table.string('password', 250).notNullable()
      table.string('img', 40)
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UsersSchema
