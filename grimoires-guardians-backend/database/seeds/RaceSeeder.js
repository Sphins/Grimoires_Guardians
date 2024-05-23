'use strict'

const Factory = use('Factory')
const Database = use('Database')

class RaceSeeder {
  async run() {
    await Database.table('races').insert([
      { name: 'Humains', description: 'Les humains sont les habitants les plus courants d’Alysia. Ils sont polyvalents et peuvent exercer toutes les professions.' },
      { name: 'Elfes', description: 'Les elfes sont gracieux et éduqués, avec des oreilles pointues et des cheveux de couleurs variées. Ils viennent d’Astria.' },
      { name: 'Jaguarian', description: 'Les jaguarians ont une apparence féline avec une fourrure et des griffes redoutables. Ils ont un odorat et une ouïe développés.' }
    ])
  }
}

module.exports = RaceSeeder
