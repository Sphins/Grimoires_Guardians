import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <Router>
      <Helmet>
        <title>Grimoires Guardians</title> {/* Définir le titre de la page */}
      </Helmet>
      <AppRoutes />
    </Router>
  );
}

export default App;
