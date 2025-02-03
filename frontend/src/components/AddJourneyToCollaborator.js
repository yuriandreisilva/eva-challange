import React, { useState, useEffect } from "react";
import { getCollaborators, getJourneys, addCollaboratorToJourney, getActionsByJourney } from '../services/api';

const AddJourneyToCollaborator = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [journeys, setJourneys] = useState([]);
  const [selectedCollaborator, setSelectedCollaborator] = useState("");
  const [selectedJourney, setSelectedJourney] = useState("");
  const [dateBegin, setDateBegin] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [journeyDetails, setJourneyDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collaboratorsResponse = await getCollaborators();
        setCollaborators(collaboratorsResponse.data);

        const journeysResponse = await getJourneys();  
        console.log(journeysResponse);
        setJourneys(journeysResponse.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchJourneyDetails = async () => {
      if (selectedJourney) {
        console.log(selectedJourney)
        try {
          const response = await getActionsByJourney(selectedJourney);
          setJourneyDetails(response.data);
        } catch (error) {
          console.error("Erro ao carregar detalhes da jornada:", error);
        }
      }
    };

    fetchJourneyDetails();
  }, [selectedJourney]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    const data = {
      journey_id: selectedJourney,
      collaborator_id: selectedCollaborator,
      date_begin: dateBegin,
      // date_end: dateEnd,
    };

    try {
      await addCollaboratorToJourney(data); 

      alert("Jornada adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar jornada ao colaborador", error);
      if (error.status === 409) {
        setErrorMessage("Não é possível adicionar esta jornada novamente ao colaborador.");
      } else {
        setErrorMessage("Erro ao adicionar jornada.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-600 full-height">
      <h1 className="text-3xl font-semibold text-center text-white mb-8">Adicionar Jornada ao Colaborador</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6 max-w-3xl mx-auto">
        {/* Mensagem de Erro */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Erro: </strong>
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        {/* Seleção de Colaborador */}
        <div className="flex flex-col">
          <label htmlFor="collaborator" className="text-lg font-medium mb-2 text-gray-700">Colaborador</label>
          <select
            id="collaborator"
            value={selectedCollaborator}
            onChange={(e) => setSelectedCollaborator(e.target.value)}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione um colaborador</option>
            {collaborators.map((collaborator) => (
              <option key={collaborator._id} value={collaborator._id}>
                {collaborator.name}
              </option>
            ))}
          </select>
        </div>

        {/* Seleção de Jornada */}
        <div className="flex flex-col">
          <label htmlFor="journey" className="text-lg font-medium mb-2 text-gray-700">Jornada</label>
          <select
            id="journey"
            value={selectedJourney}
            onChange={(e) => setSelectedJourney(e.target.value)}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione uma jornada</option>
            {journeys.map((journey) => (
              <option key={journey._id} value={journey._id}>
                {journey.name}
              </option>
            ))}
          </select>
        </div>

        {/* Detalhes da Jornada Selecionada */}
        {journeyDetails && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
            <h2 className="text-lg font-medium mb-2">Detalhes da Jornada</h2>
            <p className="mb-2"><strong>Descrição:</strong> {journeyDetails.description}</p>
            <h3 className="text-md font-medium mb-2">Ações:</h3>
            <ul>
              {journeyDetails.actions && journeyDetails.actions.map((action, index) => (
                <li key={action._id}>
                  <p><strong>Ação {index + 1}:</strong> {action.name}</p>
                  <p><strong>Descrição:</strong> {action.description}</p>
                  <hr className="my-2" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Campos de Data */}
        <div className="flex flex-col">
          <label htmlFor="date_begin" className="text-lg font-medium mb-2 text-gray-700">Data de Início</label>
          <input
            type="date"
            id="date_begin"
            value={dateBegin}
            onChange={(e) => setDateBegin(e.target.value)}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Adicionar Jornada
        </button>
      </form>
    </div>
  );
};

export default AddJourneyToCollaborator;
