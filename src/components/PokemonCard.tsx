import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { number, string } from 'prop-types';

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
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }>;
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

  const getStat = (name: string): number | undefined => {
    return pokemonData?.stats.find((element) => element.stat.name === name)
      ?.base_stat;
  };

  return (
    <div className="tile is-parent">
      <div className="tile is-child card">
        <div className="card-header">
          <div className="card-header-title">
            <p className="card-header-name">{pokemonName}</p>
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
        </div>
        <div className="card-image">
          <img
            src={pokemonData ? pokemonData.sprites.front_default : ''}
            alt="Pokemon sprite"
          />
        </div>
        <div className="card-content">
          <table className="table is-fullwidth stats">
            <tbody>
              <tr>
                <th>HP:</th>
                <td>{getStat('hp')}</td>
              </tr>
              <tr>
                <th>Attack:</th>
                <td>{getStat('attack')}</td>
              </tr>
              <tr>
                <th>Defense:</th>
                <td>{getStat('defense')}</td>
              </tr>
              <tr>
                <th>Sp.Atk:</th>
                <td>{getStat('special-attack')}</td>
              </tr>
              <tr>
                <th>Sp.Def:</th>
                <td>{getStat('special-defense')}</td>
              </tr>
              <tr>
                <th>Speed:</th>
                <td>{getStat('speed')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
