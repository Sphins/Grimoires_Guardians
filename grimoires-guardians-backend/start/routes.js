const Route = use('Route');

// Auth Routes
Route.post('/register', 'AuthController.register');
Route.post('/login', 'AuthController.login');

// Protected Routes (requires authentication)
Route.group(() => {
    // Game Management
    Route.post('/creer-partie', 'GameController.create');
    Route.get('/mes-parties-mj', 'GameController.getMjGames');
    Route.get('/mes-parties-joueur', 'GameController.getPlayerGames');
    Route.delete('/supprimer-partie/:id', 'GameController.deleteGame');
    Route.put('/update-partie/:id', 'GameController.updateGame');

    // User Management
    Route.put('/update-username', 'UserController.updateUsername');
    Route.put('/update-email', 'UserController.updateEmail');
    Route.put('/update-password', 'UserController.updatePassword');
    Route.get('/user', 'UserController.getUser');

    // Game Details and Chat History
    Route.get('game/:id', 'GameController.getGameDetails');
    Route.post('game/:id/save-chat-history', 'GameController.saveChatHistory');
    Route.get('game/:id/get-chat-history', 'GameController.getChatHistory');

    // File Structure Management
    Route.post('game/:gameId/structure', 'FileStructureController.saveStructure');
    Route.get('game/:gameId/structure', 'FileStructureController.loadStructure');
    Route.post('game/:gameId/create-file', 'FileStructureController.createFile');
    Route.get('game/:gameId/items', 'FileStructureController.loadItems');
    Route.put('file/:fileId', 'FileStructureController.updateFile');
    Route.get('file/:fileId', 'FileStructureController.loadFile');
    Route.delete('/file/:gameId/:noteId', 'FileStructureController.deleteFile');

    // Item Management
    Route.get('game/:gameId/items/capacities', 'ItemController.getCapacities');
    Route.get('game/:gameId/items/paths', 'ItemController.getPaths');
    Route.get('game/:gameId/items/profiles', 'ItemController.getProfiles');
    Route.get('game/:gameId/items/peuples', 'ItemController.getRaces');
    Route.get('game/:gameId/equipements', 'ItemController.getItems');
    Route.get('game/:gameId/profiles/:profileName/paths/capacities', 'ItemController.getCapacitiesForProfilePaths');

    // Note Management
    Route.get('game/:gameId/notes', 'NoteController.getNotes');
    Route.post('game/:gameId/create-note', 'NoteController.createNote');
    Route.get('game/:gameId/notes/:noteId', 'NoteController.loadNote');
    Route.put('game/:gameId/notes/:noteId', 'NoteController.updateNote');
    Route.delete('note/:gameId/:noteId', 'NoteController.deleteNote');

    // Hero (Character) Management
    Route.get('game/:gameId/heroes', 'HeroController.getHeroes');
    Route.post('game/:gameId/create-hero', 'HeroController.createHero');
    Route.get('game/:gameId/heroes/:heroId', 'HeroController.loadHero');
    Route.put('game/:gameId/heroes/:heroId', 'HeroController.updateHero');
    Route.delete('hero/:gameId/:heroId', 'HeroController.deleteHero');

    // User Search and Invite
    Route.get('/users/search', 'UserController.search');
    Route.post('/game/:id/add-user', 'GameController.addUser');
    Route.delete('/game/:id/remove-user/:userId', 'GameController.removeUser');
    Route.get('/game/:id/members', 'GameController.getMembers');

    // Image Upload
    Route.post('/upload', 'ImageController.upload');

    // Routes pour récupérer les images
    Route.get('/heroes/:id/image', 'ImageController.getHeroImage');
    Route.get('/items/:id/image', 'ImageController.getItemImage');
    Route.get('/notes/:id/image', 'ImageController.getNoteImage');

    // Routes pour les maps
    Route.get('games/:game_id/maps', 'MapController.index');
    Route.post('maps', 'MapController.store');
    Route.get('maps/:id', 'MapController.show');
    Route.put('maps/:id', 'MapController.update');
    Route.delete('maps/:id', 'MapController.destroy');
}).prefix('api').middleware(['auth']);
