const Route = use('Route');

// Auth Routes
Route.post('/register', 'AuthController.register');
Route.post('/login', 'AuthController.login');

// Protected Routes (requires authentication)
Route.group(() => {

    // Game Management
    Route.post('/creer-partie', 'GameController.create').middleware(['auth']);
    Route.get('/mes-parties-mj', 'GameController.getMjGames').middleware(['auth']);
    Route.get('/mes-parties-joueur', 'GameController.getPlayerGames').middleware(['auth']);
    Route.delete('/supprimer-partie/:id', 'GameController.deleteGame').middleware(['auth']);
    Route.put('/update-partie/:id', 'GameController.updateGame').middleware(['auth']);

    // User Management
    Route.put('/update-username', 'UserController.updateUsername').middleware(['auth']);
    Route.put('/update-email', 'UserController.updateEmail').middleware(['auth']);
    Route.put('/update-password', 'UserController.updatePassword').middleware(['auth']);
    Route.get('/user', 'UserController.getUser').middleware(['auth']);

    // Game Details and Chat History
    Route.get('game/:id', 'GameController.getGameDetails').middleware('auth');
    Route.post('game/:id/save-chat-history', 'GameController.saveChatHistory').middleware('auth');
    Route.get('game/:id/get-chat-history', 'GameController.getChatHistory').middleware('auth');

    // File Structure Management
    Route.post('game/:gameId/structure', 'FileStructureController.saveStructure').middleware('auth');
    Route.get('game/:gameId/structure', 'FileStructureController.loadStructure').middleware('auth');
    Route.post('game/:gameId/create-file', 'FileStructureController.createFile').middleware('auth');
    Route.get('game/:gameId/items', 'FileStructureController.loadItems').middleware('auth');
    Route.put('file/:fileId', 'FileStructureController.updateFile').middleware('auth');
    Route.get('file/:fileId', 'FileStructureController.loadFile').middleware('auth');
    Route.delete('/file/:gameId/:noteId', 'FileStructureController.deleteFile').middleware('auth');

    // Item Management
    Route.get('game/:gameId/items/capacities', 'ItemController.getCapacities').middleware('auth');
    Route.get('game/:gameId/items/paths', 'ItemController.getPaths').middleware('auth');
    Route.get('game/:gameId/items/profiles', 'ItemController.getProfiles').middleware('auth');
    Route.get('game/:gameId/items/peuples', 'ItemController.getRaces').middleware('auth');
    Route.get('game/:gameId/equipements', 'ItemController.getItems').middleware('auth');
    Route.get('game/:gameId/profiles/:profileName/paths/capacities', 'ItemController.getCapacitiesForProfilePaths').middleware('auth');

    // Note Management
    Route.get('game/:gameId/notes', 'NoteController.getNotes').middleware('auth');
    Route.post('game/:gameId/create-note', 'NoteController.createNote').middleware('auth');
    Route.get('game/:gameId/notes/:noteId', 'NoteController.loadNote').middleware('auth');
    Route.put('game/:gameId/notes/:noteId', 'NoteController.updateNote').middleware('auth');
    Route.delete('note/:gameId/:noteId', 'NoteController.deleteNote').middleware('auth');

    // Hero (Character) Management
    Route.get('game/:gameId/heroes', 'HeroController.getHeroes').middleware('auth');
    Route.post('game/:gameId/create-hero', 'HeroController.createHero').middleware('auth');
    Route.get('game/:gameId/heroes/:heroId', 'HeroController.loadHero').middleware('auth');
    Route.put('game/:gameId/heroes/:heroId', 'HeroController.updateHero').middleware('auth');
    Route.delete('hero/:gameId/:heroId', 'HeroController.deleteHero').middleware('auth');

    // User Search and Invite
    Route.get('/users/search', 'UserController.search').middleware(['auth']);
    Route.post('/game/:id/add-user', 'GameController.addUser').middleware(['auth']);
    Route.delete('/game/:id/remove-user/:userId', 'GameController.removeUser').middleware(['auth']);
    Route.get('/game/:id/members', 'GameController.getMembers').middleware(['auth']);

}).prefix('api');
