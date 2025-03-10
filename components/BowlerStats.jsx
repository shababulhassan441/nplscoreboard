import React from "react";

const BowlerStats = ({bowler,economyRate}) => {
  const data = [
    { batsman: "Nomi*", o: 2, m: 5, r: 0, w: 0, er: 140.0 },
  ];
  return (
    <div className="overflow-x-auto border rounded-md border-gray-300">
      <table className="min-w-full table-auto border-collapse ">
        <thead>
          <tr>
            <th className="border-b border-gray-100 text-left px-4 py-2 w-[250px]">Bowler</th>
            <th className="border-b border-gray-100 uppercase px-[6px] ">o</th>
            <th className="border-b border-gray-100 uppercase px-[6px]">m</th>
            <th className="border-b border-gray-100 uppercase px-[6px]">r</th>
            <th className="border-b border-gray-100 uppercase px-[6px]">w</th>
            <th className="border-b border-gray-100 uppercase px-[6px]">er</th>
          </tr>
        </thead>
        <tbody>
          {bowler.map((bowler, index) => (
            <tr key={index}>
              <td className=" px-4 py-2 ">{bowler.playerId.name}</td>
              <td className=" text-center px-[6px]">{bowler.overs}</td>
              <td className=" text-center px-[6px]">{bowler.maidens}</td>
              <td className=" text-center px-[6px]">{bowler.runsConceded}</td>
              <td className=" text-center px-[6px]">{bowler.wickets}</td>
              <td className=" text-center px-[6px]">{economyRate(bowler.runsConceded,bowler.overs).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BowlerStats;
