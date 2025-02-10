import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/home.css';

import Button from '../Components/Button';
import configuracao_icon from '../Assets/configuracao.png';
import logout_icon from '../Assets/botao-logout.png';

import api from '../api/axios';

const Home = () => {
    const [workshops, setWorkshops] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const fetchWorkshops = async () => {
        try {
            const response = await api.get('http://localhost:8080/api/workshops');
            if (response.data.length === 0) {
                setErrorMessage('Nenhum workshop encontrado.');
            } else {
                setErrorMessage('');
            }
            setWorkshops(response.data);
        } catch (error) {
            setErrorMessage('Erro ao buscar workshops. Tente novamente mais tarde.');
            console.error('Erro ao buscar workshops:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/');
        } else {
            fetchWorkshops();
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    const handleGenerateCertificate = (id) => {
        navigate(`/workshop/${id}`);
    };

    const handleAddWorkshop = () => {
        navigate('/cadastro-workshop');
    };

    const handleAddStudents = () => {
        navigate('/cadastro-aluno');
    };

    return (
        <div className="home-container">
            <div className="header-container">
                <h1 className="home-title">Workshops Cadastrados</h1>
                <img
                    src={logout_icon}
                    alt="Sair"
                    className="logout-icon"
                    onClick={handleLogout}
                />
            </div>
    
            <div className="actions-container">
                <Button
                    type="submit"
                    className="button-add-workshop"
                    onClick={handleAddWorkshop}
                >
                    + Cadastrar Workshop
                </Button>
                <Button
                    type="submit"
                    className="button-add-students"
                    onClick={handleAddStudents}
                >
                    + Cadastrar Alunos
                </Button>
            </div>
    
            <div className="workshop-cards-container">
                {workshops.map((workshop) => (
                    <div key={workshop.idWorkshop} className="workshop-card">
                        <h2 className="workshop-title">{workshop.nome}</h2>
                        <p><strong>Data:</strong> {workshop.data}</p>
                        <p><strong>Duração:</strong> {workshop.duracao} Horas</p>
                        <Button
                            type="submit"
                            className="generate-certificate-btn"
                            onClick={() => handleGenerateCertificate(workshop.idWorkshop)}
                        >
                            Detalhar workshop
                        </Button>
                    </div>
                ))}
            </div>
    
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
    
};

export default Home;