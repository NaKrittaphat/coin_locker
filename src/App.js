import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import  './App.css'
import RouterChild from './routes/RouterChild';
import Home from './component/Homepage/Home';
// import  from 'module'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <RouterChild />
        </div>
      </Router>

    )
  }
}