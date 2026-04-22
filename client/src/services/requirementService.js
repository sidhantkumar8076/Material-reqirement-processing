import apiClient from './apiClient';

export const getRequirements = () => apiClient.get('/requirements');
export const getRequirementById = (id) => apiClient.get(`/requirements/${id}`);
export const createRequirement = (data) => apiClient.post('/requirements', data);
export const updateRequirement = (id, data) => apiClient.put(`/requirements/${id}`, data);
export const deleteRequirement = (id) => apiClient.delete(`/requirements/${id}`);
