
const API_URL = 'http://localhost:3000'; 

// Função para obter todos os lugares
export const fetchAllPlaces = async () => {
  try {
    const response = await axios.get(`${API_URL}/places`);
    console.log(response.data); // Exibe a lista de lugares
  } catch (error) {
    console.error('Erro ao buscar lugares:', error.response.data);
  }
}

// Função para criar um novo lugar
export const createPlace = async (placeData) => {
  try {
    const response = await axios.post(`${API_URL}/places`, placeData);
    console.log(response.data); // Exibe o novo lugar criado
  } catch (error) {
    console.error('Erro ao criar lugar:', error.response.data);
  }
}

// Função para atualizar um lugar
async function updatePlace(id, placeData) {
  try {
    const response = await axios.put(`${API_URL}/places/${id}`, placeData);
    console.log(response.data); // Exibe o lugar atualizado
  } catch (error) {
    console.error('Erro ao atualizar lugar:', error.response.data);
  }
}

// Função para deletar um lugar
async function deletePlace(id) {
  try {
    await axios.delete(`${API_URL}/places/${id}`);
    console.log(`Lugar ${id} deletado com sucesso`);
  } catch (error) {
    console.error('Erro ao deletar lugar:', error.response.data);
  }
}

// Função para buscar lugares por nome
async function fetchPlacesByName(name) {
  try {
    const response = await axios.get(`${API_URL}/places`, {
      params: { name },
    });
    console.log(response.data); // Exibe a lista de lugares encontrados
  } catch (error) {
    console.error('Erro ao buscar lugares por nome:', error.response.data);
  }
}
