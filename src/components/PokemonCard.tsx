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
      const translatedName = pokemonData.species.names.find(
        (element) => element.language.name === 'en'
      );

      if (translatedName) {
        setPokemonName(translatedName.name);
      }
    }
  }, [pokemonData]);
  return <h1>{pokemonName}</h1>;
};

export default PokemonCard;
