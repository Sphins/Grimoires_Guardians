'use strict'

const Factory = use('Factory')
const Database = use('Database')

class ItemsSeeder {
  async run() {
    await Database.table('items').insert([
      { name: 'Épée longue', description: 'Une épée longue utilisée par les combattants.', type_id: 1 },
      { name: 'Hache de bataille', description: 'Une hache puissante utilisée pour les combats rapprochés.', type_id: 1 },
      { name: 'Arc long', description: 'Un arc utilisé pour les attaques à distance.', type_id: 1 },
      { name: 'Bâton magique', description: 'Un bâton enchanté utilisé par les sorciers.', type_id: 1 },
      { name: 'Armure légère', description: 'Une armure légère offrant une protection basique.', type_id: 2 },
      { name: 'Armure de plates', description: 'Une armure lourde offrant une grande protection.', type_id: 2 },
      { name: 'Bouclier en bois', description: 'Un bouclier simple en bois.', type_id: 2 }
    ])
  }
}

module.exports = ItemsSeeder
