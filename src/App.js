import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import TeamSugiInfo from './web/teamSugiContainer'
import store from './modules/configureStore'
import './App.css';

function App() {
  return (
    <div>
      <HashRouter>
      <Provider store={store}>
        <Switch>
          <Route path='/' component={TeamSugiInfo} />
          <Route path='/teamsugi' component={TeamSugiInfo} />
          
        </Switch>
        </Provider>
      </HashRouter>
    </div>
  );
}

export default App;
