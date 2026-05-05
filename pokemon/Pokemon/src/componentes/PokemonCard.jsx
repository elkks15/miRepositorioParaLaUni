import React from 'react';
import '../estilos/PokemonCard.css';

function PokemonCard({ pokemon }) {
    if (!pokemon) return null;

    const pokemonId = pokemon.id;
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default;
    const types = pokemon.types?.map(type => type.type.name) || [];
    const height = pokemon.height / 10; // Convertir a metros
    const weight = pokemon.weight / 10; // Convertir a kg

    return (
        <div className="pokemon-card">
            <div className="pokemon-image-container">
                <img src={imageUrl} alt={pokemonName} className="pokemon-image" />
            </div>
            
            <div className="pokemon-info">
                <h2 className="pokemon-name">{pokemonName}</h2>
                <p className="pokemon-id">#{String(pokemonId).padStart(3, '0')}</p>
                
                <div className="pokemon-types">
                    {types.map((type, index) => (
                        <span key={index} className={`type type-${type}`}>
                            {type.toUpperCase()}
                        </span>
                    ))}
                </div>

                <div className="pokemon-stats">
                    <div className="stat">
                        <span className="stat-label">Altura:</span>
                        <span className="stat-value">{height} m</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Peso:</span>
                        <span className="stat-value">{weight} kg</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;
