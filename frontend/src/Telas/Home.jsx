import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/global.css';
import './css/home.css';

const Home = () => {
    const [workshops, setWorkshops] = useState([]); // Lista de workshops
    const navigate = useNavigate();

    // Simula a busca de workshops cadastrados
    useEffect(() => {
        const fetchWorkshops = async () => {
            // Aqui você pode fazer uma chamada real ao backend usando fetch ou axios
            const mockWorkshops = [
                { id: 1, title: "Workshop de React", date: "2024-12-10", duration: "3h" },
                { id: 2, title: "Workshop de Spring Boot", date: "2024-12-15", duration: "4h" },
                { id: 3, title: "Workshop de JavaScript", date: "2024-12-20", duration: "2h" },
            ];
            setWorkshops(mockWorkshops);
        };
        fetchWorkshops();
    }, []);

    const handleGenerateCertificate = (id) => {
        // Navega para a página de geração de certificado com o ID do workshop
        navigate(`/workshops/${id}/generate-certificate`);
    };

    const handleAddStudents = (id) => {
        // Navega para a página de cadastro de alunos com o ID do workshop
        navigate(`/workshops/${id}/add-students`);
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Workshops Cadastrados</h1>
            <ul className="workshop-list">
                {workshops.map((workshop) => (
                    <li key={workshop.id} className="workshop-item">
                        <div className="workshop-info">
                            <h3 className="workshop-title">{workshop.title}</h3>
                            <p className="workshop-details">
                                Data: {workshop.date} | Duração: {workshop.duration}
                            </p>
                        </div>
                        <div className="workshop-actions">
                            <button
                                className="button-certificate"
                                onClick={() => handleGenerateCertificate(workshop.id)}
                            >
                                Gerar Certificado
                            </button>
                            <button
                                className="button-add-students"
                                onClick={() => handleAddStudents(workshop.id)}
                            >
                                Cadastrar Alunos
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
