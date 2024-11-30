import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/global.css';

import InputField from '../Components/InputField';
import TextArea from '../Components/TextArea';
import Button from '../Components/Button';
import Header from '../Components/Header';

import back_arrow_icon from '../Assets/seta-esquerda.png';
import titulo from '../Assets/titulo.png';
import calendario from '../Assets/calendario.png';
import relogio from '../Assets/relogio.png';

const CadastroWorkshop = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação simples
        if (!title || !description || !date || !duration) {
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        // Simulação de sucesso no cadastro
        setErrorMessage('');
        setSuccessMessage('Workshop criado com sucesso!');
        setTitle('');
        setDescription('');
        setDate('');
        setDuration('');

        setTimeout(() => {
            navigate('/home');
        }, 1000);
    };

    const goToWorkshops = () => {
        navigate('/home');
    };

    return (
        <div className="container">
            <div className="back-arrow" onClick={goToWorkshops}>
                <img src={back_arrow_icon} alt="Voltar" />
            </div>
            
            <Header title="Criar Workshop" />
            <form className="workshop-form" onSubmit={handleSubmit}>
                
                <InputField
                    icon={titulo}
                    type="text"
                    placeholder="Título do Workshop"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextArea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <InputField
                    icon={calendario}
                    type="date"
                    placeholder="Data do Workshop"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <InputField
                    icon={relogio}S
                    type="text"
                    placeholder="Duração (em horas)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <Button type="submit" className="workshop-button">
                    Criar Workshop
                </Button>
            </form>
        </div>
    );
};

export default CadastroWorkshop;