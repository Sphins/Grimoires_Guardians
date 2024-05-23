'use strict'

const Factory = use('Factory')
const Database = use('Database')

class TraitsSeeder {
  async run() {
    await Database.table('traits').insert([
      { name: 'Force', description: 'Détermine la puissance physique du personnage.', value: 0, hero_id: 1 },
      { name: 'Agilité', description: 'Détermine la dextérité et la rapidité du personnage.', value: 0, hero_id: 1 },
      { name: 'Intelligence', description: 'Détermine la capacité du personnage à apprendre et à utiliser des compétences magiques.', value: 0, hero_id: 1 },
      { name: 'Charisme', description: 'Détermine la capacité du personnage à influencer et à charmer les autres.', value: 0, hero_id: 1 },
      { name: 'Constitution', description: 'Détermine la résistance physique et la santé du personnage.', value: 0, hero_id: 1 }
    ])
  }
}

module.exports = TraitsSeeder
