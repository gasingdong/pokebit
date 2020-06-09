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
