'use strict'

const Factory = use('Factory')
const Database = use('Database')

class CreaturesSeeder {
  async run() {
    await Database.table('creatures').insert([
      { name: 'Gobelin', type: 'Monstre', hit_points: 30, abilities: 'Attaque rapide, Faible défense' },
      { name: 'Troll', type: 'Monstre', hit_points: 120, abilities: 'Régénération, Force brute' },
      { name: 'Dragon', type: 'Créature magique', hit_points: 300, abilities: 'Souffle de feu, Vol, Écailles résistantes' },
      { name: 'Loup-garou', type: 'Créature surnaturelle', hit_points: 150, abilities: 'Transformation, Griffes acérées, Régénération' }
    ])
  }
}

module.exports = CreaturesSeeder
