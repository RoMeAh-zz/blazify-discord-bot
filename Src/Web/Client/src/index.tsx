import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Routes/Home/Home";
ReactDOM.render(
        <React.StrictMode>
      <Router>
          <Route path="/" exact component={Home}/>
      </Router>
        </React.StrictMode>,
    document.getElementById('root')
)