'use strict'

const Factory = use('Factory')
const Database = use('Database')

class HeroesSeeder {
  async run() {
    await Database.table('heroes').insert([
      { name: 'Archer', class_id: 1, race_id: 1, level: 1 },
      { name: 'Champion', class_id: 2, race_id: 2, level: 1 },
      { name: 'Chevalier', class_id: 3, race_id: 3, level: 1 }
      // Ajoutez d'autres héros si nécessaire
    ])
  }
}

module.exports = HeroesSeeder
