import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios, { CancelTokenSource } from 'axios';
import 'normalize.css';
import '../stylesheets/main.scss';
import _, { Cancelable } from 'lodash';
import PokemonCard from '../components/PokemonCard';
import OptionsBlock from '../components/OptionsBlock';
import { Options, BasicPokemon } from '../utils/types';
import fetchData from '../utils/axiosCancellable';

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<BasicPokemon[]>([]);
  const [query, setQuery] = useState<Options>({ search: '' });
  const [debouncedQuery, setDebouncedQuery] = useState<Cancelable>();
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(false);

  const loadMorePokemon = async (): Promise<void> => {
    setLoading(true);
    const result = await axios.get(
      `http://localhost:5000/api/pokemon?search=${query}&offset=${pokemonList.length}`
    );
    setPokemonList(pokemonList.concat(result.data.list));
    setCanLoadMore(result.data.next);
    setLoading(false);
  };

  const searchPokemon = async (search: string): Promise<void> => {
    setLoading(true);
    const { result } = await fetchData(search);

    if (result) {
      setPokemonList(result.list);
      setCanLoadMore(result.next);
      console.log(result);
    }
    setLoading(false);
  };

  const sendQuery = async (value: Options): Promise<void> => {
    searchPokemon(value.search);
  };

  useEffect(() => {
    const search = _.debounce(sendQuery, 300);

    setDebouncedQuery((prevQuery) => {
      if (prevQuery?.cancel) {
        prevQuery.cancel();
      }
      return search;
    });

    search(query);
  }, [query]);

  return (
    <div className="container" role="main">
      <OptionsBlock query={query} setQuery={setQuery} />
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMorePokemon}
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

export default Home;
