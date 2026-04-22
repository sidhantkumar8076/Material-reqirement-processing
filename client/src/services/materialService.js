import apiClient from './apiClient';

export const getMaterials = () => apiClient.get('/materials');
export const getMaterialById = (id) => apiClient.get(`/materials/${id}`);
export const createMaterial = (data) => apiClient.post('/materials', data);
export const updateMaterial = (id, data) => apiClient.put(`/materials/${id}`, data);
export const deleteMaterial = (id) => apiClient.delete(`/materials/${id}`);
