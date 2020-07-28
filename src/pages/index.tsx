import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import 'normalize.css';
import '../stylesheets/main.scss';
import _ from 'lodash';
import PokemonCard from '../components/PokemonCard';
import OptionsBlock from '../components/OptionsBlock';
import { Options } from '../utils/types';

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<BasicPokemon[]>([]);
  const [query, setQuery] = useState<Options>({ search: '' });
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

  const sendQuery = async (value: Options): Promise<void> => {
    console.log(value);
  };

  const search = _.debounce(sendQuery, 30000);

  useEffect(() => {
    loadPokemon();
  }, []);

  useEffect(() => {
    search(query);
  }, [query]);

  return (
    <div className="container" role="main">
      <OptionsBlock query={query} setQuery={setQuery} />
      <InfiniteScroll
        pageStart={0}
        loadMore={loadPokemon}
        hasMore={canLoadMore}
        loader={<div>Loading...</div>}
        className="pokemon-list"
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
