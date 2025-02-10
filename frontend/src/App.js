import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Importação de telas
import Login from './Telas/Login';
import Workshop from './Telas/Workshop';
import CadastroDocente from './Telas/CadastroDocente';
import CadastroWorkshop from './Telas/CadastroWorkshop';
import CadastroAluno from './Telas/CadastroAluno';
import Home from './Telas/Home';
import PrivateRoute from './Components/PrivateRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota pública para login e cadastro do docente */}
                <Route path="/" element={<Login />} />
                <Route path="/cadastro-docente" element={<CadastroDocente />} />

                {/* Rotas privadas */}
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path="/cadastro-aluno" 
                    element={
                        <PrivateRoute>
                            <CadastroAluno />
                        </PrivateRoute>} 
                />
                <Route 
                    path="/cadastro-workshop" 
                    element={
                        <PrivateRoute>
                            <CadastroWorkshop />
                        </PrivateRoute>}
                />
                <Route 
                    path="/workshop/:id" 
                    element={
                        <PrivateRoute>
                            <Workshop />
                        </PrivateRoute>} 
                />
                
                {/* Rota para URLs inexistentes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
