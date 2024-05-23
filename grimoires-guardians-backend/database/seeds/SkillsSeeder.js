'use strict'

const Factory = use('Factory')
const Database = use('Database')

class SkillsSeeder {
  async run() {
    await Database.table('skills').insert([
      // Compétences pour Archer
      { name: 'Tir à l\'arc', description: 'Permet de tirer avec une grande précision à distance.', class_id: 1 },
      { name: 'Maîtrise du tir à distance', description: 'Augmente les dégâts infligés avec des attaques à distance.', class_id: 1 },

      // Compétences pour Champion
      { name: 'Combattant expert', description: 'Augmente l\'efficacité au combat rapproché.', class_id: 2 },
      { name: 'Maîtrise des arts martiaux', description: 'Permet d\'utiliser des techniques avancées de combat à mains nues.', class_id: 2 },

      // Compétences pour Chevalier
      { name: 'Commandement', description: 'Permet de diriger des alliés en combat.', class_id: 3 },
      { name: 'Tactique de combat', description: 'Augmente l\'efficacité des stratégies de combat.', class_id: 3 },

      // Compétences pour Gardien
      { name: 'Défense solide', description: 'Augmente la résistance aux attaques ennemies.', class_id: 4 },
      { name: 'Maîtrise du bouclier', description: 'Permet d\'utiliser le bouclier de manière optimale.', class_id: 4 },

      // Compétences pour Guerrier tribal
      { name: 'Survie en milieu sauvage', description: 'Permet de survivre dans des environnements hostiles.', class_id: 5 },
      { name: 'Maîtrise des armes tribales', description: 'Augmente les dégâts infligés avec des armes tribales.', class_id: 5 },

      // Compétences pour Intrigant
      { name: 'Espionnage', description: 'Permet de recueillir des informations secrètes.', class_id: 6 },
      { name: 'Persuasion', description: 'Augmente les chances de convaincre les autres.', class_id: 6 },

      // Compétences pour Tueur de monstres
      { name: 'Chasse aux monstres', description: 'Augmente les dégâts infligés aux créatures monstrueuses.', class_id: 7 },
      { name: 'Connaissance des créatures', description: 'Permet d\'identifier les faiblesses des monstres.', class_id: 7 },

      // Compétences pour Alchimiste
      { name: 'Création de potions', description: 'Permet de concocter des potions magiques.', class_id: 8 },
      { name: 'Manipulation des substances', description: 'Permet de manipuler des substances alchimiques de manière sûre.', class_id: 8 },

      // Compétences pour Devin
      { name: 'Divination', description: 'Permet de prévoir les événements futurs.', class_id: 9 },
      { name: 'Lecture des signes', description: 'Permet de lire et interpréter les signes mystiques.', class_id: 9 },

      // Compétences pour Druide
      { name: 'Contrôle de la nature', description: 'Permet de manipuler les éléments naturels.', class_id: 10 },
      { name: 'Communion avec les animaux', description: 'Permet de communiquer avec les animaux.', class_id: 10 },

      // Compétences pour Ensorceleur
      { name: 'Enchantement', description: 'Permet d\'enchanter des objets et des personnes.', class_id: 11 },
      { name: 'Manipulation mentale', description: 'Permet de contrôler l\'esprit des autres.', class_id: 11 },

      // Compétences pour Illusionniste
      { name: 'Création d\'illusions', description: 'Permet de créer des illusions pour tromper l\'adversaire.', class_id: 12 },
      { name: 'Discrétion', description: 'Permet de se déplacer sans être détecté.', class_id: 12 },

      // Compétences pour Savant
      { name: 'Technologie avancée', description: 'Augmente les compétences en technologie.', class_id: 13 },
      { name: 'Création d\'automates', description: 'Permet de créer des automates pour le combat.', class_id: 13 },

      // Compétences pour Sorcier
      { name: 'Sorts puissants', description: 'Permet de lancer des sorts très puissants.', class_id: 14 },
      { name: 'Téléportation', description: 'Permet de se téléporter sur une courte distance.', class_id: 14 }
    ])
  }
}

module.exports = SkillsSeeder
