import React from 'react';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Home from './components/Home'
import Login from './components/Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Provider} from 'react-redux';
import store from './store';
import Forum from './components/Forum';
class App extends React.Component {

  render() {

    return (
    <Provider store = { store }>
    
          <Router>   
            <div>
              <Navbar />
              <Route exact path='/forum' component={Forum} />
              <Route exact path='/home' render={Home}/>
              <Route render={({location}) => (

                  <TransitionGroup>         
                  <CSSTransition key={location.key} timeout={1000} classNames="slide" >
                    <Switch location={location}>
                      <Route exact path='/' component={Login}/>
                      <Route exact path = '/register' component={Register}/>
                    </Switch>
                  </CSSTransition>
                  </TransitionGroup>
              )} ></Route>
            
          </div> 
                
      </Router>
</Provider>);
          
    
      
  }
  
}

export default App;
