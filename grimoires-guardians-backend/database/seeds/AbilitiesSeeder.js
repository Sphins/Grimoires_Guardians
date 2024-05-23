'use strict'

const Factory = use('Factory')
const Database = use('Database')

class AbilitiesSeeder {
  async run() {
    await Database.table('abilities').insert([
      // Capacités pour Archer
      { name: 'Tir précis', description: 'Permet de tirer avec une grande précision.', type_id: 1, class_id: 1 },
      { name: 'Maîtrise de l\'arc', description: 'Augmente les dégâts infligés avec un arc.', type_id: 1, class_id: 1 },

      // Capacités pour Champion
      { name: 'Coup puissant', description: 'Inflige des dégâts importants à un ennemi.', type_id: 1, class_id: 2 },
      { name: 'Maîtrise du combat à mains nues', description: 'Augmente les dégâts infligés en combat à mains nues.', type_id: 1, class_id: 2 },

      // Capacités pour Chevalier
      { name: 'Bouclier de foi', description: 'Crée un bouclier magique qui réduit les dégâts reçus.', type_id: 2, class_id: 3 },
      { name: 'Attaque courageuse', description: 'Augmente les dégâts infligés lorsqu\'il est en première ligne.', type_id: 1, class_id: 3 },

      // Capacités pour Gardien
      { name: 'Bouclier protecteur', description: 'Augmente la défense du personnage et de ses alliés proches.', type_id: 2, class_id: 4 },
      { name: 'Posture défensive', description: 'Réduit les dégâts reçus mais diminue la mobilité.', type_id: 2, class_id: 4 },

      // Capacités pour Guerrier tribal
      { name: 'Rage guerrière', description: 'Augmente les dégâts infligés pendant un certain temps.', type_id: 1, class_id: 5 },
      { name: 'Résistance naturelle', description: 'Augmente la résistance aux dégâts physiques.', type_id: 2, class_id: 5 },

      // Capacités pour Intrigant
      { name: 'Coup de poignard', description: 'Inflige des dégâts supplémentaires lorsqu\'il attaque par surprise.', type_id: 1, class_id: 6 },
      { name: 'Discrétion', description: 'Augmente la capacité à rester inaperçu.', type_id: 2, class_id: 6 },

      // Capacités pour Tueur de monstres
      { name: 'Chasseur de monstres', description: 'Augmente les dégâts infligés aux créatures monstrueuses.', type_id: 1, class_id: 7 },
      { name: 'Connaissance des monstres', description: 'Permet d\'identifier les faiblesses des monstres.', type_id: 2, class_id: 7 },

      // Capacités pour Alchimiste
      { name: 'Concoction de potion', description: 'Permet de créer des potions magiques.', type_id: 3, class_id: 8 },
      { name: 'Lancer de potion', description: 'Permet de lancer des potions à distance.', type_id: 1, class_id: 8 },

      // Capacités pour Devin
      { name: 'Vision de l\'avenir', description: 'Permet de prévoir les événements futurs.', type_id: 3, class_id: 9 },
      { name: 'Détection de la magie', description: 'Permet de détecter les sources de magie.', type_id: 3, class_id: 9 },

      // Capacités pour Druide
      { name: 'Contrôle de la nature', description: 'Permet de manipuler les éléments naturels.', type_id: 3, class_id: 10 },
      { name: 'Transformation animale', description: 'Permet de se transformer en animal.', type_id: 3, class_id: 10 },

      // Capacités pour Ensorceleur
      { name: 'Charme', description: 'Permet de charmer une cible.', type_id: 3, class_id: 11 },
      { name: 'Manipulation mentale', description: 'Permet de contrôler l\'esprit d\'une cible.', type_id: 3, class_id: 11 },

      // Capacités pour Illusionniste
      { name: 'Création d\'illusions', description: 'Permet de créer des illusions pour tromper l\'adversaire.', type_id: 3, class_id: 12 },
      { name: 'Invisibilité', description: 'Permet de devenir invisible pendant un certain temps.', type_id: 3, class_id: 12 },

      // Capacités pour Savant
      { name: 'Construction d\'automates', description: 'Permet de créer des automates pour le combat.', type_id: 3, class_id: 13 },
      { name: 'Savoir technologique', description: 'Augmente les compétences en technologie et ingénierie.', type_id: 3, class_id: 13 },

      // Capacités pour Sorcier
      { name: 'Boule de feu', description: 'Lance une boule de feu qui inflige des dégâts importants.', type_id: 1, class_id: 14 },
      { name: 'Téléportation', description: 'Permet de se téléporter sur une courte distance.', type_id: 3, class_id: 14 }
    ])
  }
}

module.exports = AbilitiesSeeder
