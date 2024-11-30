import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegação
import './Login.css';

import email_icon from '../../Assets/e-mail.png';
import password_icon from '../../Assets/cadeado.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Para armazenar a mensagem de erro
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Lógica para validar as credenciais
        if (username === 'professor@example.com' && password === 'senha123') {
            setErrorMessage('');
            navigate('/dashboard'); // Redireciona após login bem-sucedido
        } else {
            setErrorMessage('Credenciais inválidas'); // Exibe a mensagem de erro
        }
    };

    const goToCadastroDocente = () => {
        navigate('/cadastro-docente'); // Ajuste para a rota desejada
    };

    return (
        <div className="container">
            <div className="header">
                <h2 className="text">Login</h2>
            </div>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="input-group">
                    <img src={email_icon} alt="User Icon" className="icon" />
                    <input
                        type="text"
                        placeholder="Nome de usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <img src={password_icon} alt="Password Icon" className="icon" />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                {/* Exibe a mensagem de erro se houver */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p className="link-text" onClick={goToCadastroDocente}>
                    Realizar cadastro docente
                </p>
                <button type="submit" className="login-button">
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
