import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/global.css';

import InputField from '../Components/InputField';
import Button from '../Components/Button';
import Header from '../Components/Header';

import email_icon from '../Assets/e-mail.png';
import password_icon from '../Assets/cadeado.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === '1@example.com' && password === '1') {
            setErrorMessage('');
            navigate('/home');
        } else {
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