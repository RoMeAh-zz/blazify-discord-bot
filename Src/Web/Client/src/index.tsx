import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Routes/Home/Home";
import Guilds from './Routes/Guilds/Guilds';
import Config from './Routes/Config/Config';
ReactDOM.render(
        <React.StrictMode>
      <Router>
          <Route path="/" exact component={Home}/>
          <Route path="/dashboard/" component={Guilds}/>
          <Route path="/dashboard/guild/:id" component={Config}/>
      </Router>
        </React.StrictMode>,
    document.getElementById('root')
)