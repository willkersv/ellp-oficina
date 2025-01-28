import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/global.css';

// Importação de componentes personalizados
import InputField from '../Components/InputField';
import Button from '../Components/Button';
import Header from '../Components/Header';

// Importação de ícones utilizados no formulário
import user_icon from '../Assets/user.png';
import password_icon from '../Assets/cadeado.png';
import email_icon from '../Assets/e-mail.png';
import ra_icon from '../Assets/registrado.png';
import back_arrow_icon from '../Assets/seta-esquerda.png';

// Importação da configuração de API para chamadas ao backend
import api from '../api/axios';

const CadastroDocente = () => {
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [ra, setRa] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState(''); 

    const navigate = useNavigate(); 

    // Função para tratar o envio do formulário de cadastro
    const handleCadastro = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página
    
        // Validação do nome completo
        if (!name) {
            setErrorMessage('Nome completo é obrigatório');
            return;
        }
    
        // Validação do email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Email inválido');
            return;
        }
    
        // Validação da senha (mínimo de 6 caracteres)
        if (password.length < 6) {
            setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
            return;
        }
    
        try {
            // Envio dos dados para a API de cadastro
            const response = await api.post('http://localhost:8080/api/professores/cadastro', {
                idProfessor: ra, 
                nome: name, 
                email: email, 
                senha: password,
            });
            
            // Mensagem de sucesso
            setSuccessMessage('Cadastro realizado com sucesso');
    
            // Limpa os campos após o cadastro ser concluído com sucesso
            setName('');
            setRa('');
            setEmail('');
            setPassword('');
            setErrorMessage('');
    
            // Aguarda 3 segundos para redirecionar
            setTimeout(() => {
                navigate('/'); // Redireciona para a tela de login
            }, 2000); // 3000ms = 3 segundos
        } catch (error) {
            setErrorMessage('Erro ao cadastrar professor.');
        }
    };

    // Função para redirecionar o usuário para a página de login
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
                    icon={ra_icon} 
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

                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mensagem de erro */}
                {successMessage && <p className="success-message">{successMessage}</p>} {/* Mensagem de sucesso */}

                <Button 
                    type="submit" 
                    className="cadastro-button" 
                    disabled={!name || !ra || !email || !password} // Desabilita se campos estiverem vazios
                >
                    Cadastrar
                </Button>
            </form>
        </div>
    );
};

export default CadastroDocente;