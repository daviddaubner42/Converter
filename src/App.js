import React from 'react';
import './App.css';

import CurrencyConverter from './CurrencyConverter/CurrencyConverter';

class App extends React.Component {
  render () {
    return (
        <div className="App">
          <CurrencyConverter />
        </div>
      );  
  }
}

export default App;
