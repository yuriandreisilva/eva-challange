import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import AddJourneyToCollaborator from './components/AddJourneyToCollaborator';
import './App.css'; // Importe o arquivo CSS

function App() {
  return (
    <Router>
      <div className='bg-gray-600'>
        <Header />
        <Switch>
          <div className="App bg-gray-600">
            <AddJourneyToCollaborator />
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
