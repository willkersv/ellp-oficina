import React, { useState, useCallback } from 'react';
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

import api from '../api/axios';

const CadastroWorkshop = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        // Validação simples
        if (!title || !description || !date || !duration) {
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        if (isNaN(duration) || duration <= 0) {
            setErrorMessage('A duração deve ser um número válido maior que zero.');
            return;
        }

        const workshopDate = new Date(date);
        if (workshopDate < new Date()) {
            setErrorMessage('A data do workshop não pode ser no passado.');
            return;
        }

        try {
            const response = await api.post('http://localhost:8080/api/workshops', {
                nome: title,
                descricao: description,
                data: date,
                duracao: parseInt(duration),
            });

            setSuccessMessage('Workshop criado com sucesso!');
            setTitle('');
            setDescription('');
            setDate('');
            setDuration('');
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } catch (error) {
            console.error(error);
            setErrorMessage('Erro ao criar o workshop. Tente novamente.');
        }
    }, [title, description, date, duration, navigate]);

    const goToWorkshops = () => {
        navigate('/home');
    };

    return (
        <div className="container">
            <div className="back-arrow" onClick={goToWorkshops} role="button" aria-label="Voltar para a página anterior">
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
                    aria-label="Título do workshop"
                />
                <TextArea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    aria-label="Descrição do workshop"
                />
                <InputField
                    icon={calendario}
                    type="date"
                    placeholder="Data do Workshop"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    aria-label="Data do workshop"
                />
                <InputField
                    icon={relogio}
                    type="text"
                    placeholder="Duração (em horas)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    aria-label="Duração do workshop"
                />
                {errorMessage && <p className="error-message" aria-live="assertive">{errorMessage}</p>}
                {successMessage && <p className="success-message" aria-live="polite">{successMessage}</p>}
                <Button type="submit" className="workshop-button">
                    Criar Workshop
                </Button>
            </form>
        </div>
    );
};

export default CadastroWorkshop;
