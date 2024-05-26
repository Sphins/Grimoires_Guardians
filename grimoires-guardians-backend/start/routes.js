const Route = use('Route')

Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')

Route.group(() => {
    Route.post('/creer-partie', 'GameController.create').middleware(['auth'])
    Route.get('/mes-parties-mj', 'GameController.getMjGames').middleware(['auth'])
    Route.get('/mes-parties-joueur', 'GameController.getPlayerGames').middleware(['auth'])
    Route.delete('/supprimer-partie/:id', 'GameController.deleteGame').middleware(['auth'])
    Route.put('/update-partie/:id', 'GameController.updateGame').middleware(['auth'])

    Route.put('/update-username', 'UserController.updateUsername').middleware(['auth'])
    Route.put('/update-email', 'UserController.updateEmail').middleware(['auth'])
    Route.put('/update-password', 'UserController.updatePassword').middleware(['auth'])
    Route.get('/user', 'UserController.getUser').middleware(['auth'])

    Route.get('game/:id', 'GameController.getGameDetails').middleware('auth')
    Route.post('game/:id/save-chat-history', 'GameController.saveChatHistory').middleware('auth')
    Route.get('game/:id/get-chat-history', 'GameController.getChatHistory').middleware('auth')
    Route.post('game/:gameId/structure', 'FileStructureController.saveStructure').middleware('auth')
    Route.get('game/:gameId/structure', 'FileStructureController.loadStructure').middleware('auth')
}).prefix('api')
