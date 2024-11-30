import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegação
import './CadastroWorkshop.css';

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

        // Aqui você poderia fazer a chamada ao backend para salvar o workshop
        // Exemplo:
        // await axios.post('/api/workshops', { title, description, date, duration });

        // Se a criação for bem-sucedida
        setErrorMessage('');
        setSuccessMessage('Workshop criado com sucesso!');
        setTitle('');
        setDescription('');
        setDate('');
        setDuration('');

        // Redirecionar após 2 segundos
        setTimeout(() => {
            navigate('/workshops'); // Ajuste para a página desejada após sucesso
        }, 2000);
    };

    const goToWorkshops = () => {
        navigate('/workshops'); // Navega para a página de workshops
    };

    return (
        <div className="container">
            <div className="header">
                <h2 className="text">Criar Workshop</h2>
            </div>
            <form className="workshop-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Título do Workshop"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="input"
                        rows="4"
                    />
                </div>
                <div className="input-group">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Duração (em horas)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                {/* Exibe a mensagem de erro ou sucesso */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit" className="workshop-button">
                    Criar Workshop
                </button>
            </form>
            <p className="link-text" onClick={goToWorkshops}>
                Voltar para Workshops
            </p>
        </div>
    );
};

export default CadastroWorkshop;
