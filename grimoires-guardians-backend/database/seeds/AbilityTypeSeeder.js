'use strict'

const Factory = use('Factory')
const Database = use('Database')

class AbilityTypeSeeder {
  async run() {
    await Database.table('ability_types').insert([
      { name: 'Attaque', description: 'Les capacités d’attaque augmentent la puissance offensive du héros.' },
      { name: 'Défense', description: 'Les capacités de défense augmentent la résistance et la protection du héros.' },
      { name: 'Soin', description: 'Les capacités de soin permettent de restaurer la santé des alliés.' }
    ])
  }
}

module.exports = AbilityTypeSeeder
