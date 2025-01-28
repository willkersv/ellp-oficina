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
                {/* Rota pública para login */}
                <Route path="/" element={<Login />} />

                {/* Rotas públicas para cadastro */}
                <Route path="/cadastro-docente" element={<CadastroDocente />} />
                <Route path="/cadastro-aluno" element={<CadastroAluno />} />
                <Route path="/cadastro-workshop" element={<CadastroWorkshop />} />

                {/* Rota para a tela de Workshop */}
                <Route path="/workshop/:id" element={<Workshop />} />

                {/* Rotas privadas */}
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />

                {/* Rota para URLs inexistentes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
