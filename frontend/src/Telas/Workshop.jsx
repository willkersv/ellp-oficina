import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/workshop.css";

import api from "../api/axios";
import Button from "../Components/Button"; // Importando o componente de botão

// Importando os ícones como imagens
import back_arrow_icon from '../Assets/seta-esquerda.png';
import LupaIcon from "../Assets/lupa.png"; // Ícone da lupa
import CertificadoIcon from "../Assets/certificado.png"; // Ícone do certificado
import lixeira from '../Assets/lixeira.png'; // Ícone da lixeira


const Workshop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workshop, setWorkshop] = useState(null);
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    fetchWorkshop();
    fetchAllStudents();
  }, []);
  
  useEffect(() => {
    if (workshop) {
      fetchRegisteredStudents();
    }
  }, [workshop]);

  const fetchWorkshop = async () => {
    try {
      const response = await api.get(`http://localhost:8080/api/workshops/${id}`);
      setWorkshop(response.data);
    } catch (error) {
      setErrorMessage("Erro ao carregar informações do workshop.");
      console.error("Erro ao buscar workshop:", error);
    }
  };

  const fetchAllStudents = async () => {
    try {
      const alunosResponse = await api.get('http://localhost:8080/api/alunos');
      setAllStudents(alunosResponse.data); // Define todos os alunos no estado
    } catch (error) {
      setErrorMessage("Erro ao carregar lista de alunos.");
      console.error("Erro ao buscar alunos:", error);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    if (event.target.value.trim() === "") {
      setSearchResults([]);
    } else {
      const results = allStudents.filter((student) =>
        student.nome.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleAddStudent = async (studentId) => {
    console.log(id);
    console.log(studentId);
    try {
      await api.post(`http://localhost:8080/api/certificados`, {
        workshop:{idWorkshop: id},
        aluno:{idAluno: studentId}
      });
      window.location.reload();
    } catch (error) {
      setErrorMessage("Erro ao adicionar aluno ao workshop.");
      console.error("Erro ao adicionar aluno:", error);
    }
    setSearch("");
    setSearchResults([]);
  };

  const fetchRegisteredStudents = async () => {
    try {
      const registrosResponse = await api.get(`/api/certificados/alunosByworkshop?nomeWorkshop=${workshop.nome}`);
      setRegisteredStudents(registrosResponse.data);
    } catch (error) {
      setErrorMessage("Nenhum aluno cadastrado");
      console.error("Erro ao buscar alunos cadastrados:", error);
    }
  };


  const handleGenerateCertificates = async () => {
    try {
      await api.post(`/api/certificados/gerar-pdf-todos?nomeWorkshop=${workshop.nome}`);
      alert("Certificados gerados para todos os alunos!");
    } catch (error) {
      setErrorMessage("Erro ao gerar certificados.");
      console.error("Erro ao gerar certificados:", error);
    }
  };

  const handleGenerateCertificateForStudent = async (studentId) => {
    try {
      await api.get(`/api/certificados/gerar-pdf?idAluno=${studentId}&idWorkshop=${id}`);
      alert(`Certificado gerado para o aluno ID: ${studentId}!`);
    } catch (error) {
      setErrorMessage("Erro ao gerar certificado para o aluno.");
      console.error("Erro ao gerar certificado:", error);
    }
  };

  const handleDeleteStudant = async (studentId) => {
    try {
      await api.delete(`/api/certificados/delete?idAluno=${studentId}&nomeWorkshop=${workshop.nome}`);
      alert(`Aluno ID: ${studentId} removido do workshop!`);
      window.location.reload();
    } catch (error) {
      setErrorMessage("Erro ao excluir aluno.");
      console.error("Erro ao excluir aluno.", error);
    }
  };



  const goToWorkshops = () => {
    navigate('/home');
  };

  return (
    <div className="workshop-container">
      <div className="back-arrow" onClick={goToWorkshops} role="button" aria-label="Voltar para a página anterior">
        <img src={back_arrow_icon} alt="Voltar" />
      </div>
      {workshop ? (
        <>
          <div className="workshop-header">
            <h1 className="workshop-title">{workshop.nome}</h1>
            <p className="workshop-info">Data: {workshop.data}</p>
            <p className="workshop-info">Duração: {workshop.duracao} horas</p>

            <Button
              type="submit"
              className="generate-certificates-button"
              onClick={handleGenerateCertificates}
            >
              Gerar Todos os Certificados
            </Button>
          </div>

          <div className="add-students-section">
            <h2 className="section-title">Adicionar Aluno ao Workshop</h2>
            <div className="search-container">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Buscar alunos..."
                  value={search}
                  onChange={handleSearch}
                  className="search-input"
                />
                <img src={LupaIcon} alt="Lupa" className="search-icon" />
              </div>
              {/* Dropdown de resultados */}
              {searchResults.length > 0 && (
                <ul className="search-dropdown">
                  {searchResults.map((student) => (
                    <li key={student.id} className="search-dropdown-item">
                      <div className="student-info">
                        <span><strong>Aluno(a):</strong> {student.nome}</span>
                      </div>

                      <button
                        className="add-student-button"
                        onClick={() => { {
                          handleAddStudent(student.idAluno); // Corrigido para idAluno
                        }
                        }}
                      >
                        Adicionar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="registered-students">
            <h2 className="section-title">Alunos Cadastrados</h2>
            <div className="students-list">
              {registeredStudents.map((student) => (
                <div key={student.id} className="student-card">
                  <div className="student-info">
                    <p>
                      <strong>Nome:</strong> {student.nome}
                    </p>
                    <p>
                      <strong>Email:</strong> {student.email}
                    </p>
                    <p>
                      <strong>Curso:</strong> {student.curso}
                    </p>
                  </div>
                  <img
                    src={lixeira}
                    alt="Remover Aluno"
                    className="lixeira-icon"
                    onClick={() => handleDeleteStudant(student.idAluno)}
                  />
                  <img
                    src={CertificadoIcon}
                    alt="Certificado"
                    className="certificate-icon"
                    onClick={() => handleGenerateCertificateForStudent(student.idAluno)}
                  />
                </div>
              ))}
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      ) : (
        <p className="loading-message">Carregando workshop...</p>
      )}
    </div>
  );


};

export default Workshop;