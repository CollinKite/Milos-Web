/*!

=========================================================
* BLK Design System React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Aos from "aos";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import "assets/aos.css";

import Index from "views/Index.js";
import Signup from "views/Signup";
import Login from "views/Login";

Aos.init();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/home" render={(props) => <Index {...props} />} />
      <Route path="/signup" render={(props) => <Signup {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Redirect from="/" to="/home" />
    </Switch>
  </BrowserRouter>
);
