import React, { useState, Dispatch } from 'react';
import { Options } from '../utils/types';

type OptionsBlockProps = {
  query: Options;
  setQuery: Dispatch<Options>;
};

const OptionsBlock: React.FC<OptionsBlockProps> = ({
  query,
  setQuery,
}: OptionsBlockProps) => {
  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery({
      ...query,
      search: value,
    });
  };

  return (
    <div className="options">
      <label htmlFor="search">
        Search:
        <input
          id="search"
          type="text"
          value={query.search}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default OptionsBlock;
