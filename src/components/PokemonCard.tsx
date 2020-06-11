import React, { useState, useEffect } from 'react';
import axios from 'axios';

type PokemonCardProps = {
  pokemon: {
    name: string;
    url: string;
  };
};

type PokemonData = {
  species: {
    names: Array<{ language: { name: string; url: string }; name: string }>;
  };
  sprites: {
    front_default: string;
  };
  types: Array<{ slot: number; type: { name: string; url: string } }>;
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
}: PokemonCardProps) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [pokemonName, setPokemonName] = useState(pokemon.name);

  useEffect(() => {
    const fetchPokemonData = async (): Promise<void> => {
      const { data } = await axios.get(
        `http://localhost:5000/api/pokemon/${pokemon.name}`
      );
      const species = await axios.get(
        `http://localhost:5000/api/species/${data.species.name}`
      );
      data.species = species.data;
      setPokemonData(data);
    };
    fetchPokemonData();
  }, []);

  useEffect(() => {
    if (pokemonData) {
      console.log(pokemonData);
      const translatedName = pokemonData.species.names.find(
        (element) => element.language.name === 'en'
      );

      if (translatedName) {
        setPokemonName(translatedName.name);
      }
    }
  }, [pokemonData]);

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">{pokemonName}</p>
        <div className="types-wrapper">
          <div
            className={`types types-en types-${pokemonData?.types[0].type.name}`}
          />
          {pokemonData && pokemonData.types.length > 1 && (
            <div
              className={`types types-en types-${pokemonData.types[1].type.name}`}
            />
          )}
        </div>
      </div>
      <div className="card-image">
        <img
          src={pokemonData ? pokemonData.sprites.front_default : ''}
          alt="Pokemon sprite"
        />
      </div>
      <div className="card-content" />
    </div>
  );
};

export default PokemonCard;
