export type Options = {
  search: string;
};

export type BasicPokemon = {
  name: string;
  url: string;
};

export type PokemonData = {
  list: BasicPokemon[];
  next: boolean;
};
