import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegação
import './CadastroDocente.css';

import user_icon from '../../Assets/user.png';
import password_icon from '../../Assets/cadeado.png';
import email_icon from '../../Assets/e-mail.png';
import back_arrow_icon from '../../Assets/seta-esquerda.png';

const CadastroDocente = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleCadastro = async (e) => {
        e.preventDefault();

        // Simulação de requisição ao back-end
        const mockResponse = {
            success: email !== 'existente@email.com', // Simula falha para email duplicado
            message: email === 'existente@email.com' ? 'Email já cadastrado.' : 'Cadastro realizado com sucesso!',
        };

        if (mockResponse.success) {
            setErrorMessage('');
            setSuccessMessage(mockResponse.message);
            // Redireciona para o login após sucesso
            setTimeout(() => navigate('/'), 2000);
        } else {
            setErrorMessage(mockResponse.message);
            setSuccessMessage('');
        }
    };

    const goToLogin = () => {
        navigate('/'); // Navega para a tela de login
    };

    return (
        <div className="container">
            <div className="back-arrow" onClick={goToLogin}>
                <img src={back_arrow_icon} alt="Back Arrow" />
            </div>
            <div className="header">
                <h2 className="text">Cadastro de Docente</h2>
            </div>
            <form className="cadastro-form" onSubmit={handleCadastro}>
                <div className="input-group">
                    <img src={user_icon} alt="User Icon" className="icon" />
                    <input
                        type="text"
                        placeholder="Nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <img src={email_icon} alt="Email Icon" className="icon" />
                    <input
                        type="email"
                        placeholder="Email institucional"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit" className="cadastro-button">
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

export default CadastroDocente;
