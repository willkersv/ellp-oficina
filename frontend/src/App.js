import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';

import Login from './Telas/Login';
import CadastroDocente from './Telas/CadastroDocente';
import CadastroWorkshop from './Telas/CadastroWorkshop'; 
import Home from './Telas/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro-docente" element={<CadastroDocente />} />
                <Route path="/cadastro-workshop" element={<CadastroWorkshop />} /> 
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;