//Needed React modules
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Provider} from 'react-redux';
import store from './store';


//Imported CSS Files
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Imported Elements to be used => to be rendered based on the current URL
import AppNavbar from './components/AppNavbar';
import Homepage from './components/Homepage';
import EWasteReport from './components/forms/EWasteReport';
import AboutUs from './components/AboutUs';
import Gallery from './components/gallery/ImageGallery';
import Footer from './components/Footer';
import Dashboard from './components/dashboard/Dashboard';

//Imported Bootstrap elements
import {Container} from 'reactstrap';

//Imported the loadUser action/function from the authActions file in the actions folder
import {loadUser} from './actions/authActions';

//Component specification as a class
//This component is the BASE component for the entire front-end application
//All Components are interchanged on top of this base/foundation component
class App extends Component{

  //Once the application component is loaded, load the current user information
  componentDidMount(){
    store.dispatch(loadUser());
  }

  //The following is rendered/displayed on the browser
  render(){

    return(
      <Provider store={store}>

        <div className="App">

          <Router>

            <AppNavbar/>{/* Positioning of the system's navigation bar */}

            <Container className="mt-4" style={{width: '3000px'}}>

              <Switch>

                {/* The following describes which components are rendered based on the current/submitted url path */}
                {/* It is always positioned in between the system's navigation bar and footer  */}


                {/* You can put multiple routes in an array */}
                <Route path={[ "/api/home" , "/" ]} exact component={Homepage}/> 

                <Route path={"/api/gallery"} exact component={Gallery}/>

                <Route path="/api/aboutus" exact component={AboutUs}/>

                <Route path="/api/ereport" exact component={EWasteReport}/>

                {/* You can put multiple routes in an array */}
                <Route path={[ "/api/dashboard" , "/api/dashboard/:page" ]} exact component={Dashboard}/>

              </Switch>

            </Container>

            <Footer/>{/* Positioning of the system's footer component  */}

          </Router>

        </div>

      </Provider>
    );
  }
}

export default App;
