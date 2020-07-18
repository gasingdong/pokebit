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

  // useEffect(() => {
  //   const fetchPokemonList = async (): Promise<void> => {
  //     setLoading(true);
  //     const result = await axios.get('http://localhost:5000/api/pokemon');
  //     setPokemonList(result.data.list);
  //     setCanLoadMore(result.data.next);
  //     setLoading(false);
  //   };
  //   fetchPokemonList();
  // }, []);

  const loadPokemon = async ({
    groupKey,
    startLoading,
  }: OnAppend): Promise<void> => {
    if (startLoading) {
      startLoading({});
    }
    console.log('loading more pokemon');
    const result = await axios.get(
      `http://localhost:5000/api/pokemon?offset=${pokemonList.length}`
    );
    setPokemonList(pokemonList.concat(result.data.list));
    setCanLoadMore(result.data.next);
  };

  const onLayoutComplete = ({
    isLayout,
    endLoading,
  }: OnLayoutComplete): false | void =>
    !isLayout && endLoading && endLoading({});

  return (
    <div className="container">
      <GridLayout
        tag="div"
        useFirstRender={false}
        // onAppend={loadPokemon}
        // onLayoutComplete={onLayoutComplete}
        loading={<div>Loading...</div>}
        options={{
          threshold: 100,
          isOverflowScroll: false,
          isEqualSize: false,
          isConstantSize: false,
          useFit: false,
          useRecycle: false,
          horizontal: false,
        }}
        layoutOptions={{
          align: 'justify',
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
