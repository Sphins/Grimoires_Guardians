'use strict'

const Factory = use('Factory')
const Database = use('Database')

class ClassSeeder {
  async run() {
    await Database.table('classes').insert([
      { name: 'Archer', description: 'Spécialiste du tir à l’arc et du combat à distance.' },
      { name: 'Champion', description: 'Héros courageux spécialiste du combat à mains nues.' },
      { name: 'Chevalier', description: 'Leader capable d’encourager ses camarades, doté d’une épée magique.' },
      { name: 'Gardien', description: 'Combattant spécialisé dans la défense, capable de protéger ses camarades.' },
      { name: 'Guerrier tribal', description: 'Combattant d’une contrée sauvage, spécialiste de la survie dans la nature.' },
      { name: 'Intrigant', description: 'Héros raffiné, aussi à l’aise sur le champ de bataille qu’à la cour du roi.' },
      { name: 'Tueur de monstres', description: 'Spécialiste de la chasse aux monstres, doté d’une force exceptionnelle.' },
      { name: 'Alchimiste', description: 'Chimiste génial, capable de créer des potions magiques.' },
      { name: 'Devin', description: 'Magicien capable de prévoir l’avenir ou de détecter les dangers cachés.' },
      { name: 'Druide', description: 'Spécialiste de la magie de la nature, accompagné d’un familier.' },
      { name: 'Ensorceleur', description: 'Mage subtil capable de contrôler l’esprit de ses adversaires.' },
      { name: 'Illusionniste', description: 'Spécialiste des illusions, capable de se rendre invisible.' },
      { name: 'Savant', description: 'Personnage porté sur les sciences, accompagné d’un automate ou d’un golem.' },
      { name: 'Sorcier', description: 'Sorcier classique capable de lancer de nombreux sorts puissants.' }
    ])
  }
}

module.exports = ClassSeeder
