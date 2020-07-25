import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import 'normalize.css';
import '../stylesheets/main.scss';
import PokemonCard from '../components/PokemonCard';
import OptionsBlock from '../components/OptionsBlock';
import { Options } from '../utils/types';

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<BasicPokemon[]>([]);
  const [options, setOptions] = useState<Options>({ search: '' });
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(false);

  const loadPokemon = async (): Promise<void> => {
    console.log('loading more pokemon');
    setLoading(true);
    const result = await axios.get(
      `http://localhost:5000/api/pokemon?offset=${pokemonList.length}`
    );
    setPokemonList(pokemonList.concat(result.data.list));
    setCanLoadMore(result.data.next);
    setLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <div className="container" role="main">
      <OptionsBlock options={options} setOptions={setOptions} />
      <InfiniteScroll
        pageStart={0}
        loadMore={loadPokemon}
        hasMore={canLoadMore}
        loader={<div>Loading...</div>}
      >
        {pokemonList.length > 0 &&
          pokemonList.map((pokemon: BasicPokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
      </InfiniteScroll>
    </div>
  );
};

type BasicPokemon = {
  name: string;
  url: string;
};

export default Home;
