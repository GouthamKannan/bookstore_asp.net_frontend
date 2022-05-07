import React from 'react';
import './App.css';

//Importing bootstrap and other modules
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import HomePage from './components/home_page';
import ForgetPassword from './components/forget_password';
import Footer from './components/footer';
import ResetPassword from './components/reset_password';

function App() {

    return (
        <BrowserRouter >
        <Routes >
            <Route path = "/" element = { <HomePage /> } />
            <Route path = "/home/:msg" element = { <HomePage /> } />
            <Route path = "/home/" element = { <HomePage /> } />
            <Route path = "/forget-password" element = { <ForgetPassword /> } />
            <Route path = "/reset-password/:id" element = { <ResetPassword />} />
        </Routes>
        <Footer />
        </BrowserRouter>
    )
};

export default App;