import React from "react";

const BattingStats = () => {
  const data = [
    { batsman: "Nomi*", r: 2, b: 5, fours: 0, sixes: 0, sr: 40.0 },
    { batsman: "Shani", r: 14, b: 12, fours: 1, sixes: 1, sr: 116.67 },
  ];
  return (
    <div className="overflow-x-auto border rounded-md border-gray-300">
      <table className="min-w-full table-auto border-collapse ">
        <thead>
          <tr>
            <th className="border-b border-gray-100 text-left px-4 py-2 w-[250px]">Batsman</th>
            <th className="border-b border-gray-100 px-[6px] ">R</th>
            <th className="border-b border-gray-100 px-[6px]">B</th>
            <th className="border-b border-gray-100 px-[6px]">4s</th>
            <th className="border-b border-gray-100 px-[6px]">6s</th>
            <th className="border-b border-gray-100 px-[6px]">SR</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className=" px-4 py-2 ">{row.batsman}</td>
              <td className=" text-center px-[6px]">{row.r}</td>
              <td className=" text-center px-[6px]">{row.b}</td>
              <td className=" text-center px-[6px]">{row.fours}</td>
              <td className=" text-center px-[6px]">{row.sixes}</td>
              <td className=" text-center px-[6px]">{row.sr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BattingStats;
