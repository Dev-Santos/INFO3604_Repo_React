import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import Homepage from './components/Homepage';
import EWasteReport from './components/EWasteReport';
import ImageClassifier from './components/ImageClassifier';

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
          <Switch>
            <Route path={["/api/home","/"]} exact component={Homepage}/>
            <Route path="/items" exact>
              <Container>
                <ItemModal/>
                <ShoppingList/>
              </Container>
            </Route>
            <Route path="/api/ereport" exact component={EWasteReport}/>
            <Route path="/api/img" exact component={ImageClassifier}/>
          </Switch>
        </Router>
      </div>
    </Provider>);
  }
}

export default App;
