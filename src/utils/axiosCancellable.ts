import axios, { CancelTokenSource } from 'axios';
import { PokemonData } from './types';

let tokenSource: CancelTokenSource;

const fetchData = async (
  search: string
): Promise<{ result: PokemonData | null; cancelled: boolean }> => {
  try {
    if (typeof tokenSource !== typeof undefined) {
      tokenSource.cancel('Operation cancelled due to new request.');
    }

    tokenSource = axios.CancelToken.source();

    const { data } = await axios.get(
      `http://localhost:5000/api/pokemon?search=${search}`,
      {
        cancelToken: tokenSource.token,
      }
    );
    return { result: data, cancelled: false };
  } catch (err) {
    return axios.isCancel(err)
      ? { result: null, cancelled: true }
      : { result: err, cancelled: false };
  }
};

export default fetchData;
