import Container from "@/components/Container";
import Header from "@/components/Header";
import React from "react";

const Innning = () => {
  return (
    <Container>
      <Header title="First Inning" />
      <div className=" p-[20px] pt-[0px]">
        <form className="flex flex-col gap-4">
          <p className="font-semibold text-[17px]">Batsman</p>
          <div className="flex flex-col space-y-4 ">
            <input
              placeholder="Striker"
              className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Non-Striker"
              className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="font-semibold text-[17px]">Bowler</p>
          <div className="flex flex-col space-y-4 ">
            <input
              placeholder="Bowler"
              className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-[#0066FF] py-[12.5px] text-white font-semibold mt-[242px] cursor-pointer text-[18px] rounded-sm"
          >
            Start Match
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Innning;
