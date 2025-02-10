import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/global.css';

// Importação de componentes personalizados
import InputField from '../Components/InputField';
import Button from '../Components/Button';
import Header from '../Components/Header';

// Importação de ícones utilizados no formulário
import user_icon from '../Assets/user.png';
import email_icon from '../Assets/e-mail.png';
import curso_icon from '../Assets/curso.png';
import back_arrow_icon from '../Assets/seta-esquerda.png';
import ra_icon from '../Assets/registrado.png';

// Importação da configuração de API para chamadas ao backend
import api from '../api/axios';

const CadastroAluno = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [curso, setCurso] = useState('');
    const [ra, setRa] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    // Função para tratar o envio do formulário de cadastro
    const handleCadastro = async (e) => {
        e.preventDefault(); 

        try {
            const response = await api.post('http://localhost:8080/api/alunos', {
                //colocar id aqui
                idAluno: ra,
                nome: name,
                email: email,
                curso: curso,
            });

            setSuccessMessage('Cadastro realizado com sucesso.');
            setTimeout(() => setSuccessMessage(''), 5000);

            setName('');
            setEmail('');
            setCurso('');
            setRa('');
            setErrorMessage('');

            setTimeout(() => navigate('/home'), 2000);
        } catch (error) {
            setErrorMessage(`Erro ao cadastrar aluno: ${error.response?.data?.message || 'Tente novamente mais tarde.'}`);
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };
    // Função para navegar para a página inicial
    const goToHome = () => {
        navigate('/home');
    };

    return (
        <div className="container">
            <div className="back-arrow" onClick={goToHome}>
                <img src={back_arrow_icon} alt="Voltar" />
            </div>
            <Header title="Cadastro de Aluno" />
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
                    icon={ra_icon}
                    type="text"
                    placeholder="RA (Registro Acadêmico)"
                    value={ra}
                    onChange={(e) => setRa(e.target.value)}
                />
                <InputField
                    icon={curso_icon}
                    type="text"
                    placeholder="Curso"
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                />

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <Button type="submit" className="cadastro-button" disabled={!name || !email || !curso}>
                    Cadastrar
                </Button>
            </form>
        </div>
    );
};

export default CadastroAluno;