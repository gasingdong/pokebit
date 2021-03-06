import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { number, string } from 'prop-types';
import StatsBlock from './StatsBlock';
import BodyStatsBlock from './BodyStatsBlock';

type PokemonCardProps = {
  pokemon: {
    name: string;
    url: string;
  };
};

type PokemonData = {
  species: {
    names: Array<{ language: { name: string; url: string }; name: string }>;
    flavor_text_entries: Array<{ flavor_text: string }>;
  };
  sprites: {
    front_default: string;
  };
  types: Array<{ slot: number; type: { name: string; url: string } }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }>;
  height: number;
  weight: number;
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
}: PokemonCardProps) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [pokemonName, setPokemonName] = useState(pokemon.name);

  useEffect(() => {
    let mounted = true;
    const fetchPokemonData = async (): Promise<void> => {
      const { data } = await axios.get(
        `http://localhost:5000/api/pokemon/${pokemon.name}`
      );
      const species = await axios.get(
        `http://localhost:5000/api/species/${data.species.name}`
      );
      data.species = species.data;

      if (mounted) {
        setPokemonData(data);
      }
    };

    if (mounted) {
      fetchPokemonData();
    }
    return (): void => {
      mounted = false;
    };
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

  return (
    <div className="card">
      <div className="card__header">
        <p className="card__name">{pokemonName}</p>
        <div className="types">
          <div className={`type en ${pokemonData?.types[0].type.name}`} />
          {pokemonData && pokemonData.types.length > 1 && (
            <div className={`type en ${pokemonData.types[1].type.name}`} />
          )}
        </div>
      </div>
      <div className="card-content">
        <div className="sprite">
          <img
            src={
              pokemonData?.sprites.front_default ||
              'https://img.icons8.com/pastel-glyph/96/000000/cancel-2.png'
            }
            alt="Pokemon sprite"
          />
        </div>
        <div className="pokedex-entry info-block">
          {pokemonData?.species.flavor_text_entries[0].flavor_text.replace(
            '\u000c',
            '\n'
          )}
        </div>
        {pokemonData?.height && pokemonData.weight && (
          <BodyStatsBlock
            height={pokemonData.height}
            weight={pokemonData.weight}
          />
        )}
        {pokemonData?.stats && <StatsBlock stats={pokemonData?.stats} />}
      </div>
    </div>
  );
};

export default PokemonCard;
