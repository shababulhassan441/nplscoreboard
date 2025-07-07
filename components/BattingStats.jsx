import React from "react";

const BattingStats = ({ batsmen, srikeRate, innings }) => {
  const data = [
    { batsman: "Nomi*", r: 2, b: 5, fours: 0, sixes: 0, sr: 40.0 },
    { batsman: "Shani", r: 14, b: 12, fours: 1, sixes: 1, sr: 116.67 },
  ];

  return (
    <div className="overflow-x-auto border rounded-md border-gray-300">
      <table className="min-w-full table-auto border-collapse ">
        <thead>
          <tr>
            <th className="border-b border-gray-100 text-left px-4 py-2 w-[250px]">
              Batsman
            </th>
            <th className="border-b border-gray-100 px-[6px] ">R</th>
            <th className="border-b border-gray-100 px-[6px]">B</th>
            <th className="border-b border-gray-100 px-[6px]">4s</th>
            <th className="border-b border-gray-100 px-[6px]">6s</th>
            <th className="border-b border-gray-100 px-[6px]">SR</th>
          </tr>
        </thead>
        <tbody>
          {batsmen.map((batsmen, index) => (
            <tr key={index}>
              {/* <td className=" px-4 py-2 ">{isStriker ? `*${batsmen.playerId.name}` : batsmen.playerId.name}</td> */}
              {/* {batsmen.playerId._id === innings.striker._id && console.log("striker") } */}
              <td className="px-4 py-2">
                {batsmen.playerId._id === innings.striker.playerId
                  ? `${batsmen.playerId.name} *`
                  : `${batsmen.playerId.name} `}
              </td>
              {/* <td className=" px-4 py-2 ">{batsmen.playerId._id === innings.striker._id ? `* ${batsmen.playerId.name} striker` : `${batsmen.playerId.name} non-striker` }</td> */}
              <td className=" text-center px-[6px]">{batsmen.runs}</td>
              <td className=" text-center px-[6px]">{batsmen.ballsFaced}</td>
              <td className=" text-center px-[6px]">{batsmen.fours}</td>
              <td className=" text-center px-[6px]">{batsmen.sixes}</td>
              <td className=" text-center px-[6px]">
                {srikeRate(batsmen.runs, batsmen.ballsFaced).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BattingStats;
