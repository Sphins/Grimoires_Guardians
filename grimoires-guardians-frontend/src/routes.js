import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import ManageAccount from './components/ManageAccount';
import ManageGames from './components/ManageGames';
import GameEnvironment from './components/GameEnvironment';

const routes = [
    {
        path: '/',
        element: <Navigate to="/login" />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/creer-partie',
        element: <CreateGame />
    },
    {
        path: '/rejoindre-partie',
        element: <JoinGame />
    },
    {
        path: '/gerer-compte',
        element: <ManageAccount />
    },
    {
        path: '/gestions-parties',
        element: <ManageGames />
    },
    {
        path: '/jeu/:id',
        element: <GameEnvironment />
    }
];

export default routes;
