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
import { BrowserRouter as Router, Routes, Route}from 'react-router-dom';
import Aos from "aos";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import "assets/aos.css";

import withAuth from "components/withAuth";
import Index from "views/Index.js";
import Signup from "views/Signup";
import Login from "views/Login";
import Milos from "views/App";
import BlogPage from "components/GetUserBlogs";

Aos.init();

const Upload = withAuth(Milos);
const Blogs = withAuth(BlogPage);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route exact path='/' element={<Index/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/upload' element={<Upload/>} />
      <Route path='/blogs' element={<Blogs/>} />
    </Routes>
  </Router>
);
