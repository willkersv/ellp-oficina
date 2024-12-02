import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/global.css';

import InputField from '../Components/InputField';
import Button from '../Components/Button';
import Header from '../Components/Header';

import user_icon from '../Assets/user.png';
import password_icon from '../Assets/cadeado.png';
import email_icon from '../Assets/e-mail.png';
import ra_icon from '../Assets/registrado.png';
import back_arrow_icon from '../Assets/seta-esquerda.png';

import api from '../api/axios';

const CadastroDocente = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ra, setRa] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('http://localhost:8080/professores/cadastro', {
                idProfessor: "2",
                nome: name,
                email: email,
                senha: password,
            });
            setSuccessMessage(response.data);  // Mensagem de sucesso
        } catch (error) {
            setErrorMessage('Erro ao cadastrar professor.');  // Mensagem de erro
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
                    icon={ra_icon} // Ícone para RA
                    type="text"
                    placeholder="RA (Registro Acadêmico)"
                    value={ra}
                    onChange={(e) => setRa(e.target.value)}
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
