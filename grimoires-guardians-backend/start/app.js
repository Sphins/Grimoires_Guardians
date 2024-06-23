'use strict'

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/drive/providers/DriveProvider'
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider'
]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = []

// Importer ace
const ace = require('@adonisjs/ace')

// Ajouter la commande seed avec l'ordre des fichiers
ace.addCommand(require('@adonisjs/lucid/commands/Seed'), 'seed', {
  files: [
    'RaceSeeder',
    'ClassSeeder',
    'ItemTypeSeeder',
    'AbilityTypeSeeder',
    'HeroesSeeder',
    'ItemsSeeder',
    'AbilitiesSeeder',
    'TraitsSeeder',
    'SkillsSeeder',
    'CreaturesSeeder'
  ]
})

module.exports = { providers, aceProviders, aliases, commands }
