import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import Homepage from './components/Homepage';
import EWasteReport from './components/EWasteReport';
//import Upload from './components/ReactUploadImage';


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Container} from 'reactstrap';

import { Provider} from 'react-redux';
import store from './store';

import {loadUser} from './actions/authActions';

class App extends Component{

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render(){
    return(<Provider store={store}>
      <div className="App">
        <Router>
          <AppNavbar/>
          <Container className="mt-4">
            <Switch>
              <Route path={["/api/home","/"]} exact component={Homepage}/>
              <Route path="/api/ereport" exact component={EWasteReport}/>
            </Switch>
          </Container>
        </Router>
      </div>
    </Provider>);
  }
}

export default App;
