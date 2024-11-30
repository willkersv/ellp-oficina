import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/global.css';

import InputField from '../Components/InputField';
import Button from '../Components/Button';
import Header from '../Components/Header';

import user_icon from '../Assets/user.png';
import password_icon from '../Assets/cadeado.png';
import email_icon from '../Assets/e-mail.png';
import back_arrow_icon from '../Assets/seta-esquerda.png';

const CadastroDocente = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleCadastro = async (e) => {
        e.preventDefault();

        const mockResponse = {
            success: email !== 'existente@email.com',
            message: email === 'existente@email.com' ? 'Email já cadastrado.' : 'Cadastro realizado com sucesso!',
        };

        if (mockResponse.success) {
            setErrorMessage('');
            setSuccessMessage(mockResponse.message);
            setTimeout(() => navigate('/'), 2000);
        } else {
            setErrorMessage(mockResponse.message);
            setSuccessMessage('');
        }
    };

    const goToLogin = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <div className="back-arrow" onClick={goToLogin}>
                <img src={back_arrow_icon} alt="Back Arrow" />
            </div>
            <Header title="Cadastro de Docente" />
            <form className="cadastro-form" onSubmit={handleCadastro}>
                <InputField
                    icon={user_icon}
                    type="text"
                    placeholder="Nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputField
                    icon={email_icon}
                    type="email"
                    placeholder="Email institucional"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    icon={password_icon}
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <Button type="submit" className="cadastro-button">
                    Cadastrar
                </Button>
            </form>
        </div>
    );
};

export default CadastroDocente;
