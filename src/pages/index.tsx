import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'normalize.css';
import './index.scss';

const Home: React.FC = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async (): Promise<void> => {
      const result = await axios.get('http://localhost:5000/api/pokemon');
      setPokemon(result.data.results);
    };
    fetchPokemon();
  }, []);

  return (
    <>
      {pokemon.map((mon: BasicPokemon) => (
        <h1 key={mon.name}>{mon.name}</h1>
      ))}
    </>
  );
};

type BasicPokemon = {
  name: string;
  url: string;
};

export default Home;
