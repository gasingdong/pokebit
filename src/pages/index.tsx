import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'normalize.css';
import '../stylesheets/main.scss';
import PokemonCard from '../components/PokemonCard';

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [canLoadMore, setCanLoadMore] = useState(false);

  useEffect(() => {
    const fetchPokemonList = async (): Promise<void> => {
      const result = await axios.get('http://localhost:5000/api/pokemon');
      setPokemonList(result.data.list);
      setCanLoadMore(result.data.next);
    };
    fetchPokemonList();
  }, []);

  return (
    <div className="container">
      {pokemonList.map((element: BasicPokemon) => (
        <PokemonCard key={element.name} pokemon={element} />
      ))}
    </div>
  );
};

type BasicPokemon = {
  name: string;
  url: string;
};

export default Home;
