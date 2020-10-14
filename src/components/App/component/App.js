import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Routes from "../../../Routes";
import  logo  from '../../../assets/img/logo.svg'
import { bindActionCreators } from 'redux';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
        
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" /><p>Edit <code>src/App.js</code> and save to reload.</p><a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a></header>
        </div>
     
    );
  }
}

function mapStateToProps(state) {
  return {
   
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
