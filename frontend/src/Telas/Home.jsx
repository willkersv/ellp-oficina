import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/global.css';
import './css/home.css';

import certificado_icon from '../Assets/certificado.png';
import adicionar_usuario from '../Assets/adicionar-usuario.png';
import add_aluno_icon from '../Assets/adicionar-usuario.png';
import logout_icon from '../Assets/botao-logout.png';
import ReactDOM from 'react-dom';

import api from '../api/axios';

const Home = () => {
    const [workshops, setWorkshops] = useState([]);
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [isStudentListVisible, setIsStudentListVisible] = useState(false);
    const [studentListPosition, setStudentListPosition] = useState({ top: 0, left: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const response = await api.get('http://localhost:8080/workshops');
                setWorkshops(response.data);
            } catch (error) {
                console.error('Erro ao buscar workshops:', error);
            }
        };
        fetchWorkshops();
    }, []);

    const fetchStudentsForWorkshop = (id) => {
        const mockStudents = [
            { id: 1, name: 'Ana Silva' },
            { id: 2, name: 'Carlos Souza' },
            { id: 3, name: 'Fernanda Oliveira' },
        ];
        setStudents(mockStudents);
    };

    const handleLogout = () => {
        navigate('/');
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleAddStudents = (id, event) => {
        const rect = event.target.getBoundingClientRect();
        setStudentListPosition({
            top: rect.bottom, 
            left: rect.left,  
        });
        fetchStudentsForWorkshop(id);
        setIsStudentListVisible(!isStudentListVisible);
    };

    const handleGenerateCertificate = (id) => {
        navigate(`/workshops/${id}/generate-certificate`);
    };

    const handleAddWorkshop = () => {
        navigate('/cadastro-workshop');
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

            <button className="button-add-workshop" onClick={handleAddWorkshop}>
                + Cadastrar Workshop
            </button>

            <div className="workshop-table">
                <div className="workshop-header">
                    <span>Título</span>
                    <span>Data</span>
                    <span>Duração</span>
                    <span>Ações</span>
                </div>
                <ul className="workshop-list">
                    {workshops.map((workshop) => (
                        <li key={workshop.id} className="workshop-item">
                            <span className="workshop-title">{workshop.title}</span>
                            <span>{workshop.date}</span>
                            <span>{workshop.duration}</span>
                            <span className="workshop-actions">
                                <img
                                    src={certificado_icon}
                                    alt="Gerar Certificado"
                                    className="action-icon"
                                    onClick={() => handleGenerateCertificate(workshop.id)}
                                />
                                <img
                                    src={adicionar_usuario}
                                    alt="Cadastrar Alunos"
                                    className="action-icon"
                                    onClick={(e) => handleAddStudents(workshop.id, e)}
                                />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {isStudentListVisible && 
                ReactDOM.createPortal(
                    <div
                        className="student-list-container"
                        style={{ top: studentListPosition.top, left: studentListPosition.left, position: 'absolute' }}
                    >
                        <div className="student-search">
                            <input
                                type="text"
                                placeholder="Buscar aluno..."
                                value={search}
                                onChange={handleSearch}
                                className="search-input"
                            />
                            <img
                                src={add_aluno_icon}
                                alt="Adicionar Aluno"
                                className="add-student-icon"
                                onClick={() => alert('Adicionar aluno implementado aqui.')}
                            />
                        </div>
                        <ul className="student-list">
                            {students
                                .filter((student) =>
                                    student.name.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((student) => (
                                    <li key={student.id} className="student-item">
                                        {student.name}
                                        <img
                                            src={certificado_icon}
                                            alt="Certificado"
                                            className="action-icon"
                                            onClick={() =>
                                                alert(`Certificado do aluno ${student.name}`)
                                            }
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>,
                    document.getElementById('portal-root')
                )
            }
        </div>
    );
};

export default Home;