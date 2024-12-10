import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/global.css';

// Importação de componentes personalizados
import InputField from '../Components/InputField';
import Button from '../Components/Button';
import Header from '../Components/Header';

// Importação de ícones utilizados no formulário
import email_icon from '../Assets/e-mail.png';
import password_icon from '../Assets/cadeado.png';

// Importação da configuração de API para chamadas ao backend
import api from '../api/axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Função para tratar o envio do formulário de login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('http://localhost:8080/api/professores/login', null, {
                params: { email: username, senha: password },
            });

            // Salva o token no localStorage
            localStorage.setItem('authToken', response.data.token);

            // Redireciona para a página inicial
            setErrorMessage('');
            navigate('/home');
        } catch (error) {
            setErrorMessage('Credenciais inválidas');
        }
    };

    // Função para redirecionar o usuário para a página de cadastro de docente
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
