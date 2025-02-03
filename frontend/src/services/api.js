import axios from 'axios';

const API_URL = 'http://localhost:5001/api';  // URL base para o backend

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000, 
});

export const getCollaborators = () => api.get('/collaborators');
export const getJourneys = () => api.get('/journeys');
export const getActionsByJourney = (journey_id) => api.get(`/actions-journey?journey_id=${journey_id}`);
export const addCollaboratorToJourney = (data) => api.post('/journeys/collaborator', data);
