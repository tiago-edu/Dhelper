// services/userService.js

import api from './api';

export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error; // Repassa o erro para tratamento
  }
};

export const createPlace = async (placeData) => {
  try {
    const response = await api.post('/places', placeData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar lugar:', error);
    throw error;
  }
};
