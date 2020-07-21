import React, { useState, useEffect } from 'react';
import {
  GridLayout,
  OnAppend,
  OnLayoutComplete,
} from '@egjs/react-infinitegrid';
import axios from 'axios';
import 'normalize.css';
import '../stylesheets/main.scss';
import PokemonCard from '../components/PokemonCard';

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<BasicPokemon[]>([]);
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

  const onAppend = ({ currentTarget, startLoading }: OnAppend): void => {
    console.log('appendaaaaa');

    if (currentTarget?.isProcessing) {
      console.log('processing');
      return;
    }
    console.log('append');

    if (startLoading) {
      console.log('start loading');
      startLoading({});
      loadPokemon();
      console.log('loading done');
    }
  };

  const onLayoutComplete = ({
    isLayout,
    endLoading,
  }: OnLayoutComplete): false | void => {
    console.log('layout complete');
    return !isLayout && endLoading && endLoading({});
  };

  return (
    <div className="container">
      <GridLayout
        tag="div"
        loading={<div>Loading...</div>}
        onAppend={onAppend}
        onLayoutComplete={onLayoutComplete}
        options={{
          isOverflowScroll: false,
          useRecycle: true,
          horizontal: false,
          useFit: true,
        }}
        layoutOptions={{
          margin: 5,
          align: 'center',
        }}
      />
      {pokemonList.length > 0 &&
        pokemonList.map((pokemon: BasicPokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
    </div>
  );
};

type BasicPokemon = {
  name: string;
  url: string;
};

export default Home;
