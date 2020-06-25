import React from 'react';

type BodyProps = {
  height: number;
  weight: number;
};

const BodyStatsBlock: React.FC<BodyProps> = ({ height, weight }: BodyProps) => {
  return (
    <div className="info-block">
      <table className="body-stats">
        <tbody>
          <tr>
            <th>Height</th>
            <td>{`${height / 10} m`}</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>{`${weight / 10} kg`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BodyStatsBlock;
