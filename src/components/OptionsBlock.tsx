import React, { useState, useEffect, Dispatch } from 'react';
import { Options } from '../utils/types';

type OptionsBlockProps = {
  options: Options;
  setOptions: Dispatch<Options>;
};

const OptionsBlock: React.FC<OptionsBlockProps> = ({
  options,
  setOptions,
}: OptionsBlockProps) => {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setOptions({
      ...options,
      search: evt.target.value,
    });
  };

  return (
    <div className="options">
      <label htmlFor="search">
        Search:
        <input
          id="search"
          type="text"
          value={options.search}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default OptionsBlock;
