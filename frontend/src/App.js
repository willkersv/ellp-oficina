import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importação correta do Router
import './App.css';

import Login from './Components/Telas/Login/Login';
import CadastroDocente from './Components/Telas/CadastroDocente/CadastroDocente';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro-docente" element={<CadastroDocente />} />
            </Routes>
        </Router>
    );
}

export default App;