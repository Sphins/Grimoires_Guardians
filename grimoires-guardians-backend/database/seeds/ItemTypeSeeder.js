'use strict'

const Factory = use('Factory')
const Database = use('Database')

class ItemTypeSeeder {
  async run() {
    await Database.table('item_types').insert([
      { name: 'Arme', description: 'Les armes sont utilisées pour infliger des dégâts à l’adversaire.' },
      { name: 'Armure', description: 'Les armures protègent le porteur en augmentant sa défense.' },
      { name: 'Accessoire', description: 'Les accessoires offrent des bonus supplémentaires.' }
    ])
  }
}

module.exports = ItemTypeSeeder
