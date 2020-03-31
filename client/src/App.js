import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppNavbar from './components/AppNavbar';
import Homepage from './components/Homepage';
import EWasteReport from './components/forms/EWasteReport';
import AboutUs from './components/AboutUs';
import Gallery from './components/gallery/ImageGallery';
import Footer from './components/Footer';


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
              <Route path={["/api/gallery"]} exact component={Gallery}/>
              <Route path="/api/aboutus" exact component={AboutUs}/>
              <Route path="/api/ereport" exact component={EWasteReport}/>
            </Switch>
          </Container>
          <Footer/>
        </Router>
      </div>
    </Provider>);
  }
}

export default App;
