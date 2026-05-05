import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { getPokemonList, getPokemonDetails } from '../services/pokeApi';
import '../estilos/Pokedex.css';

function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const LIMIT = 20;

    useEffect(() => {
        fetchPokemonData();
    }, [offset]);

    const fetchPokemonData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Obtener lista de pokémon
            const listData = await getPokemonList(LIMIT, offset);
            setPokemonList(listData.results);
            setTotalCount(listData.count);

            // Obtener detalles de cada pokémon
            const detailsPromises = listData.results.map(pokemon =>
                getPokemonDetails(pokemon.name)
            );
            const details = await Promise.all(detailsPromises);
            setPokemonDetails(details);
        } catch (err) {
            setError('Error al cargar los pokémon. Intenta de nuevo.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        if (offset + LIMIT < totalCount) {
            setOffset(offset + LIMIT);
        }
    };

    const handlePreviousPage = () => {
        if (offset >= LIMIT) {
            setOffset(offset - LIMIT);
        }
    };

    return (
        <div className="pokedex-container">
            <div className="pokedex-header">
                <h1>Pokédex</h1>
                <p className="pokemon-count">Total de Pokémon: {totalCount}</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Cargando Pokémon...</div>
            ) : (
                <>
                    <div className="pokemon-grid">
                        {pokemonDetails.map(pokemon => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </div>

                    <div className="pagination">
                        <button 
                            onClick={handlePreviousPage} 
                            disabled={offset === 0}
                            className="pagination-btn"
                        >
                            ← Anterior
                        </button>
                        
                        <span className="page-info">
                            {Math.floor(offset / LIMIT) + 1} / {Math.ceil(totalCount / LIMIT)}
                        </span>
                        
                        <button 
                            onClick={handleNextPage} 
                            disabled={offset + LIMIT >= totalCount}
                            className="pagination-btn"
                        >
                            Siguiente →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Pokedex;
