import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/global.css';

import InputField from '../Components/InputField';
import Button from '../Components/Button';
import Header from '../Components/Header';

import email_icon from '../Assets/e-mail.png';
import password_icon from '../Assets/cadeado.png';

import api from '../api/axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('http://localhost:8080/api/professores/login', null, {
                params: { email: username, senha: password },
            });
            setErrorMessage('');
            navigate('/home');  // Navegação para a página Home após o login
        } catch (error) {
            setErrorMessage('Credenciais inválidas');
        }
    };

    const goToCadastroDocente = () => {
        navigate('/cadastro-docente');
    };

    return (
        <div className="container">
            <Header title="Login" />
            <form className="login-form" onSubmit={handleLogin}>
                <InputField
                    icon={email_icon}
                    type="text"
                    placeholder="Nome de usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    icon={password_icon}
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p className="link-text" onClick={goToCadastroDocente}>
                    Realizar cadastro docente
                </p>
                <Button type="submit" className="login-button">
                    Entrar
                </Button>
            </form>
        </div>
    );
};

export default Login;