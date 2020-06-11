import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'normalize.css';
import './index.scss';
import PokemonCard from '../components/PokemonCard';

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async (): Promise<void> => {
      const result = await axios.get('http://localhost:5000/api/pokemon');
      setPokemonList(result.data.results.slice(0, 10));
    };
    fetchPokemonList();
  }, []);

  return (
    <div className="container">
      <div className="tile is-ancestor">
        {pokemonList.map((element: BasicPokemon) => (
          <PokemonCard key={element.name} pokemon={element} />
        ))}
      </div>
    </div>
  );
};

type BasicPokemon = {
  name: string;
  url: string;
};

export default Home;
