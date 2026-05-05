// Servicio para comunicarse con la PokeAPI

const BASE_URL = 'https://pokeapi.co/api/v2';

// Obtener lista de Pokémon (con paginación)
export const getPokemonList = async (limit = 20, offset = 0) => {
    try {
        const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) throw new Error('Error fetching pokemon list');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Obtener detalles de un Pokémon específico
export const getPokemonDetails = async (nameOrId) => {
    try {
        const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
        if (!response.ok) throw new Error(`Error fetching ${nameOrId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Obtener información de la especie (generación, descripción, etc)
export const getPokemonSpecies = async (nameOrId) => {
    try {
        const response = await fetch(`${BASE_URL}/pokemon-species/${nameOrId}`);
        if (!response.ok) throw new Error(`Error fetching species ${nameOrId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
