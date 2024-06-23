import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <Router basename="/grimoires-guardians-frontend">
      <Helmet>
        <title>Grimoires Guardians</title>
      </Helmet>
      <AppRoutes />
    </Router>
  );
}

export default App;
