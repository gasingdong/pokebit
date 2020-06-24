import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { number, string } from 'prop-types';

type StatsProps = {
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }>;
};

const StatsBlock: React.FC<StatsProps> = ({ stats }: StatsProps) => {
  const getStat = (name: string): number | undefined => {
    return stats.find((element) => element.stat.name === name)?.base_stat;
  };

  return (
    <div className="info-block">
      <table className="stats">
        <tbody>
          <tr>
            <th>HP</th>
            <td>{getStat('hp')}</td>
          </tr>
          <tr>
            <th>Attack</th>
            <td>{getStat('attack')}</td>
          </tr>
          <tr>
            <th>Defense</th>
            <td>{getStat('defense')}</td>
          </tr>
          <tr>
            <th>Sp.Atk</th>
            <td>{getStat('special-attack')}</td>
          </tr>
          <tr>
            <th>Sp.Def</th>
            <td>{getStat('special-defense')}</td>
          </tr>
          <tr>
            <th>Speed</th>
            <td>{getStat('speed')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatsBlock;
